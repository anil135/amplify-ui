import { useState } from 'react'

export default function Filters({
  locations = [],
  cameras = [],
  onLocationChange = () => {},
  onSearch = () => {}
}) {

  const [location, setLocation] = useState('')
  const [camera, setCamera] = useState('')

  const [startDate, setStartDate] =
    useState('2026-05-01')

  const [endDate, setEndDate] =
    useState('2026-06-01')

  const [startTime, setStartTime] =
    useState('00:00')

  const [endTime, setEndTime] =
    useState('23:59')

  // -----------------------------
  // LOCATION
  // -----------------------------
  const handleLocation = (value) => {

    setLocation(value)
    setCamera('')

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

    const payload = {

      location,

      camera_id: camera,

      start_time:
        `${startDate}T${startTime}:00Z`,

      end_time:
        `${endDate}T${endTime}:59Z`
    }

    console.log(payload)

    onSearch(payload)
  }

  return (

    <div className="filters">

      {/* LOCATION */}

      <select
        value={location}
        onChange={(e) =>
          handleLocation(e.target.value)
        }
      >

        <option value="">
          Select Location
        </option>

        {locations.map((loc) => (

          <option
            key={loc}
            value={loc}
          >
            {loc}
          </option>

        ))}

      </select>

      {/* CAMERA */}

      <select
        value={camera}
        onChange={(e) =>
          setCamera(e.target.value)
        }
        disabled={!location}
      >

        <option value="">
          Select Camera
        </option>

        {cameras.map((cam) => (

          <option
            key={cam.id}
            value={cam.id}
          >
            {cam.name}
          </option>

        ))}

      </select>

      {/* START DATE */}

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
      />

      {/* END DATE */}

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
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

      <button onClick={handleSearch}>
        Search Videos
      </button>

    </div>
  )
}
