// Dependency-free Vercel KV / Upstash Redis client over the REST API.
// Works with the env vars Vercel injects when you connect a KV (Upstash) store:
//   KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel KV)
//   or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash marketplace)
// If none are set, every call is a graceful no-op returning null/[].
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const kvReady = () => !!(URL_ && TOKEN);

type Cmd = (string | number)[];

export async function kv(cmd: Cmd): Promise<any> {
  if (!kvReady()) return null;
  try {
    const r = await fetch(URL_, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
    });
    const d = await r.json().catch(() => null);
    return d?.result ?? null;
  } catch {
    return null;
  }
}

export async function kvPipeline(cmds: Cmd[]): Promise<any[]> {
  if (!kvReady()) return [];
  try {
    const r = await fetch(`${URL_}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
      cache: "no-store",
    });
    const d = await r.json().catch(() => []);
    return Array.isArray(d) ? d.map((x: any) => x?.result ?? null) : [];
  } catch {
    return [];
  }
}
