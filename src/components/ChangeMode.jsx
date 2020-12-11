import React, { useState } from "react";
import Switch from "react-ios-switch";

const App = () => {
  const [canWrite, setCanWrite] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {canWrite && <h3 style={{ marginY: "auto" }}>書き込みモード</h3>}
      {!canWrite && <h3 style={{ marginY: "auto" }}>読み込みモード</h3>}

      <Switch
        style={{ marginLeft: "10px" }}
        checked={canWrite}
        onChange={(checked) => setCanWrite(checked)}
      />
    </div>
  );
};

export default App;
