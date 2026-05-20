import { useState } from 'react'
import { useParams } from 'react-router-dom'

import API from '../services/api'

export default function SharePage() {

  const { token } = useParams()

  const [password, setPassword] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // -----------------------------
  // VERIFY SHARE LINK
  // -----------------------------
  async function handleVerify() {

    try {

      setLoading(true)
      setError('')

      console.log('VERIFY PAYLOAD:', {
        token,
        password
      })

      const response =
        await API.post('/share/verify', {
          token,
          password
        })

      console.log('VERIFY RESPONSE:', response.data)

      let data = response.data

      if (response.data.body) {

        data =
          typeof response.data.body === 'string'
            ? JSON.parse(response.data.body)
            : response.data.body
      }

      if (!data.video_url) {
        throw new Error('No video URL returned')
      }

      setVideoUrl(data.video_url)

    } catch (err) {

      console.error('VERIFY ERROR:', err)

      setError('Invalid password or expired link')

    } finally {

      setLoading(false)
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (

    <div style={{ padding: '40px', maxWidth: '600px' }}>

      <h2>Secure Shared Video</h2>

      {/* ERROR */}
      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {/* VIDEO */}
      {videoUrl ? (

        <div>

          <video
            controls
            width="100%"
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
          </video>

        </div>

      ) : (

        <div>

          <p>Enter password to view video</p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px'
            }}
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            style={{
              padding: '10px 20px'
            }}
          >
            {loading ? 'Verifying...' : 'Open Video'}
          </button>

        </div>
      )}

    </div>
  )
}
