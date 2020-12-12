import React, { useContext } from "react";
import Switch from "react-ios-switch";

import { ConnectionContext } from "./App";

export const ChangeMode = () => {
  const [value, setValue] = useContext(ConnectionContext);
  const updateHandler = (checked) => {
    setValue({
      ...value,
      canWrite: checked,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value.canWrite && <h3 style={{ marginY: "auto" }}>書き込みモード</h3>}
      {!value.canWrite && <h3 style={{ marginY: "auto" }}>読み込みモード</h3>}

      <Switch
        style={{ marginLeft: "10px" }}
        checked={value.canWrite}
        onChange={(checked) => updateHandler(checked)}
      />
    </div>
  );
};

