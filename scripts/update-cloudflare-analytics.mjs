import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const API_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";
const ACCOUNT_TAG = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_TAG || "";
const HOST = process.env.CLOUDFLARE_ANALYTICS_HOST || "zwt233.github.io";
const SITE_TOKEN = process.env.CLOUDFLARE_SITE_TOKEN || "39ba9c3be6c24b3da9be91ebd9495bc0";
const HITS_URN = process.env.HITS_ANALYTICS_URN || HOST;
const HITS_API_ENDPOINT = process.env.HITS_ANALYTICS_API || `https://hits.sh/api/urns/${encodeURI(HITS_URN)}`;
const OUTPUT = process.env.ANALYTICS_OUTPUT || "data/site-analytics.json";
const TIMEZONE = process.env.ANALYTICS_TIMEZONE || "Asia/Shanghai";
const TOTAL_DAYS = Number(process.env.ANALYTICS_TOTAL_DAYS || 180);
const CHUNK_DAYS = 28;

function escapeGraphql(value) {
  return JSON.stringify(String(value));
}

function datePartsInShanghai(date) {
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

function shanghaiMidnightUtc(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day) - 8 * 60 * 60 * 1000);
}

function startOfShanghaiDay(date) {
  const parts = datePartsInShanghai(date);
  return shanghaiMidnightUtc(parts.year, parts.month, parts.day);
}

function startOfShanghaiMonth(date) {
  const parts = datePartsInShanghai(date);
  return shanghaiMidnightUtc(parts.year, parts.month, 1);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatUpdatedLabel(date) {
  const parts = datePartsInShanghai(date);
  return `${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")} ${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
}

function formatDateLabel(date) {
  const parts = datePartsInShanghai(date);
  return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function emptyPeriod(label, start, end) {
  return {
    label,
    pageviews: null,
    visits: null,
    range: {
      start: start ? start.toISOString() : null,
      end: end ? end.toISOString() : null
    }
  };
}

function stableEmptyPeriods() {
  return {
    today: emptyPeriod("Today", null, null),
    month: emptyPeriod("This month", null, null),
    total: emptyPeriod(`Last ${TOTAL_DAYS} days`, null, null)
  };
}

async function writeAnalytics(payload) {
  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function buildPayload(status, now, periods, message, extra = {}) {
  return {
    schemaVersion: 1,
    status,
    source: extra.source || "cloudflare-web-analytics",
    host: HOST,
    timezone: TIMEZONE,
    generatedAt: status === "ok" ? now.toISOString() : null,
    updatedLabel: status === "ok" ? formatUpdatedLabel(now) : "",
    periods,
    message,
    ...extra
  };
}

function metricPeriod(label, pageviews, start, end, extra = {}) {
  return {
    label,
    pageviews,
    visits: null,
    range: {
      start: start ? start.toISOString() : null,
      end: end ? end.toISOString() : null
    },
    ...extra
  };
}

function periodWindows(now) {
  const todayStart = startOfShanghaiDay(now);
  const monthStart = startOfShanghaiMonth(now);
  const totalStart = addDays(startOfShanghaiDay(now), -Math.max(1, TOTAL_DAYS - 1));
  return {
    today: { label: "Today", start: todayStart, end: now },
    month: { label: "This month", start: monthStart, end: now },
    total: { label: `Last ${TOTAL_DAYS} days`, start: totalStart, end: now }
  };
}

function filterCandidates(start, end) {
  const rangeFilter = `datetime_geq: ${escapeGraphql(start.toISOString())}, datetime_lt: ${escapeGraphql(end.toISOString())}`;
  return [
    {
      id: "site-token-and-host",
      filter: `${rangeFilter}, siteTag: ${escapeGraphql(SITE_TOKEN)}, requestHost: ${escapeGraphql(HOST)}`
    },
    {
      id: "site-token",
      filter: `${rangeFilter}, siteTag: ${escapeGraphql(SITE_TOKEN)}`
    },
    {
      id: "request-host",
      filter: `${rangeFilter}, requestHost: ${escapeGraphql(HOST)}`
    }
  ];
}

function queryFor(filter, includeVisits) {
  const visitSelection = includeVisits ? "\n              sum { visits }" : "";
  return `{
    viewer {
      accounts(filter: { accountTag: ${escapeGraphql(ACCOUNT_TAG)} }) {
        rumPageloadEventsAdaptiveGroups(
          limit: 1,
          filter: { ${filter} }
        ) {
          count${visitSelection}
        }
      }
    }
  }`;
}

async function cloudflareQuery(query) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    const message = payload.errors?.map((error) => error.message).join("; ") || `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload.data;
}

function extractMetric(data) {
  const groups = data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups || [];
  return groups.reduce(
    (metric, group) => {
      metric.pageviews += Number(group.count || 0);
      if (group.sum && group.sum.visits != null) {
        metric.visits += Number(group.sum.visits || 0);
        metric.hasVisits = true;
      }
      return metric;
    },
    { pageviews: 0, visits: 0, hasVisits: false }
  );
}

async function queryWindow(start, end) {
  const candidates = filterCandidates(start, end);
  const errors = [];
  for (const candidate of candidates) {
    for (const includeVisits of [true, false]) {
      try {
        const data = await cloudflareQuery(queryFor(candidate.filter, includeVisits));
        const metric = extractMetric(data);
        return {
          pageviews: metric.pageviews,
          visits: metric.hasVisits ? metric.visits : null,
          queryFilter: candidate.id
        };
      } catch (error) {
        errors.push(`${candidate.id}${includeVisits ? "" : "-no-visits"}: ${error.message}`);
      }
    }
  }
  throw new Error(errors.slice(0, 4).join(" | "));
}

async function queryPeriod(label, start, end) {
  let cursor = start;
  let pageviews = 0;
  let visits = 0;
  let hasVisits = false;
  let queryFilter = "";

  while (cursor < end) {
    const chunkEnd = new Date(Math.min(addDays(cursor, CHUNK_DAYS).getTime(), end.getTime()));
    const metric = await queryWindow(cursor, chunkEnd);
    pageviews += metric.pageviews;
    if (metric.visits != null) {
      visits += metric.visits;
      hasVisits = true;
    }
    queryFilter = queryFilter || metric.queryFilter;
    cursor = chunkEnd;
  }

  return {
    label,
    pageviews,
    visits: hasVisits ? visits : null,
    range: {
      start: start.toISOString(),
      end: end.toISOString()
    },
    queryFilter
  };
}

async function fetchHitsPayload(now, reason) {
  const response = await fetch(HITS_API_ENDPOINT, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`hits.sh HTTP ${response.status}`);
  }

  const data = await response.json();
  const windows = periodWindows(now);
  const todayLabel = formatDateLabel(now);
  const todayItems = data.items?.flatMap((item) => item.data || []) || [];
  const todayValue = todayItems.find((item) => item.day === todayLabel)?.value ?? 0;
  const monthValue = Number(data.monthly);
  const totalValue = Number(data.total);

  if (!Number.isFinite(monthValue) || !Number.isFinite(totalValue)) {
    throw new Error("hits.sh response did not include numeric monthly/total metrics");
  }

  return buildPayload(
    "ok",
    now,
    {
      today: metricPeriod("Today", Number(todayValue) || 0, windows.today.start, windows.today.end, {
        day: todayLabel
      }),
      month: metricPeriod("This month", monthValue, windows.month.start, windows.month.end),
      total: metricPeriod(`Total hits`, totalValue, null, windows.total.end)
    },
    reason || "Pageviews are generated from the public hits.sh counter API.",
    {
      source: "hits-sh",
      detailsUrl: `https://hits.sh/${HITS_URN}/`,
      countryDetailsUrl: "https://info.flagcounter.com/z9BD",
      raw: {
        weekly: Number(data.weekly) || 0
      }
    }
  );
}

async function main() {
  const now = new Date();
  const windows = periodWindows(now);
  const emptyPeriods = Object.fromEntries(
    Object.entries(windows).map(([key, value]) => [key, emptyPeriod(value.label, value.start, value.end)])
  );

  if (!API_TOKEN || !ACCOUNT_TAG) {
    await writeAnalytics(await fetchHitsPayload(now, "Pageviews are generated from the public hits.sh counter API."));
    return;
  }

  try {
    const periods = {};
    for (const [key, value] of Object.entries(windows)) {
      periods[key] = await queryPeriod(value.label, value.start, value.end);
    }
    await writeAnalytics(
      buildPayload(
        "ok",
        now,
        periods,
        "Pageviews are generated from Cloudflare Web Analytics beacon data."
      )
    );
  } catch (error) {
    try {
      await writeAnalytics(
        await fetchHitsPayload(now, `Cloudflare Analytics failed (${error.message}); using hits.sh public counter data.`)
      );
      return;
    } catch (fallbackError) {
      console.error(`hits.sh fallback failed: ${fallbackError.message}`);
    }
    await writeAnalytics(
      buildPayload("error", now, emptyPeriods, error.message, {
        failedAt: now.toISOString()
      })
    );
    throw error;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
