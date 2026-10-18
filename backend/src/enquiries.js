export const SERVICES = [
  "Web Development",
  "Internship",
  "Digital Marketing",
  "App Development",
  "UI/UX Design",
  "Cloud Services",
  "Training & Certification",
  "Staffing & Recruitment",
  "Other",
];

export function validateEnquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { errors: { form: "Please provide your enquiry details." } };
  }
  const text = (key) => typeof input[key] === "string" ? input[key].trim().replace(/\s+/g, " ") : "";
  const name = text("name");
  const city = text("city");
  const service = text("service");
  const rawMobile = text("mobile");
  const mobile = rawMobile.replace(/[\s()-]/g, "");
  const errors = {};
  if (name.length < 2 || name.length > 100 || /[\x00-\x1f\x7f]/.test(name)) errors.name = "Enter a name between 2 and 100 characters.";
  if (rawMobile.length > 30 || !/^\+?[0-9]{10,15}$/.test(mobile)) errors.mobile = "Enter a valid mobile number with 10 to 15 digits.";
  if (city.length < 2 || city.length > 100 || /[\x00-\x1f\x7f]/.test(city)) errors.city = "Enter a city between 2 and 100 characters.";
  if (!SERVICES.includes(service)) errors.service = "Choose a service from the list.";
  return Object.keys(errors).length ? { errors } : { data: { name, mobile, city, service } };
}
