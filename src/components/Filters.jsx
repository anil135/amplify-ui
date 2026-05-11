import { useEffect, useState } from "react";
import Filters from "./Filters";

export default function Page() {

  const [locations, setLocations] = useState([]);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {

    const fetchLocations = async () => {
      try {
        const res = await fetch(API_URL + "/locations");
        const data = await res.json();

        // IMPORTANT: parse body safely
        const parsed = JSON.parse(data.body || "[]");

        setLocations(parsed);

      } catch (err) {
        console.error("Location API error:", err);
        setLocations([]);
      }
    };

    fetchLocations();

  }, []);

  const handleLocationChange = async (location) => {

    try {
      const res = await fetch(
        API_URL + "/cameras?location=" + location
      );

      const data = await res.json();

      const parsed = JSON.parse(data.body || "[]");

      setCameras(parsed);

    } catch (err) {
      console.error("Camera API error:", err);
      setCameras([]);
    }
  };

  const handleSearch = (payload) => {
    console.log("Search:", payload);
  };

  return (
    <Filters
      locations={locations}
      cameras={cameras}
      onLocationChange={handleLocationChange}
      onSearch={handleSearch}
    />
  );
}
