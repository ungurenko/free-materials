#!/usr/bin/env node

const TIMEOUT_MS = 15_000;
const MAX_ASSETS_PER_TYPE = 2;

const sites = [
  {
    host: "free.ungurenko.ru",
    expectedCname: "vibes-app-production.up.railway.app",
  },
  {
    host: "kzacademy.ungurenko.ru",
    expectedCname: "academy-production-e986.up.railway.app",
  },
  {
    host: "lmsvibes.ungurenko.ru",
    expectedCname: "vibes-app-production.up.railway.app",
  },
];

function normalizeDnsName(value) {
  return value.toLowerCase().replace(/\.$/, "");
}

async function fetchComplete(url, expectedKind) {
  const startedAt = performance.now();
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      accept: "*/*",
      "cache-control": "no-cache",
      "user-agent": "UngurenkoProductionMonitor/1.0",
    },
  });
  const body = Buffer.from(await response.arrayBuffer());
  const elapsedMs = Math.round(performance.now() - startedAt);
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  if (body.length === 0) {
    throw new Error(`${url} returned an empty body`);
  }
  if (expectedKind === "html" && !contentType.includes("text/html")) {
    throw new Error(`${url} returned Content-Type ${contentType || "missing"}, expected HTML`);
  }
  if (expectedKind === "css" && !contentType.includes("text/css")) {
    throw new Error(`${url} returned Content-Type ${contentType || "missing"}, expected CSS`);
  }
  if (expectedKind === "js" && !/(java|ecma)script/i.test(contentType)) {
    throw new Error(`${url} returned Content-Type ${contentType || "missing"}, expected JavaScript`);
  }

  return { body, elapsedMs, headers: response.headers };
}

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

function findAssets(html, baseUrl) {
  const css = [];
  const js = [];

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = readAttribute(tag, "rel");
    const href = readAttribute(tag, "href");
    if (rel?.split(/\s+/).includes("stylesheet") && href) css.push(new URL(href, baseUrl));
  }

  for (const match of html.matchAll(/<script\b[^>]*>/gi)) {
    const src = readAttribute(match[0], "src");
    if (src) js.push(new URL(src, baseUrl));
  }

  const baseHost = new URL(baseUrl).host;
  const localUnique = (urls) => [
    ...new Map(urls.filter((url) => url.host === baseHost).map((url) => [url.href, url])).values(),
  ].slice(0, MAX_ASSETS_PER_TYPE);

  return { css: localUnique(css), js: localUnique(js) };
}

async function checkDns(host, expectedCname) {
  const url = new URL("https://dns.google/resolve");
  url.searchParams.set("name", host);
  url.searchParams.set("type", "CNAME");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "application/dns-json" },
  });
  if (!response.ok) throw new Error(`DNS-over-HTTPS returned HTTP ${response.status}`);

  const payload = await response.json();
  const cnames = (payload.Answer ?? [])
    .filter((answer) => answer.type === 5)
    .map((answer) => normalizeDnsName(answer.data));

  if (!cnames.includes(normalizeDnsName(expectedCname))) {
    throw new Error(
      `public CNAME is ${cnames.join(", ") || "missing"}; expected ${expectedCname} (check DNS only)`,
    );
  }
}

async function checkSite(site) {
  await checkDns(site.host, site.expectedCname);

  const baseUrl = `https://${site.host}/`;
  const htmlResult = await fetchComplete(baseUrl, "html");
  const html = htmlResult.body.toString("utf8");

  if (htmlResult.body.length < 1_000 || !/<\/html>/i.test(html)) {
    throw new Error(`${baseUrl} returned incomplete HTML (${htmlResult.body.length} bytes)`);
  }
  if (htmlResult.headers.has("cf-ray")) {
    throw new Error(`${site.host} is unexpectedly passing through the Cloudflare proxy`);
  }

  const assets = findAssets(html, baseUrl);
  if (assets.css.length === 0) throw new Error(`${site.host} has no same-origin stylesheet to verify`);
  if (assets.js.length === 0) throw new Error(`${site.host} has no same-origin JavaScript to verify`);

  const assetResults = await Promise.all([
    ...assets.css.map(async (url) => ({ kind: "css", url, result: await fetchComplete(url, "css") })),
    ...assets.js.map(async (url) => ({ kind: "js", url, result: await fetchComplete(url, "js") })),
  ]);

  for (const asset of assetResults) {
    if (asset.result.body.length < 100) {
      throw new Error(`${asset.url} is suspiciously small (${asset.result.body.length} bytes)`);
    }
    if (asset.kind === "css" && !asset.result.body.toString("utf8").trimEnd().endsWith("}")) {
      throw new Error(`${asset.url} appears truncated: CSS does not end with a closing brace`);
    }
  }

  const slowestMs = Math.max(htmlResult.elapsedMs, ...assetResults.map((asset) => asset.result.elapsedMs));
  return `${site.host}: HTML ${htmlResult.body.length} B; ${assets.css.length} CSS + ${assets.js.length} JS; slowest ${slowestMs} ms`;
}

const results = await Promise.allSettled(sites.map(checkSite));
let failed = false;

for (const [index, result] of results.entries()) {
  if (result.status === "fulfilled") {
    console.log(`OK ${result.value}`);
  } else {
    failed = true;
    console.error(`FAIL ${sites[index].host}: ${result.reason?.message ?? result.reason}`);
  }
}

if (failed) process.exitCode = 1;
