import transporter from "../config/transporter.config.js";
import config from "../config/index.js";

const mailHelper = async (options) => {
  const messages = {
    from: config.SMTP_SENDER_MAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
  };
  await transporter.sendMail(messages);
};

export default mailHelper;
