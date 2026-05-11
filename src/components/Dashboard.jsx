import { useEffect, useState } from 'react'

import API from '../services/api'
import { logout } from '../auth'

import Filters from './Filters'
import VideoResults from './VideoResults'

export default function Dashboard() {

  const [locations, setLocations] = useState([])
  const [cameras, setCameras] = useState([])
  const [videos, setVideos] = useState([])

  // ---------------------------
  // LOAD LOCATIONS ON MOUNT
  // ---------------------------
  useEffect(() => {
    fetchLocations()
  }, [])

  // ---------------------------
  // GET LOCATIONS
  // ---------------------------
  async function fetchLocations() {

    try {

      const response = await API.get('/locations')

      console.log('Locations raw response:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setLocations(Array.isArray(data) ? data : [])

    } catch (err) {

      console.error('fetchLocations error:', err)
      setLocations([])

    }
  }

  // ---------------------------
  // GET CAMERAS BY LOCATION
  // ---------------------------
  async function fetchCameras(location) {

    if (!location) return

    try {

      const response = await API.get(
        `/cameras?location=${encodeURIComponent(location)}`
      )

      console.log('Cameras raw response:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setCameras(Array.isArray(data) ? data : [])

    } catch (err) {

      console.error('fetchCameras error:', err)
      setCameras([])

    }
  }

  // ---------------------------
  // SEARCH VIDEOS
  // ---------------------------
  async function searchVideos(payload) {

    try {

      const response = await API.post('/videos/search', payload)

      console.log('Videos raw response:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setVideos(Array.isArray(data) ? data : [])

    } catch (err) {

      console.error('searchVideos error:', err)
      setVideos([])

    }
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (

    <div className="dashboard">

      {/* TOP BAR */}
      <div className="topbar">

        <h1>Alta Video Retrieval</h1>

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

      {/* RESULTS */}
      <VideoResults videos={videos} />

    </div>
  )
}
