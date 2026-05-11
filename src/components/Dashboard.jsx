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

    const data =
      typeof response.data.body === 'string'
        ? JSON.parse(response.data.body)
        : response.data

    setLocations(data)

  } catch (err) {
    console.error(err)
    setLocations([])
  }
}

  async function fetchCameras(location) {
  try {

    const response = await API.get(
      `/cameras?location=${encodeURIComponent(location)}`
    )

    const data =
      typeof response.data.body === 'string'
        ? JSON.parse(response.data.body)
        : response.data

    setCameras(data)

  } catch (err) {
    console.error(err)
    setCameras([])
  }
}
  
async function searchVideos(payload) {
  try {

    const response = await API.post('/videos/search', payload)

    const data =
      typeof response.data.body === 'string'
        ? JSON.parse(response.data.body)
        : response.data

    setVideos(data)

  } catch (err) {
    console.error(err)
    setVideos([])
  }
}
  catch (err) {

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
