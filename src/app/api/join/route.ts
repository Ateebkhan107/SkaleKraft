import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  asString,
  getClientIp,
  getContactEmailConfig,
  getJoinEmailTo,
  isEmail,
  isProbablyAutomated,
  isRateLimited,
  normalizeText,
  validateRequestSize,
} from "@/server/email";

export async function POST(request: Request) {
  if (!validateRequestSize(request, 10 * 1024 * 1024)) {
    return NextResponse.json({ error: "Application is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`join:${ip}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many applications. Please try again later." }, { status: 429 });
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
  const role = normalizeText(asString(formData.get("role")), 100);
  const skills = normalizeText(asString(formData.get("skills")), 2500);
  const portfolio = normalizeText(asString(formData.get("portfolio")), 300);
  const message = normalizeText(asString(formData.get("message")), 1200);
  const cv = formData.get("cv");

  if (!name || !email || !skills) {
    return NextResponse.json({ error: "Name, email, and skills are required." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (portfolio) {
    try {
      const url = new URL(portfolio);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid URL");
    } catch {
      return NextResponse.json({ error: "Please enter a valid portfolio URL." }, { status: 400 });
    }
  }

  let config;
  let emailTo: string;
  try {
    config = getContactEmailConfig();
    emailTo = getJoinEmailTo();
  } catch {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const attachments = [];

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "CV must be under 8MB." }, { status: 400 });
    }
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(cv.type)) {
      return NextResponse.json({ error: "CV must be a PDF, DOC, or DOCX file." }, { status: 400 });
    }

    const buffer = Buffer.from(await cv.arrayBuffer());
    attachments.push({
      filename: normalizeText(cv.name, 120) || "cv",
      content: buffer,
    });
  }

  const resend = new Resend(config.apiKey);

  try {
    await resend.emails.send({
      from: config.from,
      to: emailTo,
      replyTo: email,
      subject: `New agency application from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        role ? `Role: ${role}` : "",
        portfolio ? `Portfolio: ${portfolio}` : "",
        "",
        "Skills:",
        skills,
        "",
        message ? "Note:" : "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      attachments,
    });
  } catch {
    return NextResponse.json({ error: "Could not send right now. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
