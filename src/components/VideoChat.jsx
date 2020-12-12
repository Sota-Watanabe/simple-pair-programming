import React from "react";

export const VideoChat = ({localVideo, remoteVideo}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <div style={{ width: "40%" }}>
        <video
          width="100%"
          autoPlay
          muted
          playsInline
          style={{ maxWidth: "400px" }}
          ref={localVideo}
        ></video>
      </div>
      <div style={{ width: "40%", textAlign: "center" }}>
        <video
          width="100%"
          autoPlay
          muted
          playsInline
          style={{ maxWidth: "400px" }}
          ref={remoteVideo}
        ></video>
      </div>
    </div>
  );
};
