import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  asString,
  getClientIp,
  getContactEmailConfig,
  isEmail,
  isPhone,
  isProbablyAutomated,
  isRateLimited,
  normalizeText,
  validateRequestSize,
} from "@/server/email";

export async function POST(request: Request) {
  if (!validateRequestSize(request, 24 * 1024)) {
    return NextResponse.json({ error: "The message is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (isProbablyAutomated(formData)) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = normalizeText(asString(formData.get("name")), 90);
  const email = normalizeText(asString(formData.get("email")), 254).toLowerCase();
  const phone = normalizeText(asString(formData.get("phone")), 32);
  const company = normalizeText(asString(formData.get("company")), 120);
  const service = normalizeText(asString(formData.get("service")), 80);
  const budget = normalizeText(asString(formData.get("budget")), 40);
  const message = normalizeText(asString(formData.get("message")), 3000);
  const source = normalizeText(asString(formData.get("source")) || "Contact form", 80);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  if (name.length < 2 || message.length < 20) {
    return NextResponse.json({ error: "Please add a little more detail before sending." }, { status: 400 });
  }

  let config;
  try {
    config = getContactEmailConfig();
  } catch {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(config.apiKey);

  try {
    await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `New SkaleKraft enquiry from ${name}`,
      text: [
        `Source: ${source}`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        company ? `Company: ${company}` : "",
        service ? `Service: ${service}` : "",
        budget ? `Budget: ${budget}` : "",
        "",
        "Project idea:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    return NextResponse.json({ error: "Could not send right now. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
