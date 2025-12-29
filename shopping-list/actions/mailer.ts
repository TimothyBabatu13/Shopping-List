import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});


export  const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.log(error)
    throw new Error(error instanceof Error ? error.message : "Failed to send email");
  }
}


export const getVerificationEmailTemplate = ({ recipientName, senderName, listLink, listName } : {
    recipientName: string,
    senderName: string,
    listName: string,
    listLink: string
 }) => {
    return `
    <div 
        style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #f9f9fb; border: 1px solid #e5e7eb; border-radius: 10px;"
    >
        <h2 
            style="color: #111827; margin-bottom: 12px;"
        >
            You're invited to collaborate 🎉
        </h2>
        <p 
            style="font-size: 16px; color: #374151; line-height: 1.6;"
        >
            Hi <strong>${recipientName}</strong>,
        </p>
        <p 
            style="font-size: 16px; color: #374151; line-height: 1.6;"
        >
            <strong>${senderName}</strong> 
            has invited you to collaborate on the list
            <strong>"${listName}"</strong>.
        </p>
        <p 
            style="font-size: 16px; color: #374151; line-height: 1.6;"
        >
            Click the button below to open the list and start collaborating in real time.
        </p>
        
        <div 
            style="text-align: center; margin: 28px 0;"
        >
            <a
                href="${listLink}"
                style="display: inline-block;padding: 14px 28px;background-color: #6366f1;color: #ffffff;text-decoration: none;font-size: 16px;font-weight: 600;border-radius: 6px;"
                target="_blank"
            >
                Open List
            </a>
        </div>
        
        <p 
            style="font-size: 14px; color: #6b7280; line-height: 1.5;"
        >
            If you don’t have an account yet, you’ll be prompted to sign up before accessing the list.
        </p>
        <p 
            style="font-size: 14px; color: #9ca3af; margin-top: 32px;"
        >
            If you didn’t expect this invitation, you can safely ignore this email.
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p 
            style="font-size: 13px; color: #9ca3af;"
        >
            — Shopping List Team
        </p>
    </div>

    `;
}
  