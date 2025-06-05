import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Set the token as an HttpOnly cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        sameSite: 'strict',
      })
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Login API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}