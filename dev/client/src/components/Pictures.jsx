// import "./Pictures.css";

export default function Pictures() {
  // grab all images from src/media/Pictures
  const images = Object.values(
    import.meta.glob('../media/Pictures/*.{png,jpg,jpeg,gif}', { eager: true })
  );

  if (images.length === 0) return <p>No images found.</p>;

  return (
    <div className="pictures-grid">
      {images.map((img, i) => (
        <img key={i} src={img.default} alt={`Off Ramp ${i + 1}`} />
      ))}
    </div>
  );
}