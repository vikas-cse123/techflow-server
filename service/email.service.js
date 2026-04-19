import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({to, subject, html}) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME}"  ${process.env.SMTP_USER}`,
      to,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
