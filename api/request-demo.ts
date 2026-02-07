import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (!process.env.RESEND_API_KEY) {
        console.error('Missing RESEND_API_KEY');
        return response.status(500).json({ error: 'Missing RESEND_API_KEY in Vercel Settings' });
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { fullName, email, labName, address, city, contact, selectedSlot } = request.body;

    if (!fullName || !email || !labName || !address || !city || !contact || !selectedSlot) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'contact@arogyabiox.com',
            replyTo: email,
            subject: `New Demo Request from ${fullName}`,
            html: `
        <div>
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>HOSPITAL/Laboratory Name:</strong> ${labName}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Contact:</strong> ${contact}</p>
          <p><strong>Requested Time Slot:</strong> ${selectedSlot}</p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return response.status(400).json({ error });
        }

        return response.status(200).json({ data });
    } catch (error) {
        console.error('Server error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
