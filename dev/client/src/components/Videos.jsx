//import "./Videos.css";

export default function Videos() {
  const youtubeVideos = [
    "dQw4w9WgXcQ", 
  ];

  return (
    <div className="videos-grid">
      {youtubeVideos.map((id, i) => (
        <iframe
          key={i}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          title={`YouTube video ${i + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ))}
    </div>
  );
}