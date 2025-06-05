import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if the accessToken cookie exists
  const accessToken = req.cookies.accessToken;
  
  // Return authentication status
  return res.status(200).json({ 
    authenticated: !!accessToken 
  });
}