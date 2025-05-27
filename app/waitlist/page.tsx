'use client'

import { useState } from 'react'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [story, setStory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email || !story) {
      alert("Please fill out all fields.")
      return
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxOIv44YZRU2HpjOvAUcqxL8x4TFmAWMCxGX-zObbBCSPs-beTe0ojU1FwS3_9C0TEW/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, story }).toString(),
      })

      const text = await response.text()

      if (text.includes("success")) {
        setSubmitted(true)
      } else {
        alert("Submission failed. Please try again later.")
      }
    } catch (error) {
      console.error('Fetch error:', error)
      alert("Submission failed. Please try again later.")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4">Join the Comitia Waitlist</h1>
      {submitted ? (
        <p className="text-green-600 text-lg">
          Thank you! We will notify you when Comitia launches. 📩
        </p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />
          <textarea
            placeholder="What kind of comic do you want to create?"
            value={story}
            onChange={e => setStory(e.target.value)}
            rows={5}
            className="w-full border p-2 mb-3 rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </>
      )}
    </div>
  )
}




