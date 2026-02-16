import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Try to save to database
    let dbError = null;
    try {
      await prisma.contactMessage.create({
        data: {
          name: String(name).slice(0, 200),
          email: String(email).slice(0, 200),
          subject: subject ? String(subject).slice(0, 200) : null,
          message: String(message).slice(0, 5000),
        },
      });
    } catch (error) {
      console.error("Database saving error:", error);
      dbError = error.message;
    }

    // Try to send email
    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // If both failed, then return 500
      if (dbError) {
        return NextResponse.json(
          {
            error:
              "Failed to process request. Both database and email service failed.",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      warning: dbError
        ? "Message sent via email but failed to save to database"
        : null,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
