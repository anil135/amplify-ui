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

      setLocations(response.data)

    } catch (err) {

      console.error(err)

    }
  }

  async function fetchCameras(location) {

    try {

      const response = await API.get(
        `/cameras?location=${encodeURIComponent(location)}`
      )

      setCameras(response.data)

    } catch (err) {

      console.error(err)

    }
  }

  async function searchVideos(payload) {

    try {

      const response = await API.post(
        '/videos/search',
        payload
      )

      setVideos(response.data)

    } catch (err) {

      console.error(err)

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
