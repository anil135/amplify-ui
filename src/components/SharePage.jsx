import { useState } from 'react'

import { useParams } from 'react-router-dom'

import API from '../services/api'

export default function SharePage() {

  const { token } = useParams()

  const [password, setPassword] =
    useState('')

  const [videoUrl, setVideoUrl] =
    useState('')

  const [error, setError] =
    useState('')

  async function verifyShare() {

    try {

      setError('')

      const response =
        await API.post(

          '/share/verify',

          {
            token,
            password
          }
        )

      let data = response.data

      if (response.data.body) {

        data =
          typeof response.data.body === 'string'
            ? JSON.parse(response.data.body)
            : response.data.body
      }

      setVideoUrl(
        data.video_url
      )

    } catch (err) {

      console.error(err)

      setError(
        'Invalid password or expired link'
      )
    }
  }

  return (

    <div
      style={{
        padding: '40px'
      }}
    >

      <h1>
        Secure Shared Video
      </h1>

      {!videoUrl ? (

        <>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={verifyShare}
          >
            Open Video
          </button>

          {error && (

            <p
              style={{
                color: 'red'
              }}
            >
              {error}
            </p>
          )}

        </>

      ) : (

        <video
          controls
          width="100%"
        >

          <source
            src={videoUrl}
            type="video/mp4"
          />

        </video>
      )}

    </div>
  )
}
