import { getVerificationEmailTemplate, sendEmail } from "@/actions/mailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json() as { receiver: string };
  console.log(body)
  try {
      const res = await sendEmail(body.receiver, "Test Email", getVerificationEmailTemplate())
      console.log(res)
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ message: "Email sent successfully" }, {status: 200})
  
}