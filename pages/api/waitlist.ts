import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, story } = req.body

  const response = await fetch('https://script.google.com/macros/s/AKfycbzhng8PtJ1WrIcdJIYV-j1-Co-CcqxwGyUDVk0Ta6bElxLhoMsSXHNZt4dJMh6fcbDJ/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, story }),
  })

  if (response.ok) {
    res.status(200).json({ message: 'Saved to Google Sheets' })
  } else {
    res.status(500).json({ message: 'Failed to save' })
  }
}
