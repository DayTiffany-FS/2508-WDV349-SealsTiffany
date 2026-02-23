import { images } from "../data/images";
import "./Pictures.css";

export default function Pictures() {
  if (!images.length) return <p>No images found.</p>;

  return (
    <div className="pictures-grid">
      {images.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`Photo ${i + 1}`}
          loading="lazy" 
        />
      ))}
    </div>
  );
}