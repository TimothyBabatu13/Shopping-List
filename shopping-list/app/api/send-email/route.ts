import { getVerificationEmailTemplate, sendEmail } from "@/actions/mailer";
import { parseZodError } from "@/lib/zod-error";
import { CronJobInput } from "@/lib/zod-validations";
import { NextResponse } from "next/server";

export const  POST = async (request: Request) => {
  const body = await request.json()
  console.log(body)
   const { success, data, error } = CronJobInput.safeParse(body);
    console.log(success, data, error)
    if(!success){
        return NextResponse.json(parseZodError(error), {status: 400})
    }
    console.log('did it get here')
    const { recipient, listLink, listName, sender } = data;
    
    try {
      const res = await sendEmail(recipient, "Invitation: Join a shared list on Shopping List", getVerificationEmailTemplate({
        listLink:listLink,
        listName: listName,
        recipientName: recipient.split("@")[0],
        senderName: sender
    }))
    console.log(res)
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ message: "Email sent successfully" }, {status: 200})
  
}