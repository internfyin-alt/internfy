begin;

create table if not exists public.service_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  mobile text not null check (mobile ~ '^\+?[0-9]{10,15}$'),
  city text not null check (char_length(btrim(city)) between 2 and 100),
  service text not null check (service in (
    'Web Development', 'Internship', 'Digital Marketing', 'App Development',
    'UI/UX Design', 'Cloud Services', 'Training & Certification',
    'Staffing & Recruitment', 'Other'
  )),
  created_at timestamptz not null default now()
);

alter table public.service_enquiries enable row level security;
revoke all on table public.service_enquiries from anon, authenticated;
grant insert on table public.service_enquiries to service_role;

commit;
