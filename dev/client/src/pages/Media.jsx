import { useState } from "react";
import Pictures from "../components/Pictures";
import Videos from "../components/Videos";
//import "./Media.css";

export default function Media() {
  const [tab, setTab] = useState("pictures");

  return (
    <main className="media-page">
      <h1>Media</h1>

      <div className="media-tabs">
        <button
          className={tab === "pictures" ? "active" : ""}
          onClick={() => setTab("pictures")}
        >
          Pictures
        </button>
        <button
          className={tab === "videos" ? "active" : ""}
          onClick={() => setTab("videos")}
        >
          Videos
        </button>
      </div>

      <div className="media-content">
        {tab === "pictures" ? <Pictures /> : <Videos />}
      </div>
    </main>
  );
}