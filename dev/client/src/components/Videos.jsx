import "./Videos.css";

export default function Videos() {
  const youtubeVideos = [
    "-YNID-Vl4QA",
    "T_m_WC_G8Ts",
    "agtHULh9ioI",
    "n5lPEhDukbg"
  ];

  return (
    <div className="videos-grid">
      {youtubeVideos.map((id, i) => (
        <div key={i} className="video-wrapper">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            title={`YouTube video ${i + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
}