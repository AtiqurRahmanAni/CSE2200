import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<test@gmail.com>",
    to: ["receiver99@gmail.com"],
    subject: "Hello ✔",
    text: "This is a test mail",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
