/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import { env } from "process";
//

export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
) {
  const THRESHOLD_PERCENTAGE = 40;

  const shortenedTitle =
    product.title.length > 30
      ? `${product.title.substring(0, 30)}...`
      : product.title;

  let subject = "";
  let body = "";

  // Reusable CTA button
  const ctaButton = (url: string, text: string) => `
    <div style="margin: 20px 0;">
      <a href="${url}" target="_blank" rel="noopener noreferrer"
        style="
          display: inline-block;
          background-color: #2563eb;
          color: #fff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: bold;
        ">
        ${text}
      </a>
    </div>
  `;

  // Base template wrapper
  const wrapTemplate = (content: string) => `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2563eb;">Scrapy Notifications 📢</h2>
      ${content}
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 13px; color: #888;">
        You’re receiving this email because you’re tracking <b>${shortenedTitle}</b>.<br/>
        Manage your tracked products anytime in your Scrapy dashboard.
      </p>
    </div>
  `;

  switch (type) {
    case "WELCOME":
      subject = `🎉 Welcome to Scrapy – Tracking ${shortenedTitle}`;
      body = wrapTemplate(`
        <p>Hi there 👋</p>
        <p>You’ve successfully started tracking <b>${product.title}</b>.</p>
        <p>Here’s how you’ll get updates whenever prices change or stock returns:</p>
        <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px; background-color: #f9fafb; margin: 20px 0;">
          <h3 style="margin: 0 0 10px;">Example Notification</h3>
          <p><b>${product.title}</b> is back in stock!</p>
          <img src="${product.image}" 
               alt="Product Image" style="max-width: 100%; border-radius: 8px;" />
        </div>
        ${ctaButton(product.url, "View Product")}
        <p>We’ll keep you posted on all changes 🚀</p>
      `);
      break;

    case "CHANGE_OF_STOCK":
      subject = `📦 ${shortenedTitle} is back in stock!`;
      body = wrapTemplate(`
        <p>Good news! <b>${product.title}</b> is now available again 🎉</p>
        ${ctaButton(product.url, "Buy Now")}
        <p>Hurry before it sells out again!</p>
      `);
      break;

    case "LOWEST_PRICE":
      subject = `🔥 Lowest Price Alert for ${shortenedTitle}`;
      body = wrapTemplate(`
        <p>Exciting news! <b>${
          product.title
        }</b> just dropped to its <b>lowest price ever</b> 🎯</p>
        ${ctaButton(product.url, "Grab the Deal")}
        <p>Don’t miss out on this offer – it might not last long.</p>
      `);
      break;

    case "THRESHOLD_MET":
      subject = `💸 ${shortenedTitle} is now ${THRESHOLD_PERCENTAGE}% off!`;
      body = wrapTemplate(`
        <p>Great news! <b>${
          product.title
        }</b> is now discounted by more than ${THRESHOLD_PERCENTAGE}% 🎉</p>
        ${ctaButton(product.url, "Shop Now")}
        <p>Snag it before the price goes back up!</p>
      `);
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
}
let transporter: any = null;
function initTransporter() {
  if (transporter) return;
  const nodemailer = require("nodemailer");

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_APP_PASS, // 16-digit app password
    },
  });
}

export async function sendEmail(
  EmailContent: EmailContent,
  receivers: string[]
) {
  initTransporter();
  const from = process.env.GMAIL_USER;
  const info = await transporter.sendMail({
    from,
    to: receivers,
    subject: EmailContent.subject,
    html: EmailContent.body,
  });
  console.log(info);
}
