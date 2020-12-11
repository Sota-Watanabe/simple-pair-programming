import React, { useRef, useState } from "react";
import Peer from "skyway-js";
import Editor from "./Editor";
import ChangeMode from "./ChangeMode";

const peer = new Peer({ key: process.env.REACT_APP_SKYWAY_KEY });
const VideoChat = () => {
  const [myId, setMyId] = useState("");
  const [callId, setCallId] = useState("");
  const [dataConnection, setDataConnection] = useState("");
  const [editText, setEditText] = useState("");
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  // 最初だけ
  peer.on("open", () => {
    console.log("open");
    setMyId(peer.id);
    // useEffectを使うべきかもしれない
    if (localVideo.current !== null) {
      console.log("get localStream");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localStream) => {
          localVideo.current.srcObject = localStream;
        });
    }
  });

  /* 接続要求を送信 */
  const makeConnection = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject);
    mediaConnection.on("stream", async (stream) => {
      remoteVideo.current.srcObject = stream;
      await remoteVideo.current.play().catch(console.error);
    });
    const dataConnection = peer.connect(callId);
    setDataConnection(dataConnection); //Connいる?

    dataConnection.on("data", (data) => {
      setEditText(data);
    });
  };

  /* 接続要求を受信時 */
  peer.on("connection", (receiveDataConnection) => {
    /* 初期接続時 */
    setDataConnection(receiveDataConnection);
    /* メッセージ受信 */
    receiveDataConnection.on("data", (data) => {
      setEditText(data);
    });
  });

  /* ビデオ電話要求を受信 */
  peer.on("call", (mediaConnection) => {
    // useEffectを使うべきかもしれない
    if (localVideo.current !== null) {
      mediaConnection.answer(localVideo.current.srcObject);

      mediaConnection.on("stream", async (stream) => {
        remoteVideo.current.srcObject = stream;
      });
    }
  });

  return (
    <div>
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
          <div>{myId}</div>
          <input onChange={(e) => setCallId(e.target.value)}></input>
          <button onClick={makeConnection}>発信</button>
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
      <ChangeMode />
      <Editor text={editText} dataConnection={dataConnection} />
    </div>
  );
};

export default VideoChat;
