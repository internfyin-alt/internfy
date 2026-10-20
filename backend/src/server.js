import { createClient } from "@supabase/supabase-js";
import { createApp } from "./app.js";

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const configured = Boolean(url && secret);
const supabase = configured ? createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
}) : null;

const app = createApp({
  configured,
  adminApiSecret: process.env.ADMIN_API_SECRET,
  listEnquiries: supabase ? async ({ page, pageSize }) => {
    const start = (page - 1) * pageSize;
    const { data, count, error } = await supabase.from("service_enquiries")
      .select("id,name,mobile,city,service,created_at", { count: "exact" })
      .order("created_at", { ascending: false }).order("id", { ascending: false })
      .range(start, start + pageSize - 1).abortSignal(AbortSignal.timeout(10000));
    if (error) throw error;
    return { enquiries: data, total: count, page, pageSize };
  } : undefined,
  saveEnquiry: supabase ? async (data) => {
    const { error } = await supabase.from("service_enquiries").insert(data).abortSignal(AbortSignal.timeout(10000));
    if (error) throw error;
  } : undefined,
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`Internfy backend listening on http://localhost:${port}`);
  if (!configured) console.log("Supabase is not configured. Add its URL and server secret to backend/.env to enable saving enquiries.");
});
