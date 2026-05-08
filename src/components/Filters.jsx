import { useState } from 'react'

export default function Filters({
  locations,
  cameras,
  onLocationChange,
  onSearch
}) {

  const [location, setLocation] = useState('')
  const [camera, setCamera] = useState('')

  const [year, setYear] = useState('2026')
  const [month, setMonth] = useState('05')
  const [day, setDay] = useState('01')

  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')

  const handleLocation = (value) => {

    setLocation(value)

    onLocationChange(value)
  }

  const handleSearch = () => {

    const start =
      `${year}-${month}-${day}T${startTime}:00Z`

    const end =
      `${year}-${month}-${day}T${endTime}:59Z`

    onSearch({
      location,
      camera_id: camera,
      start_time: start,
      end_time: end
    })
  }

  return (

    <div className="filters">

      <select
        value={location}
        onChange={(e) => handleLocation(e.target.value)}
      >
        <option value="">
          Select Location
        </option>

        {locations.map((location) => (
          <option
            key={location}
            value={location}
          >
            {location}
          </option>
        ))}

      </select>

      <select
        value={camera}
        onChange={(e) => setCamera(e.target.value)}
      >

        <option value="">
          Select Camera
        </option>

        {cameras.map((camera) => (
          <option
            key={camera.id}
            value={camera.id}
          >
            {camera.name}
          </option>
        ))}

      </select>

      <input
        type="date"
        onChange={(e) => {

          const [y, m, d] =
            e.target.value.split('-')

          setYear(y)
          setMonth(m)
          setDay(d)
        }}
      />

      <input
        type="time"
        value={startTime}
        onChange={(e) =>
          setStartTime(e.target.value)
        }
      />

      <input
        type="time"
        value={endTime}
        onChange={(e) =>
          setEndTime(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search Videos
      </button>

    </div>
  )
}
