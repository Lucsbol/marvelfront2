import React, { useEffect } from "react";
import videomarvel from "../assets/images/marvelvideo.webm";

const Home = () => {
  useEffect(() => {
    const videoElement = document.querySelector("video");

    const handleVideoEnded = () => {
      window.location.href = "/Home";
    };

    videoElement.addEventListener("ended", handleVideoEnded);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="video-container">
        <video
          width="100%"
          height="100%"
          autoPlay
          controls
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <source src={videomarvel} type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Home;
