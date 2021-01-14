import React, { useState } from "react";
import Switch from "react-ios-switch";

/* テレビ電話コンポーネント */
export const VideoChat = ({ localVideo, remoteVideo }) => {
  const [muted, setmuted] = useState(true);
  return (
    <>
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          marginLeft: "10%",
        }}
      >
        <h3>音声</h3>

        {/* スイッチボタンコンポーネント */}
        <Switch
          style={{ marginLeft: "20px" , marginTop: "auto", marginBottom: "auto"}}
          checked={!muted}
          onChange={(checked) => {
            setmuted(!checked);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* 自分のビデオ画面 */}
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
        {/* 相手のビデオ画面 */}
        <div style={{ width: "40%", textAlign: "center" }}>
          <video
            width="100%"
            autoPlay
            muted={muted}
            playsInline
            style={{ maxWidth: "400px" }}
            ref={remoteVideo}
          ></video>
        </div>
      </div>
    </>
  );
};
