//import "./Pictures.css";

export default function Pictures() {
  // Dynamically import all images from the folder
  const images = Object.values(
    import.meta.glob("../media/images/*.{png,jpg,jpeg,gif}", { eager: true })
  ).map((module) => module.default);

  return (
    <div className="pictures-grid">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`Off Ramp ${i + 1}`} />
      ))}
    </div>
  );
}