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
    return false;
  }
}


export const getVerificationEmailTemplate = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Verify Your Account</h2>
        <p style="font-size: 16px; color: #555;">
          Use the verification code below to complete your signup process.
        </p>
        <div style="margin: 20px 0; padding: 15px; background: #fff; border: 1px dashed #ccc; text-align: center; font-size: 24px; letter-spacing: 2px; font-weight: bold;">
        </div>
        <p style="font-size: 14px; color: #888;">
          This code will expire in <strong> minutes</strong>. 
          If you did not request this code, you can safely ignore this email.
        </p>
        <p style="font-size: 14px; color: #aaa; margin-top: 30px;">&mdash; Teq Team</p>
      </div>
    `;
}
  