import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const email = formData.get('email');
    const name = formData.get('name');
    const phone = formData.get('phone') || 'Not provided';
    const orderType = formData.get('orderType') || 'Not specified';
    const orderNumber = formData.get('orderNumber') || 'Not provided';
    const subject = formData.get('subject');
    const message = formData.get('message') || 'No message provided';
    const attachment = formData.get('attachment');

    // Validate required fields
    if (!email || !name || !subject) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Order Type:</strong> ${orderType}</p>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
              ${message}
            </div>
          </div>
        </div>
      `,
    };

    // Add attachment if exists
    if (attachment && attachment.size > 0) {
      const bytes = await attachment.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      mailOptions.attachments = [
        {
          filename: attachment.name,
          content: buffer,
          contentType: attachment.type,
        },
      ];
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}