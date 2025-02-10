import imaps from "imap-simple";
import dotenv from "dotenv";
import User from "../models/User.js";
import { sendEmail } from "../config/emailService.js";
import RechargeRequest from "../models/RechargeRequest.js";

dotenv.config();

const EMAIL = process.env.EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

const imapConfig = {
  imap: {
    user: EMAIL,
    password: APP_PASSWORD,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000,
  },
};

async function checkRechargeEmails() {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: ["HEADER", "TEXT"], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const msg of messages) {
      const emailHeader = msg.parts.find((part) => part.which === "HEADER");
  if (!emailHeader) continue;

  const subject = emailHeader.body["subject"] || emailHeader.body["Subject"];
  if (!subject || !subject[0].toLowerCase().includes("recharge 5 credits")) continue;

  const fromHeader = emailHeader.body["from"] || emailHeader.body["From"];
  if (!fromHeader || !fromHeader[0]) continue;

  const match = fromHeader[0].match(/<([^>]+)>/);
  const userEmail = match ? match[1] : fromHeader[0]; 

      const user = await User.findOne({ email: userEmail });

      if (!user) {
        await sendEmail(userEmail, "Recharge Request Failed", "Your email is not registered in our system.");
        continue;
      }

      if (user.credits > 0) {
        await sendEmail(userEmail, "Recharge Denied", "You can only recharge when your credits are exhausted.");
        continue;
      }

      user.credits = 5;
      await user.save();

      await RechargeRequest.create({ user: user._id, email: userEmail });

      await sendEmail(userEmail, "Recharge Successful", "Your credits have been restored to 5.");
    }

    await connection.end();

  } catch (error) {
    console.error("Error checking recharge emails:", error);
  }
}

export { checkRechargeEmails };
