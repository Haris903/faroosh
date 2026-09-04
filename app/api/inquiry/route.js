import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import Inquiry from '../../models/Inquiry';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validation
    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required.' }, 
        { status: 400 }
      );
    }

    // 1. Save data to MongoDB
    const inquiry = await Inquiry.create({
      name,
      phone,
      email,
      message
    });

    // 2. Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Aap apna provider (e.g., hostinger, zoho) bhi use kar sakte hain
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 3. Faroosh Branded Email Template
    const mailOptions = {
      from: '"Faroosh Farms" <' + process.env.EMAIL_USER + '>',
      to: 'opff56266@gmail.com', // Yahan wo email likhein jis par aapko notification chahiye
      subject: `Faroosh Inquiry: New Message from ${name}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid rgba(217, 119, 6, 0.3); border-radius: 12px; background-color: #FFFDF5; color: #3B110B;">
          <h2 style="color: #E11D48; border-bottom: 2px solid #D97706; padding-bottom: 10px; margin-bottom: 20px;">New Inquiry Received</h2>
          
          <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="font-size: 16px;"><strong>Email:</strong> ${email || 'Not provided'}</p>
          
          <h4 style="margin-top: 30px; margin-bottom: 10px; font-size: 18px; color: #5F2113;">Message:</h4>
          <p style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #E11D48; font-family: sans-serif; font-size: 15px; line-height: 1.6; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            ${message}
          </p>
          
          <p style="margin-top: 40px; font-size: 12px; color: #78350F; text-align: center; text-transform: uppercase; letter-spacing: 2px;">
            Faroosh Farms · Pothohar Region
          </p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error("Inquiry Error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}