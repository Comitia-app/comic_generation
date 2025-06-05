import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Clear the authentication cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0), // Set expiration to the past to delete the cookie
      path: '/',
      sameSite: 'strict',
    })
  );

  return res.status(200).json({ success: true });
}