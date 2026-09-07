// Edit the verified Scholar snapshot in data/homepage-metrics.json, then run:
//   node scripts/update-homepage-metrics.mjs
// Add --refresh-stars to fetch all listed public GitHub repositories first.
// The rendered HTML works without client-side JavaScript or external APIs.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const metricsFile = new URL('data/homepage-metrics.json', root);
const homepageFile = new URL('index.html', root);
const integer = (n) => Number.isSafeInteger(n) && n >= 0;
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const number = (n) => n.toLocaleString('en-US');

export function validateMetrics(data) {
  if (!integer(data.scholar?.citations) || !integer(data.scholar?.hIndex)) throw new Error('Invalid Scholar snapshot');
  for (const section of [data.scholar, data.github]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(section?.verifiedAt ?? '')) throw new Error('Missing verification date');
  }
  const repos = data.github?.repositories;
  if (!Array.isArray(repos) || repos.length === 0) throw new Error('Missing GitHub repositories');
  const seen = new Set();
  for (const repo of repos) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo.repo) || !repo.name || !integer(repo.stars)) throw new Error('Invalid repository snapshot');
    const key = repo.repo.toLowerCase();
    if (seen.has(key)) throw new Error(`Duplicate repository: ${repo.repo}`);
    seen.add(key);
  }
  return data;
}

export async function refreshStars(data, fetcher = fetch) {
  validateMetrics(data);
  const repos = await Promise.all(data.github.repositories.map(async (repo) => {
    const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetcher(`https://api.github.com/repos/${repo.repo}`, { headers, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`${repo.repo}: HTTP ${response.status}; previous snapshot preserved`);
    const result = await response.json();
    if (result.private !== false || !integer(result.stargazers_count) || !result.full_name) throw new Error(`Invalid public repository response: ${repo.repo}`);
    return { name: repo.name, repo: result.full_name, stars: result.stargazers_count };
  }));
  // Validate canonical names together, so redirects cannot cause double counting.
  return validateMetrics({ ...data, github: { verifiedAt: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' }), repositories: repos } });
}

export function renderMetrics(html, data) {
  validateMetrics(data);
  const total = data.github.repositories.reduce((sum, repo) => sum + repo.stars, 0);
  const values = {
    citations: number(data.scholar.citations),
    citationsCompact: `${Math.floor(data.scholar.citations / 100) / 10}k+`,
    hIndex: data.scholar.hIndex,
    starsZh: `${Math.floor(total / 10000)}万+`,
    starsEn: `${Math.floor(total / 10000) * 10}k+`,
    scholarDate: data.scholar.verifiedAt,
    githubDate: data.github.verifiedAt,
  };
  for (const [key, value] of Object.entries(values)) {
    const pattern = new RegExp(`(<([a-z]+)\\b[^>]*data-metric="${key}"[^>]*>)[^<]*(</\\2>)`, 'g');
    if (!pattern.test(html)) throw new Error(`Missing homepage metric: ${key}`);
    html = html.replace(pattern, (_, start, tag, end) => `${start}${escape(value)}${end}`);
  }
  const sources = `<p><a href="${escape(data.scholar.url)}" target="_blank" rel="noopener">Google Scholar</a>: ${number(data.scholar.citations)} citations · h-index ${data.scholar.hIndex} · ${escape(data.scholar.verifiedAt)}</p>\n` +
    '<ul>\n' + data.github.repositories.map(repo => `  <li><a href="https://github.com/${escape(repo.repo)}" target="_blank" rel="noopener">${escape(repo.name)}</a>: ${number(repo.stars)} Stars</li>`).join('\n') +
    `\n</ul>\n<p><span class="zh">以上四个独立仓库合计 ${number(total)} Stars；统计日期 ${escape(data.github.verifiedAt)}。Stars 为仓库关注数之和。</span><span class="en">${number(total)} stars across the four repositories above, as of ${escape(data.github.verifiedAt)}. This is a sum of repository stars.</span></p>`;
  const start = '<!-- homepage-metrics-sources:start -->';
  const end = '<!-- homepage-metrics-sources:end -->';
  if (html.split(start).length !== 2 || html.split(end).length !== 2) throw new Error('Missing or duplicate metric source markers');
  return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${sources}\n${end}`);
}

async function main() {
  let data = validateMetrics(JSON.parse(await readFile(metricsFile, 'utf8')));
  if (process.argv.includes('--refresh-stars')) data = await refreshStars(data);
  const html = renderMetrics(await readFile(homepageFile, 'utf8'), data);
  // Finish every fetch and validation before writing either file.
  await writeFile(metricsFile, JSON.stringify(data, null, 2) + '\n');
  await writeFile(homepageFile, html);
  console.log(`Homepage metrics updated: ${number(data.scholar.citations)} citations, ${number(data.github.repositories.reduce((sum, repo) => sum + repo.stars, 0))} Stars`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
