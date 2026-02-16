import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (data) => {
  const { name, email, subject, message } = data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agadge797@gmail.com",
    replyTo: email,
    subject: `Portfolio Contact: ${subject || "New Message"}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No subject"}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 5px;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
