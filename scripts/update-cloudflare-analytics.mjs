import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const HOST = process.env.ANALYTICS_HOST || "zwt233.github.io";
const COUNTER_ID = process.env.FLAGCOUNTER_ID || "z9BD";
const HISTORY_URL = process.env.FLAGCOUNTER_HISTORY_URL || `https://flagcounter.com/more30/${COUNTER_ID}`;
const OUTPUT = process.env.ANALYTICS_OUTPUT || "data/site-analytics.json";
const TIMEZONE = process.env.ANALYTICS_TIMEZONE || "Asia/Shanghai";

const MONTHS = new Map([
  ["January", 1],
  ["February", 2],
  ["March", 3],
  ["April", 4],
  ["May", 5],
  ["June", 6],
  ["July", 7],
  ["August", 8],
  ["September", 9],
  ["October", 10],
  ["November", 11],
  ["December", 12]
]);

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&raquo;/g, "»")
    .replace(/&copy;/g, "©")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"");
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function datePartsInTimezone(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute)
  };
}

function formatUpdatedLabel(date) {
  const parts = datePartsInTimezone(date);
  return `${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")} ${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
}

function localDateIso(parts) {
  return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function parseDateLabel(label) {
  const match = label.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.get(match[1]);
  if (!month) return null;
  return {
    year: Number(match[3]),
    month,
    day: Number(match[2])
  };
}

function parseHistoryRows(html, now) {
  const todayParts = datePartsInTimezone(now);
  const rows = [];
  const rowPattern = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;

  while ((match = rowPattern.exec(html))) {
    const text = stripHtml(match[1]);
    if (!text || text.startsWith("Date ")) continue;

    const todayMatch = text.match(/^Today\b\s+(\d+)\s+(\d+)/i);
    if (todayMatch) {
      rows.push({
        label: "Today",
        date: localDateIso(todayParts),
        year: todayParts.year,
        month: todayParts.month,
        day: todayParts.day,
        visitors: Number(todayMatch[1]),
        pageviews: Number(todayMatch[2])
      });
      continue;
    }

    const dateMatch = text.match(/^([A-Za-z]+\s+\d{1,2},\s+\d{4})\s+(\d+)\s+(\d+)/);
    if (dateMatch) {
      const parsed = parseDateLabel(dateMatch[1]);
      if (!parsed) continue;
      rows.push({
        label: dateMatch[1],
        date: localDateIso(parsed),
        ...parsed,
        visitors: Number(dateMatch[2]),
        pageviews: Number(dateMatch[3])
      });
    }
  }

  return rows;
}

function parseTotals(html) {
  const text = stripHtml(html);
  const match = text.match(/This counter has been viewed\s+([\d,]+)\s+times by\s+([\d,]+)\s+visitor/i);
  if (!match) return { pageviews: null, visitors: null };
  return {
    pageviews: Number(match[1].replace(/,/g, "")),
    visitors: Number(match[2].replace(/,/g, ""))
  };
}

async function fetchFlagCounterHistory(now) {
  const response = await fetch(HISTORY_URL, {
    headers: {
      Accept: "text/html"
    }
  });
  if (!response.ok) {
    throw new Error(`FlagCounter history HTTP ${response.status}`);
  }

  const html = await response.text();
  const rows = parseHistoryRows(html, now);
  const todayParts = datePartsInTimezone(now);
  const todayDate = localDateIso(todayParts);
  const today = rows.find((row) => row.date === todayDate) || rows.find((row) => row.label === "Today");
  const monthRows = rows.filter((row) => row.year === todayParts.year && row.month === todayParts.month);
  const monthPageviews = monthRows.reduce((sum, row) => sum + row.pageviews, 0);
  const monthVisitors = monthRows.reduce((sum, row) => sum + row.visitors, 0);
  const totals = parseTotals(html);

  if (!today || !Number.isFinite(today.pageviews)) {
    throw new Error("FlagCounter history did not include today's Flag Counter Views");
  }

  return {
    today,
    month: {
      pageviews: monthPageviews,
      visitors: monthVisitors,
      days: monthRows.length
    },
    total: totals,
    rows
  };
}

function metric(label, pageviews, visits, extra = {}) {
  return {
    label,
    pageviews,
    visits,
    ...extra
  };
}

async function writeAnalytics(payload) {
  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function main() {
  const now = new Date();
  const history = await fetchFlagCounterHistory(now);

  await writeAnalytics({
    schemaVersion: 1,
    status: "ok",
    source: "flagcounter-history",
    host: HOST,
    timezone: TIMEZONE,
    generatedAt: now.toISOString(),
    updatedLabel: formatUpdatedLabel(now),
    detailsUrl: HISTORY_URL,
    periods: {
      today: metric("Today", history.today.pageviews, history.today.visitors, {
        date: history.today.date
      }),
      month: metric("This month", history.month.pageviews, history.month.visitors, {
        days: history.month.days
      }),
      total: metric("Total", history.total.pageviews, history.total.visitors)
    },
    message: "Pageviews are generated from FlagCounter History using the Flag Counter Views column."
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
