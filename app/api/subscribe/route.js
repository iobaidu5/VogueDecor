export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ message: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    console.log("API_KEY -> ", API_KEY)
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    console.log("AUDIENCE_ID -> ", AUDIENCE_ID)
    const DATACENTER = API_KEY.split('-')[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const axios = require('axios');

    await axios.post(
      url,
      {
        email_address: email,
        status: 'subscribed',
      },
      {
        headers: {
          'Authorization': `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMsg =
      error.response?.data?.detail || 'Subscription failed';

    return new Response(JSON.stringify({ message: errorMsg }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
