import { useEffect, useState } from 'react'

import API from '../services/api'

import { logout } from '../auth'

import Filters from './Filters'
import VideoResults from './VideoResults'

export default function Dashboard() {

  const [locations, setLocations] = useState([])

  const [cameras, setCameras] = useState([])

  const [videos, setVideos] = useState([])

  useEffect(() => {

    fetchLocations()

  }, [])

  async function fetchLocations() {

    try {

      const response = await API.get('/locations')

      console.log('LOCATIONS API:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setLocations(data)

    } catch (err) {

      console.error('fetchLocations error:', err)

      setLocations([])

    }
  }

  async function fetchCameras(location) {

    try {

      const response = await API.get(
        `/cameras?location=${encodeURIComponent(location)}`
      )

      console.log('CAMERAS API:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setCameras(data)

    } catch (err) {

      console.error('fetchCameras error:', err)

      setCameras([])

    }
  }

  async function searchVideos(payload) {

    try {

      const response = await API.post(
        '/videos/search',
        payload
      )

      console.log('VIDEOS API:', response.data)

      const data =
        typeof response.data.body === 'string'
          ? JSON.parse(response.data.body)
          : response.data

      setVideos(data)

    } catch (err) {

      console.error('searchVideos error:', err)

      setVideos([])

    }
  }

  return (

    <div className="dashboard">

      <div className="topbar">

        <h1>Alta Video Retrieval</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <Filters
        locations={locations}
        cameras={cameras}
        onLocationChange={fetchCameras}
        onSearch={searchVideos}
      />

      <VideoResults videos={videos} />

    </div>
  )
}
