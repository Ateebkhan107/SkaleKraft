import "server-only";

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestLog = new Map<string, number[]>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= limit) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

export function getContactEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    throw new Error("Email service is missing required server configuration.");
  }

  if (!isEmail(to) || !from.includes("<hello@skalekraft.in>")) {
    throw new Error("Email service has invalid server configuration.");
  }

  return { apiKey, from, to };
}

export function getJoinEmailTo() {
  const to = process.env.JOIN_EMAIL_TO || process.env.CONTACT_EMAIL_TO;
  if (!to || !isEmail(to)) throw new Error("Join email destination is not configured.");
  return to;
}

export function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

export function isEmail(value: string) {
  return value.length <= 254 && emailPattern.test(value);
}

export function isPhone(value: string) {
  if (!value) return true;
  return value.length <= 32 && /^[+()\d\s.-]{7,32}$/.test(value);
}

export function isProbablyAutomated(formData: FormData) {
  const honeypot = asString(formData.get("website"));
  const startedAt = Number(asString(formData.get("startedAt")));
  const elapsed = Date.now() - startedAt;

  return Boolean(honeypot) || !Number.isFinite(startedAt) || elapsed < 1800;
}

export function validateRequestSize(request: Request, maxBytes: number) {
  const length = Number(request.headers.get("content-length") || "0");
  return !length || length <= maxBytes;
}
