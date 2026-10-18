"use client";

import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";

const services = [
  "Web Development", "Internship", "Digital Marketing", "App Development",
  "UI/UX Design", "Cloud Services", "Training & Certification",
  "Staffing & Recruitment", "Other",
];
const emptyForm = { name: "", mobile: "", city: "", service: "" };

export default function EnquiryForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  function change(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setStatus(null);
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrors({});
    setStatus(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = await response.json();
      if (response.status !== 201) {
        setErrors(result.errors || {});
        setStatus({ type: "error", message: result.message || "We could not send your enquiry. Please try again." });
        const field = Object.keys(result.errors || {})[0];
        if (field) formRef.current?.elements.namedItem(field)?.focus();
        return;
      }
      setValues(emptyForm);
      setStatus({ type: "success", message: result.message });
    } catch {
      setStatus({ type: "error", message: "We could not send your enquiry. Please try again or contact us by phone or WhatsApp." });
    } finally {
      clearTimeout(timer);
      setSubmitting(false);
    }
  }

  const inputClass = "w-full min-h-12 rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100";

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="w-full max-w-sm scroll-mt-24 rounded-2xl bg-white p-5 text-gray-900 shadow-2xl sm:p-6">
      <h2 id="enquiry-heading" className="text-center text-2xl font-bold tracking-tight text-slate-900">Talk to Our Experts</h2>
      <p className="mt-2 text-center text-sm leading-relaxed text-gray-600">Submit the form and our team will contact you.</p>
      <form ref={formRef} onSubmit={submit} aria-labelledby="enquiry-heading" aria-busy={submitting} className="mt-5">
        <fieldset disabled={submitting} className="grid gap-3">
          <legend className="sr-only">Your enquiry details</legend>
          <div>
            <label htmlFor="enquiry-name" className="sr-only">Full Name (required)</label>
            <input id="enquiry-name" name="name" value={values.name} onChange={change} required minLength={2} maxLength={100} autoComplete="name" placeholder="Full Name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "enquiry-name-error" : undefined} className={inputClass} />
            {errors.name && <p id="enquiry-name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="enquiry-mobile" className="sr-only">Mobile Number (required)</label>
            <input id="enquiry-mobile" name="mobile" type="tel" inputMode="tel" value={values.mobile} onChange={change} required minLength={10} maxLength={30} autoComplete="tel" placeholder="Mobile Number" aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? "enquiry-mobile-error" : undefined} className={inputClass} />
            {errors.mobile && <p id="enquiry-mobile-error" className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
          </div>
          <div>
            <label htmlFor="enquiry-city" className="sr-only">City (required)</label>
            <input id="enquiry-city" name="city" value={values.city} onChange={change} required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="City" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "enquiry-city-error" : undefined} className={inputClass} />
            {errors.city && <p id="enquiry-city-error" className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="enquiry-service" className="sr-only">Select Your Purpose (required)</label>
            <select id="enquiry-service" name="service" value={values.service} onChange={change} required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "enquiry-service-error" : undefined} className={inputClass}>
              <option value="" disabled>Select Your Purpose</option>
              {services.map((service) => <option key={service} value={service}>{service}</option>)}
            </select>
            {errors.service && <p id="enquiry-service-error" className="mt-1 text-sm text-red-600">{errors.service}</p>}
          </div>
        </fieldset>
        <div aria-live="polite" aria-atomic="true">
          {status && <p role={status.type === "error" ? "alert" : "status"} className={`mt-4 rounded-xl p-4 text-sm ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>{status.message}</p>}
        </div>
        <button type="submit" disabled={submitting} className="mt-3 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-red-700 focus-visible:outline-red-600 disabled:cursor-wait disabled:opacity-70">
          {submitting ? <><LoaderCircle size={20} className="animate-spin" />Sending...</> : "Submit"}
        </button>
      </form>
    </section>
  );
}
