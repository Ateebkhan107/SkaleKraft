import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailTo = process.env.JOIN_EMAIL_TO || process.env.CONTACT_EMAIL_TO || "skalekraft@gmail.com";
const emailFrom = process.env.CONTACT_EMAIL_FROM || "SkaleKraft <onboarding@resend.dev>";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const role = asString(formData.get("role"));
  const skills = asString(formData.get("skills"));
  const portfolio = asString(formData.get("portfolio"));
  const message = asString(formData.get("message"));
  const cv = formData.get("cv");

  if (!name || !email || !skills) {
    return NextResponse.json({ error: "Name, email, and skills are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const attachments = [];

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "CV must be under 8MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await cv.arrayBuffer());
    attachments.push({
      filename: cv.name,
      content: buffer,
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: emailFrom,
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

  return NextResponse.json({ ok: true });
}
