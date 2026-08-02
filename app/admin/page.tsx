"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ShoppingCart, DollarSign, TrendingUp, Package, MapPin, Search, X, LogOut,
  RefreshCw, Star, Lock, ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/Logo";

// ---- types ----
type Row = {
  id: string; ref: string; customerName: string; email: string; city: string; country: string;
  amount: number; date: string; itemCount: number; delivery: string; refunded: boolean; paymentStatus: string;
};
type Stats = {
  currency: string; rangeLabel: string; totalOrders: number; totalRevenue: number; avgOrder: number;
  ordersToday: number; revenueToday: number; orders: Row[];
  topProducts: { name: string; qty: number; image?: string }[];
  locations: { location: string; count: number }[]; truncated: boolean;
};
type Detail = any;

// ---- helpers ----
const money = (v: number) => "$" + Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const kmoney = (v: number) => "$" + Math.round(Number(v || 0)).toLocaleString("en-US");
const fdate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};
const DELIVERY_LABEL: Record<string, string> = { standard: "Standard", express: "Express" };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login").then((r) => r.json()).then((d) => setAuthed(!!d.authed)).catch(() => setAuthed(false));
  }, []);

  const login = async () => {
    if (loggingIn) return;
    setLoginErr(""); setLoggingIn(true);
    try {
      const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
      if (r.ok) { setCode(""); setAuthed(true); }
      else setLoginErr("Wrong code");
    } catch { setLoginErr("Network error"); }
    setLoggingIn(false);
  };
  const logout = async () => {
    try { await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); } catch {}
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="grid min-h-[100dvh] place-items-center bg-paper-alt text-muted">Loading…</div>;
  }
  if (!authed) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-paper-alt px-6">
        <div className="w-full max-w-[380px] rounded-3xl border border-line bg-white p-9 text-center shadow-soft">
          <img src="/icon.png" alt="FadeClipper" className="mx-auto mb-4 h-16 w-16 rounded-2xl" />
          <h1 className="font-display text-[1.3rem] font-bold text-ink">FadeClipper Admin</h1>
          <p className="mt-1 text-[0.9rem] text-muted">Enter access code</p>
          <input
            type="password" inputMode="numeric" autoComplete="off" maxLength={12}
            value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="••••"
            className="mt-6 w-full rounded-2xl border-2 border-line bg-paper-alt px-4 py-4 text-center text-[1.4rem] font-bold tracking-[0.4em] text-brand outline-none focus-visible:border-brand"
          />
          <button onClick={login} disabled={loggingIn} className="mt-4 w-full rounded-2xl bg-brand py-4 text-[1.05rem] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-70">
            {loggingIn ? "…" : "Unlock"}
          </button>
          <p className="mt-3 min-h-[18px] text-[0.85rem] font-medium text-brand">{loginErr}</p>
        </div>
      </div>
    );
  }
  return <Dashboard onLogout={logout} />;
}

function StatCard({ icon, label, value, delta, live }: { icon: React.ReactNode; label: string; value: string; delta?: string; live?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-[18px] shadow-card">
      <div className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-xl bg-brand-tint text-brand">{icon}</div>
      <div className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-muted">
        {live && <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#1b8a4e]" />}{label}
      </div>
      <div className="mt-1.5 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-ink tabular-nums">{value}</div>
      {delta && <div className="mt-1 text-[0.78rem] font-medium text-muted">{delta}</div>}
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [query, setQuery] = useState("days=7");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [lastUpd, setLastUpd] = useState("");
  const [search, setSearch] = useState("");
  const [globalResults, setGlobalResults] = useState<Row[] | null>(null);
  const [searchNote, setSearchNote] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async (q: string) => {
    setLoading(true); setErr(""); setGlobalResults(null); setSearchNote("");
    try {
      const r = await fetch("/api/admin/stats?" + q);
      if (r.status === 401) { onLogout(); return; }
      const d = await r.json();
      if (!d.ok) throw new Error(d.error || "Error");
      setStats(d); setLastUpd(new Date().toLocaleTimeString("en-US"));
    } catch (e: any) { setErr(e.message || "Could not load"); }
    setLoading(false);
  }, [onLogout]);

  useEffect(() => { load(query); }, [query, load]);

  const setRange = (days: number) => { setDateFrom(""); setDateTo(""); setQuery("days=" + days); };
  const applyDates = () => {
    if (!dateFrom) return;
    let to = dateTo; let from = dateFrom;
    if (to && to < from) { const t = to; to = from; from = t; setDateFrom(from); setDateTo(to); }
    setQuery("from=" + encodeURIComponent(from) + (to ? "&to=" + encodeURIComponent(to) : ""));
  };

  const searchAll = async () => {
    const raw = search.trim();
    if (!raw) { setGlobalResults(null); setSearchNote(""); return; }
    setSearchNote("Searching all orders…");
    try {
      const r = await fetch("/api/admin/order?q=" + encodeURIComponent(raw));
      if (r.status === 401) { onLogout(); return; }
      const d = await r.json();
      if (!d.ok) throw new Error(d.error);
      setGlobalResults(d.orders || []);
      setSearchNote(`${d.orders.length} order${d.orders.length === 1 ? "" : "s"} found across all orders for “${raw}”`);
    } catch (e: any) { setSearchNote("Could not search: " + e.message); }
  };

  // orders list (range filter or global search) + text filter + delivery filter
  const base = globalResults ?? stats?.orders ?? [];
  const q = search.trim().toLowerCase();
  let list = globalResults
    ? base
    : q
      ? base.filter((o) => `${o.ref} ${o.customerName} ${o.email} ${o.city}`.toLowerCase().includes(q))
      : base;
  if (deliveryFilter !== "all") list = list.filter((o) => (o.delivery || "standard") === deliveryFilter);

  return (
    <div className="min-h-[100dvh] bg-paper-alt text-ink">
      {/* topbar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-ink px-4 py-3.5 text-white" style={{ paddingTop: "calc(0.875rem + env(safe-area-inset-top))" }}>
        <span className="text-white"><Logo /></span>
        <div className="leading-tight">
          <div className="text-[0.7rem] font-medium text-white/60">Admin dashboard</div>
        </div>
        <div className="flex-1" />
        {lastUpd && <span className="hidden text-[0.72rem] text-white/60 sm:inline">Updated {lastUpd}</span>}
        <button onClick={() => load(query)} aria-label="Refresh" className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><RefreshCw className="h-4 w-4" /></button>
        <button onClick={onLogout} className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-[0.82rem] font-semibold hover:bg-white/20"><LogOut className="h-4 w-4" /> Log out</button>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 pb-16 pt-5">
        {/* stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <StatCard live icon={<ShoppingCart className="h-[18px] w-[18px]" />} label="Orders today" value={String(stats?.ordersToday ?? "–")} delta="Since midnight" />
          <StatCard icon={<DollarSign className="h-[18px] w-[18px]" />} label="Revenue today" value={stats ? kmoney(stats.revenueToday) : "–"} />
          <StatCard icon={<ShoppingCart className="h-[18px] w-[18px]" />} label={`Orders · ${stats?.rangeLabel || ""}`} value={String(stats?.totalOrders ?? "–")} />
          <StatCard icon={<TrendingUp className="h-[18px] w-[18px]" />} label={`Revenue · ${stats?.rangeLabel || ""}`} value={stats ? kmoney(stats.totalRevenue) : "–"} />
          <StatCard icon={<DollarSign className="h-[18px] w-[18px]" />} label="Avg. order value" value={stats ? money(stats.avgOrder) : "–"} />
        </div>

        {/* range filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[["Today", "days=1"], ["7 days", "days=7"], ["30 days", "days=30"], ["90 days", "days=90"]].map(([label, qv]) => (
            <button key={qv} onClick={() => { setDateFrom(""); setDateTo(""); setQuery(qv); }}
              className={`rounded-xl border px-4 py-2 text-[0.82rem] font-semibold transition-colors ${query === qv ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-ink/30"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-3 shadow-card">
          <span className="text-[0.78rem] font-semibold text-muted">Date:</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-line bg-paper-alt px-2.5 py-2 text-[0.82rem] outline-none focus-visible:border-brand" />
          <span className="text-[0.78rem] text-muted">to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border border-line bg-paper-alt px-2.5 py-2 text-[0.82rem] outline-none focus-visible:border-brand" />
          <button onClick={applyDates} className="rounded-lg bg-brand px-4 py-2 text-[0.82rem] font-semibold text-white hover:bg-brand-dark">Show</button>
        </div>
        {stats && <div className="mt-3 text-[0.85rem] font-semibold text-brand">Showing: {stats.rangeLabel} · {stats.totalOrders} orders · {kmoney(stats.totalRevenue)}{stats.truncated ? " (limited to newest)" : ""}</div>}

        {/* orders panel */}
        <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card">
          <h2 className="mb-3 flex items-center gap-2 border-b border-line pb-3 font-display text-[0.95rem] font-bold text-ink"><ShoppingCart className="h-4 w-4 text-brand" /> Orders</h2>
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setGlobalResults(null); setSearchNote(""); }} onKeyDown={(e) => e.key === "Enter" && searchAll()}
              placeholder="Search order #, name or email — Enter searches all orders"
              className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-10 text-[0.9rem] outline-none focus-visible:border-brand" />
            {search && <button onClick={() => { setSearch(""); setGlobalResults(null); setSearchNote(""); }} aria-label="Clear" className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-card text-muted"><X className="h-3.5 w-3.5" /></button>}
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {[["all", "All"], ["standard", "Standard"], ["express", "Express"]].map(([v, label]) => (
              <button key={v} onClick={() => setDeliveryFilter(v)} className={`rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold ${deliveryFilter === v ? "border-brand bg-brand text-white" : "border-line bg-white text-muted"}`}>{label}</button>
            ))}
          </div>
          {searchNote && <div className="mb-2 text-[0.8rem] font-semibold text-muted" dangerouslySetInnerHTML={{ __html: searchNote.replace(/“([^”]*)”/, "“<b class='text-brand'>$1</b>”") }} />}

          {loading ? (
            <div className="py-8 text-center text-[0.9rem] text-muted">Loading orders…</div>
          ) : err ? (
            <div className="py-6 text-center text-[0.85rem] text-brand">{err}</div>
          ) : !list.length ? (
            <div className="py-6 text-center text-[0.85rem] text-muted">
              {q && !globalResults ? <>No orders match “{search}” in this range.<br /><span className="font-semibold text-brand">Press Enter to search all orders.</span></> : "No orders in this range."}
            </div>
          ) : (
            <div>
              {list.map((o) => (
                <button key={o.id} onClick={() => setOpenId(o.id)} className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line py-3 text-left last:border-0 hover:bg-brand-tint/40 sm:grid-cols-[92px_1fr_70px_90px_84px]">
                  <span className="text-[0.72rem] font-bold tracking-wide text-brand">#{o.ref}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink">
                      {o.customerName}
                      {o.refunded && <span className="ml-2 rounded-full bg-card px-2 py-0.5 text-[0.62rem] font-bold uppercase text-muted">Refunded</span>}
                    </span>
                    <span className="block truncate text-[0.8rem] text-muted">{[o.city, o.country].filter(Boolean).join(", ")}</span>
                  </span>
                  <span className="hidden text-[0.8rem] text-muted sm:block">{o.itemCount} pc.</span>
                  <span className="text-right font-bold tabular-nums text-ink">{money(o.amount)}</span>
                  <span className="hidden text-right text-[0.72rem] text-muted sm:block">{fdate(o.date)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* two-col: top product + locations */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 border-b border-line pb-3 font-display text-[0.95rem] font-bold"><Star className="h-4 w-4 text-brand" /> Best sellers</h2>
            {stats?.topProducts?.length ? stats.topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-line py-2.5 last:border-0">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-tint text-[0.72rem] font-bold text-brand">{i + 1}</span>
                {p.image ? <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <span className="h-10 w-10 rounded-lg bg-card" />}
                <span className="flex-1 text-[0.9rem] font-medium">{p.name}</span>
                <span className="font-bold tabular-nums text-brand">{p.qty}×</span>
              </div>
            )) : <div className="py-4 text-center text-[0.85rem] text-muted">No data.</div>}
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 border-b border-line pb-3 font-display text-[0.95rem] font-bold"><MapPin className="h-4 w-4 text-brand" /> Customer locations</h2>
            {stats?.locations?.length ? stats.locations.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] items-center border-b border-line py-2.5 text-[0.9rem] last:border-0">
                <span>{l.location}</span><span className="font-bold tabular-nums text-brand">{l.count}</span>
              </div>
            )) : <div className="py-4 text-center text-[0.85rem] text-muted">No data.</div>}
          </div>
        </div>
      </div>

      {openId && <OrderModal id={openId} onClose={() => setOpenId(null)} onRefunded={() => load(query)} onAuth={onLogout} />}
    </div>
  );
}

function OrderModal({ id, onClose, onRefunded, onAuth }: { id: string; onClose: () => void; onRefunded: () => void; onAuth: () => void }) {
  const [d, setD] = useState<Detail | null>(null);
  const [err, setErr] = useState("");
  const [amount, setAmount] = useState("");
  const [rcode, setRcode] = useState("");
  const [refunding, setRefunding] = useState(false);
  const [refundMsg, setRefundMsg] = useState("");
  const startedRef = useRef(false);

  const fetchDetail = useCallback(() => {
    fetch("/api/admin/order?id=" + encodeURIComponent(id)).then((r) => {
      if (r.status === 401) { onClose(); onAuth(); throw new Error("auth"); }
      return r.json();
    }).then((j) => { if (!j.ok) throw new Error(j.error || "Error"); setD(j); }).catch((e) => { if (e.message !== "auth") setErr(e.message); });
  }, [id, onClose, onAuth]);

  useEffect(() => { if (startedRef.current) return; startedRef.current = true; fetchDetail(); }, [fetchDetail]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const remaining = d ? Math.max(0, (d.total || 0) - (d.amountRefunded || 0)) : 0;

  const doRefund = async () => {
    if (refunding) return;
    if (!rcode.trim()) { setRefundMsg("Enter the admin code to confirm."); return; }
    const amt = amount.trim() ? parseFloat(amount) : null;
    if (amt != null && (!Number.isFinite(amt) || amt <= 0 || amt > remaining + 0.001)) { setRefundMsg(`Amount must be between $0 and ${money(remaining)}.`); return; }
    setRefunding(true); setRefundMsg("");
    try {
      const r = await fetch("/api/admin/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, code: rcode.trim(), ...(amt != null ? { amount: amt } : {}) }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "Refund failed");
      setRcode(""); setAmount(""); fetchDetail(); onRefunded();
    } catch (e: any) { setRefundMsg(e.message); }
    setRefunding(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/55 backdrop-blur-[2px] sm:items-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl bg-white shadow-soft sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-ink px-5 py-4 text-white">
          <div>
            <div className="text-[0.72rem] font-bold tracking-wide text-white/60">#{d?.ref || "…"}</div>
            <div className="mt-0.5 font-display text-[1.15rem] font-extrabold">{d?.customer?.name || "Order"}</div>
            {d && <div className="text-[0.72rem] text-white/70">{fdate(d.date)}</div>}
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-lg hover:bg-white/25">×</button>
        </div>
        <div className="px-5 py-5">
          {err ? <div className="py-8 text-center text-muted">Could not load order.<br />{err}</div> : !d ? <div className="py-10 text-center text-muted">Loading order…</div> : (
            <>
              <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-bold ${d.refunded ? "bg-card text-muted" : "bg-[#e6f1ea] text-[#1b8a4e]"}`}>{d.refunded ? "Refunded" : "Paid"}</span>

              <SectionLabel>Items</SectionLabel>
              {(d.items || []).map((it: any, i: number) => (
                <div key={i} className="flex items-center gap-3 border-b border-line py-2.5 last:border-0">
                  {it.image ? <img src={it.image} alt="" className="h-11 w-11 rounded-lg object-cover" /> : <span className="h-11 w-11 rounded-lg bg-card" />}
                  <div className="flex-1"><div className="font-semibold text-[0.9rem]">{it.name}</div><div className="text-[0.78rem] text-muted">Qty: {it.qty}</div></div>
                  <div className="font-bold tabular-nums text-ink">{money(it.lineTotal)}</div>
                </div>
              ))}

              <SectionLabel>Customer</SectionLabel>
              <Info rows={[["Name", d.customer?.name], ["Email", d.customer?.email], ["Phone", d.customer?.phone]]} />

              <SectionLabel>Delivery</SectionLabel>
              <Info rows={[["Method", DELIVERY_LABEL[d.shipping?.name?.toLowerCase?.()] || d.shipping?.name],
                ["Address", d.address ? [d.address.line1, d.address.line2, [d.address.postalCode, d.address.city].filter(Boolean).join(" "), d.address.country].filter(Boolean).join(", ") : ""]]} />

              <SectionLabel>Payment</SectionLabel>
              <Info rows={[["Card", d.card ? `${(d.card.brand || "").toUpperCase()} •••• ${d.card.last4}` : ""], ["Order ref", d.ref]]} />

              <div className="mt-4 border-t-2 border-line pt-3 text-[0.9rem]">
                <Line k="Subtotal" v={money(d.subtotal)} />
                {d.discount > 0 && <Line k="Discount" v={"−" + money(d.discount)} green />}
                <Line k="Shipping" v={d.shipping?.amount > 0 ? money(d.shipping.amount) : "Free"} />
                <div className="mt-1 flex justify-between font-display text-[1.05rem] font-extrabold text-brand"><span>Total</span><span className="tabular-nums">{money(d.total)}</span></div>
                {d.amountRefunded > 0 && <div className="mt-1 flex justify-between text-[0.85rem] text-muted"><span>Refunded</span><span className="tabular-nums">−{money(d.amountRefunded)}</span></div>}
              </div>

              {/* refund control */}
              {d.refunded ? (
                <div className="mt-5 rounded-xl bg-card py-3 text-center text-[0.9rem] font-bold text-muted">✓ Order refunded</div>
              ) : d.paymentStatus === "paid" ? (
                <div className="mt-5 rounded-2xl border border-line bg-paper-alt p-4">
                  <div className="mb-2 text-[0.8rem] font-semibold text-ink">Refund to the customer’s card (via Stripe)</div>
                  <div className="flex gap-2">
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder={`Amount (blank = full ${money(remaining)})`} className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2.5 text-[0.88rem] outline-none focus-visible:border-brand" />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input value={rcode} onChange={(e) => setRcode(e.target.value)} type="password" inputMode="numeric" placeholder="Admin code" className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2.5 text-[0.88rem] outline-none focus-visible:border-brand" />
                    <button onClick={doRefund} disabled={refunding} className="shrink-0 rounded-lg bg-[#b23b3b] px-4 py-2.5 text-[0.88rem] font-bold text-white hover:bg-[#9c3232] disabled:opacity-60">{refunding ? "Refunding…" : "Refund"}</button>
                  </div>
                  {refundMsg && <div className="mt-2 text-[0.8rem] font-medium text-[#b23b3b]">{refundMsg}</div>}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => <div className="mb-2 mt-5 text-[0.68rem] font-bold uppercase tracking-wider text-muted">{children}</div>;
function Info({ rows }: { rows: [string, any][] }) {
  const r = rows.filter(([, v]) => v);
  if (!r.length) return null;
  return (
    <div className="rounded-xl border border-line bg-paper-alt px-3.5">
      {r.map(([k, v], i) => (
        <div key={i} className="flex justify-between gap-3 border-b border-line py-2.5 text-[0.88rem] last:border-0">
          <span className="shrink-0 text-muted">{k}</span><span className="break-words text-right font-semibold">{v}</span>
        </div>
      ))}
    </div>
  );
}
const Line = ({ k, v, green }: { k: string; v: string; green?: boolean }) => (
  <div className={`flex justify-between py-1 ${green ? "text-[#1b8a4e]" : ""}`}><span className={green ? "" : "text-muted"}>{k}</span><span className="tabular-nums">{v}</span></div>
);
