import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(
          new Response(JSON.stringify({ message: 'Error parsing form data' }), { status: 500 })
        );
      }

      const {
        email,
        name,
        phone,
        orderType,
        orderNumber,
        subject,
        message,
      } = fields;

      const attachment = files.attachment;

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail', // or use host, port, auth if not Gmail
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: process.env.CONTACT_RECEIVER_EMAIL,
          replyTo: email,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Order Type:</strong> ${orderType}</p>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `,
        };

        if (attachment) {
          mailOptions.attachments = [
            {
              filename: attachment.originalFilename,
              path: attachment.filepath,
            },
          ];
        }

        await transporter.sendMail(mailOptions);

        return resolve(
          new Response(JSON.stringify({ message: 'Message sent successfully' }), {
            status: 200,
          })
        );
      } catch (error) {
        console.error('Email send error:', error);
        return resolve(
          new Response(JSON.stringify({ message: 'Failed to send email' }), {
            status: 500,
          })
        );
      }
    });
  });
}
