import { useEffect, useState } from 'react'

import API from '../services/api'
import { logout } from '../auth'

import Filters from './Filters'
import VideoResults from './VideoResults'

export default function Dashboard() {

  const [locations, setLocations] = useState([])
  const [cameras, setCameras] = useState([])
  const [videos, setVideos] = useState([])

  // -----------------------------
  // LOAD LOCATIONS
  // -----------------------------
  useEffect(() => {
    fetchLocations()
  }, [])

  // -----------------------------
  // FETCH LOCATIONS
  // -----------------------------
  async function fetchLocations() {

    try {

      const response =
        await API.get('/locations')

      console.log(
        'Locations raw response:',
        response.data
      )

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      console.log(
        'Parsed locations:',
        data
      )

      setLocations(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (err) {

      console.error(
        'fetchLocations error:',
        err
      )

      setLocations([])
    }
  }

  // -----------------------------
  // FETCH CAMERAS
  // -----------------------------
  async function fetchCameras(location) {

    if (!location) return

    try {

      const response =
        await API.get(
          `/cameras?location=${encodeURIComponent(location)}`
        )

      console.log(
        'Cameras raw response:',
        response.data
      )

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      console.log(
        'Parsed cameras:',
        data
      )

      setCameras(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (err) {

      console.error(
        'fetchCameras error:',
        err
      )

      setCameras([])
    }
  }

  // -----------------------------
  // SEARCH VIDEOS
  // -----------------------------
  async function searchVideos(payload) {

    try {

      console.log(
        'SEARCH PAYLOAD:',
        payload
      )

      const response =
        await API.post(
          '/videos/search',
          payload
        )

      console.log(
        'FULL API RESPONSE:',
        response.data
      )

      let data = []

      if (response.data.body) {

        data =
          typeof response.data.body === 'string'
            ? JSON.parse(response.data.body)
            : response.data.body

      } else {

        data = response.data
      }

      console.log(
        'FINAL VIDEOS:',
        data
      )

      setVideos(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (err) {

      console.error(
        'searchVideos error:',
        err
      )

      setVideos([])
    }
  }

  // -----------------------------
  // SHARE VIDEO
  // -----------------------------
  async function handleShare(video) {

    try {

      console.log(
        '🔥 SHARE CLICKED:',
        video
      )

      const password =
        prompt(
          'Enter password for shared video'
        )

      if (!password) return

      const response =
        await API.post(

          '/videos/share',

          {
            s3_key: video.s3_key,
            password,
            expires_in_hours: 24
          }
        )

      console.log(
        'SHARE RESPONSE:',
        response.data
      )

      let data = response.data

      if (response.data.body) {

        data =
          typeof response.data.body === 'string'
            ? JSON.parse(response.data.body)
            : response.data.body
      }

      // -----------------------------
      // COPY LINK TO CLIPBOARD
      // -----------------------------
      await navigator.clipboard.writeText(
        data.share_url
      )

      alert(
        `Share link copied to clipboard:\n\n${data.share_url}`
      )

    } catch (err) {

      console.error(
        'handleShare error:',
        err
      )

      alert(
        'Failed to create share link'
      )
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (

    <div className="dashboard">

      {/* TOP BAR */}

      <div className="topbar">

        <h1>
          Alta Video Retrieval
        </h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {/* FILTERS */}

      <Filters
        locations={locations}
        cameras={cameras}
        onLocationChange={fetchCameras}
        onSearch={searchVideos}
      />

      {/* VIDEO RESULTS */}

      <VideoResults
        videos={videos}
        onShare={handleShare}
      />

    </div>
  )
}
