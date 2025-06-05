import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // 인증 쿠키 제거
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0), // 과거 날짜로 삭제
            path: '/',
            sameSite: 'strict',
        })
    );

    return res.status(200).json({ success: true });
}