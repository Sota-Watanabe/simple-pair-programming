import React, { useRef, useState, useContext } from "react";
import Peer from "skyway-js";
import { Editor } from "./Editor";
import { ChangeMode } from "./ChangeMode";
import { VideoChat } from "./VideoChat";
import { ConnectionContext } from "./App";

const peer = new Peer({ key: process.env.REACT_APP_SKYWAY_KEY });
export const Connection = () => {
  const [value, setValue] = useContext(ConnectionContext);
  const [myId, setMyId] = useState("");
  const [callId, setCallId] = useState("");
  const [dataConnection, setDataConnection] = useState("");
  const [editText, setEditText] = useState("");
  const [ready, setReady] = useState(false);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  // 最初だけ
  peer.on("open", () => {
    setMyId(peer.id);
    if (localVideo.current !== null) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localStream) => {
          localVideo.current.srcObject = localStream;
        });
    }
  });
  const receiveData = (data) => {
    if (data.hasOwnProperty("editText")) {
      setEditText(data.editText);
    }
    // 相手が書き込みモードの場合、自分は読み込みモードに変更する。逆も同様
    setValue({
      ...value,
      canWrite: !data.canWrite,
    });
  };

  /* 接続要求を送信 */
  const makeConnection = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject);
    mediaConnection.on("stream", async (stream) => {
      remoteVideo.current.srcObject = stream;
      await remoteVideo.current.play().catch(console.error);
    });
    setReady(true);
    const dataConnection = peer.connect(callId);
    setDataConnection(dataConnection);

    dataConnection.on("data", (data) => {
      receiveData(data);
    });
  };

  /* 接続要求を受信時 */
  peer.on("connection", (receiveDataConnection) => {
    /* 初期接続時 */
    setDataConnection(receiveDataConnection);
    /* メッセージ受信 */
    receiveDataConnection.on("data", (data) => {
      receiveData(data);
    });
    setReady(true);
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
      {!ready && (
        <div style={{marginLeft: "10%"}}>
          <div>{myId}</div>
          <input onChange={(e) => setCallId(e.target.value)}></input>
          <button onClick={makeConnection}>発信</button>
        </div>
      )}

      <VideoChat localVideo={localVideo} remoteVideo={remoteVideo} />
      {ready && (
        <>
          <ChangeMode dataConnection={dataConnection} />
          <Editor
            text={editText}
            setText={setEditText}
            dataConnection={dataConnection}
          />
        </>
      )}
    </div>
  );
};
