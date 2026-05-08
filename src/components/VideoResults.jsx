export default function VideoResults({ videos }) {

  return (

    <div className="videos-grid">

      {videos.map((video, index) => (

        <div className="video-card" key={index}>

          <h3>{video.timestamp}</h3>

          <video controls width="100%">
            <source
              src={video.video_url}
              type="video/mp4"
            />
          </video>

          <a
            href={video.download_url}
            target="_blank"
            rel="noreferrer"
            download
          >
            <button>
              Download Video
            </button>
          </a>

        </div>
      ))}

    </div>
  )
}
