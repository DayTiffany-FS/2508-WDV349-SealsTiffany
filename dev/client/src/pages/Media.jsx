import { useState } from "react";
import Pictures from "../components/Pictures";
import Videos from "../components/Videos";
import "../styles/Media.css";
import { Helmet } from "react-helmet";

export default function Media() {
  const [tab, setTab] = useState("pictures");

  return (
    <>
      <Helmet>
        <title>Pictures and Videos | Off Ramp</title>
        <meta
          name="description"
          content="Pictures and Videos of Off Ramp at their performances."
        />
      </Helmet>
      
      <main className="media-page">

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
    </>
  );
}