begin;
-- The server credential is used only inside the Edge Function.
grant select, insert on table public.service_enquiries to service_role;
revoke all on table public.service_enquiries from anon, authenticated;
alter table public.service_enquiries enable row level security;
commit;
