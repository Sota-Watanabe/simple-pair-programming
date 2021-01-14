import React, { createContext, useState } from "react";
import { Connection } from "./Connection";

export const ConnectionContext = createContext();

const App = () => {
  const [value, setValue] = useState({
    canWrite: false,
  });

  return (
    // React Contextを利用するため、追加
    <ConnectionContext.Provider value={[value, setValue]}>
      <h1 style={{ textAlign: "center", padding: "50px" }}>
        Simple Pair Programming
      </h1>
      {/* Connectionコンポーネント読み込み */}
      <Connection />
    </ConnectionContext.Provider>
  );
};

export default App;
