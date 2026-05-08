import { useState } from 'react'
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

      <select onChange={(e) => handleLocation(e.target.value)}>
        <option value="">Select Location</option>

        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select onChange={(e) => setCamera(e.target.value)}>
        <option value="">Select Camera</option>

        {cameras.map((camera) => (
          <option key={camera.id} value={camera.id}>
            {camera.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        onChange={(e) => {
          const [y, m, d] = e.target.value.split('-')

          setYear(y)
          setMonth(m)
          setDay(d)
        }}
      />

      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search Videos
      </button>

    </div>
  )
}
