"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Search, Inbox, Users, Phone } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState({ enquiries: [], total: 0, pageSize: 50 });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/admin/enquiries?page=${page}`, { cache: "no-store", signal: controller.signal });
        if (response.status === 401) { router.replace("/admin/login"); return; }
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load enquiries.");
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Could not connect. Try refreshing.");
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [page, revision, router]);

  async function logout() {
    setLoggingOut(true);
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Could not log out. Please try again.");
      router.replace("/admin/login");
    } catch (err) { setError(err.message); setLoggingOut(false); }
  }

  const search = query.trim().toLowerCase();
  const enquiries = data.enquiries.filter((entry) => [entry.name, entry.mobile, entry.city, entry.service].some((value) => value.toLowerCase().includes(search)));
  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8">
          <div><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Internfy Admin</p><h1 className="mt-1 text-3xl font-bold">Enquiry dashboard</h1><p className="mt-2 text-sm text-slate-500">View and follow up on your website enquiries.</p></div>
          <button onClick={logout} disabled={loggingOut} className={button}><LogOut size={17} />{loggingOut ? "Logging out..." : "Log out"}</button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><Users className="mb-3 text-blue-600" size={24} /><p className="text-sm text-slate-500">Total enquiries</p><p className="mt-1 text-4xl font-bold">{loading ? "..." : data.total}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><Inbox className="mb-3 text-blue-600" size={24} /><p className="text-sm text-slate-500">Latest enquiry</p><p className="mt-2 text-xl font-semibold">{loading ? "Loading..." : data.enquiries[0] ? new Date(data.enquiries[0].created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST" : "No enquiries yet"}</p><p className="mt-2 text-xs text-slate-500">On this page, newest first</p></div>
        </div>
        <section aria-labelledby="enquiries-heading" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
            <h2 id="enquiries-heading" className="text-lg font-bold">Saved enquiries</h2>
            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <label className="flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3"><Search size={17} className="text-slate-400" /><span className="sr-only">Search this page</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this page..." className="min-w-0 bg-transparent text-sm outline-none" /></label>
              <button onClick={() => setRevision((value) => value + 1)} disabled={loading} className={button}><RefreshCw size={17} className={loading ? "animate-spin" : ""} />Refresh</button>
            </div>
          </div>
          {error && <p role="alert" className="m-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          {loading ? <p role="status" className="p-12 text-center text-slate-500">Loading enquiries...</p> : error ? null : enquiries.length === 0 ? <p role="status" className="p-12 text-center text-slate-500">{search ? "No matches on this page." : "No enquiries yet. New form submissions will appear here."}</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{["Name", "Mobile", "City", "Service", "Submitted (IST)"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-100">{enquiries.map((entry) => <tr key={entry.id} className="hover:bg-blue-50/40"><td className="px-5 py-4 font-semibold">{entry.name}</td><td className="whitespace-nowrap px-5 py-4"><a href={`tel:${entry.mobile}`} className="inline-flex items-center gap-2 text-blue-700 hover:underline"><Phone size={14} />{entry.mobile}</a></td><td className="px-5 py-4">{entry.city}</td><td className="px-5 py-4"><span className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{entry.service}</span></td><td className="whitespace-nowrap px-5 py-4 text-slate-500">{new Date(entry.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>)}</tbody>
              </table>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">Page {page} of {pages} · {data.total} total enquiries</p>
            <div className="flex gap-2"><button disabled={loading || page <= 1} onClick={() => { setPage((value) => value - 1); setQuery(""); }} className={button}>Previous</button><button disabled={loading || page >= pages} onClick={() => { setPage((value) => value + 1); setQuery(""); }} className={button}>Next</button></div>
          </div>
        </section>
      </main>
    </div>
  );
}
