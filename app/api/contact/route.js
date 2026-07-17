import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseEmailList(value) {
  return String(value || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { message: "Email service is not configured." },
      { status: 500 },
    );
  }

  const toEmail = parseEmailList(
    process.env.CONTACT_EMAIL || process.env.RESEND_TO_EMAIL,
  );

  if (toEmail.length === 0) {
    return Response.json(
      { message: "Contact recipient email is not configured." },
      { status: 500 },
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const fullName = String(payload.fullName || "").trim();
  const email = String(payload.email || "").trim();
  const subject = String(payload.subject || "").trim();
  const message = String(payload.message || "").trim();

  if (!fullName || !email || !subject || !message) {
    return Response.json(
      { message: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "TrainHub AI <onboarding@resend.dev>";
    const sentAt = new Date();
    const emailSubject = `TrainHub AI contact from ${fullName}: ${subject} - ${sentAt.toLocaleString(
      "en-US",
      { timeZone: "UTC" },
    )} UTC`;
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
      replyTo: email,
      subject: emailSubject,
      text: `Name: ${fullName}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      to: toEmail,
    });

    if (error) {
      return Response.json(
        { message: error.message || "Could not send your message." },
        { status: 500 },
      );
    }

    return Response.json({
      id: data?.id,
      message: "Message sent successfully.",
    });
  } catch (error) {
    return Response.json(
      { message: error.message || "Could not send your message." },
      { status: 500 },
    );
  }
}
