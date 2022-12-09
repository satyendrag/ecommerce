import nodemailer from "nodemailer";
import config from ".";

let transporter = nodemailer.createTransport({
  host: config.SMTP_MAIL_HOST,
  port: config.SMTP_MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.SMTP_MAIL_USER,
    pass: config.SMTP_MAIL_PASSWORD,
  },
});

export default transporter;
