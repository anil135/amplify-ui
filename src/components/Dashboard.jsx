import { useState } from "react";
import Filters from "./Filters";
import VideoList from "./VideoList";
import API from "../services/api";

import { logout } from "../auth";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);

    try {
      const res = await API.post("/videos/search", filters);

      const formatted = (res.data || []).map((v) => ({
        timestamp: v.timestamp,
        url: v.video_url
      }));

      setVideos(formatted);
    } catch (err) {
      console.warn("API failed, using mock video");

      // MOCK fallback so UI works
      setVideos([
        {
          timestamp: "10:00",
          url: "https://www.w3schools.com/html/mov_bbb.mp4"
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Video Explorer</h2>

      <Filters onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      <VideoList videos={videos} />
    </div>
    
    <button onClick={logout}>
  Logout
</button>
  );
}
