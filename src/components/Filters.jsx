import { useState } from 'react'

export default function Filters({
  locations = [],
  cameras = [],
  onLocationChange = () => {},
  onSearch = () => {}
}) {

  const [location, setLocation] = useState('')
  const [camera, setCamera] = useState('')

  const [year, setYear] = useState('2026')
  const [month, setMonth] = useState('05')
  const [day, setDay] = useState('08')

  const [startTime, setStartTime] = useState('13:00')
  const [endTime, setEndTime] = useState('14:00')

  // -----------------------------
  // LOCATION CHANGE
  // -----------------------------
  const handleLocation = (value) => {

    console.log('Selected location:', value)

    setLocation(value)

    // reset selected camera
    setCamera('')

    // fetch cameras for selected location
    onLocationChange(value)
  }

  // -----------------------------
  // SEARCH
  // -----------------------------
  const handleSearch = () => {

    if (!location || !camera) {

      alert('Please select location and camera')
      return
    }

    const start =
      `${year}-${month}-${day}T${startTime}:00Z`

    const end =
      `${year}-${month}-${day}T${endTime}:59Z`

    const payload = {
      location,
      camera_id: camera,
      start_time: start,
      end_time: end
    }

    console.log('SEARCH PAYLOAD:', payload)

    onSearch(payload)
  }

  return (

    <div className="filters">

      {/* LOCATION DROPDOWN */}

      <select
        value={location}
        onChange={(e) => handleLocation(e.target.value)}
      >

        <option value="">
          Select Location
        </option>

        {(locations || []).map((loc) => (
          <option
            key={loc}
            value={loc}
          >
            {loc}
          </option>
        ))}

      </select>

      {/* CAMERA DROPDOWN */}

      <select
        value={camera}
        onChange={(e) => setCamera(e.target.value)}
        disabled={!location}
      >

        <option value="">
          Select Camera
        </option>

        {(cameras || []).map((cam) => (

          <option
            key={cam.id}
            value={cam.id}
          >
            {cam.name}
          </option>

        ))}

      </select>

      {/* DATE */}

      <input
        type="date"
        value={`${year}-${month}-${day}`}
        onChange={(e) => {

          if (!e.target.value) return

          const [y, m, d] =
            e.target.value.split('-')

          setYear(y)
          setMonth(m)
          setDay(d)
        }}
      />

      {/* START TIME */}

      <input
        type="time"
        value={startTime}
        onChange={(e) =>
          setStartTime(e.target.value)
        }
      />

      {/* END TIME */}

      <input
        type="time"
        value={endTime}
        onChange={(e) =>
          setEndTime(e.target.value)
        }
      />

      {/* SEARCH BUTTON */}

      <button onClick={handleSearch}>
        Search Videos
      </button>

    </div>
  )
}
