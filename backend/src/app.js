import express from "express";
import { SERVICES, validateEnquiry } from "./enquiries.js";

export function createApp({ saveEnquiry, configured = true, logger = console } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });
  app.use(express.json({ limit: "8kb", strict: false }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", databaseConfigured: configured });
  });
  app.get("/api/services", (req, res) => res.json({ services: SERVICES }));

  app.post("/api/enquiries", async (req, res) => {
    if (!req.is("application/json")) return res.status(415).json({ message: "Send the form as JSON." });
    const result = validateEnquiry(req.body);
    if (result.errors) return res.status(400).json({ message: "Please check your details.", errors: result.errors });
    if (!configured || !saveEnquiry) return res.status(503).json({ message: "Online enquiries are not available yet. Please contact us by phone or WhatsApp." });
    try {
      await saveEnquiry(result.data);
      return res.status(201).json({ message: "Thank you! Your enquiry has been received. Our team will contact you soon." });
    } catch (error) {
      // Log an error code only; never log the visitor's details or credentials.
      logger.error("Enquiry could not be saved:", error.code || "database_error");
      return res.status(503).json({ message: "We could not save your enquiry. Please try again shortly." });
    }
  });

  app.use((req, res) => res.status(404).json({ message: "Endpoint not found." }));
  app.use((error, req, res, next) => {
    if (error.type === "entity.too.large") return res.status(413).json({ message: "The submitted form is too large." });
    if (error.type === "entity.parse.failed") return res.status(400).json({ message: "The submitted form contains invalid JSON." });
    logger.error("Request failed:", error.code || "request_error");
    return res.status(500).json({ message: "The request could not be processed." });
  });
  return app;
}
