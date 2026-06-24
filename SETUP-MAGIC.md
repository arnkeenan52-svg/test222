# Magic (21st.dev) MCP — setup for the next session

The 21st.dev **Magic** MCP server is registered for this repo in `.mcp.json`.
Its tools (`21st_magic_component_builder`, `logo_search`,
`21st_magic_component_inspiration`, `21st_magic_component_refiner`) only load
when a Claude Code session **starts** with Magic already configured — they
cannot be added to a session that's already running.

## One-time step (only you can do this)

1. In Claude Code on the web → your environment's **Settings → Environment
   Variables / Secrets**, add:
   - **Name:** `MAGIC_API_KEY`
   - **Value:** your 21st.dev API key
   Docs: https://code.claude.com/docs/en/claude-code-on-the-web
   `.mcp.json` references the key as `${MAGIC_API_KEY}`, so the secret is never
   stored in the repo.
2. Start a **fresh session** on branch `claude/festive-bell-pal7f1`.
3. If prompted to approve the `magic` server on first use, approve it.

## Then

Tell Claude: **"Build the new site with Magic — replace the gelato site."**
Magic's tools will be loaded and the new site for `test222` will be generated
with them, replacing the current `index.html` (Eccolo Gelato — Málaga).
