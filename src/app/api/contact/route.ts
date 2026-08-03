import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailTo = process.env.CONTACT_EMAIL_TO || "skalekraft@gmail.com";
const emailFrom = process.env.CONTACT_EMAIL_FROM || "SkaleKraft <onboarding@resend.dev>";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const phone = asString(formData.get("phone"));
  const company = asString(formData.get("company"));
  const service = asString(formData.get("service"));
  const budget = asString(formData.get("budget"));
  const message = asString(formData.get("message"));
  const source = asString(formData.get("source")) || "Contact form";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: emailFrom,
    to: emailTo,
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

  return NextResponse.json({ ok: true });
}
