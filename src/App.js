import React, { useState } from "react";
import "./App.css";
import { NewsSource } from "./NewsSource";
import { NewsTitle } from "./NewsTitle.js";

function App() {
  const [selectedSource, setSelectedSource] = useState(null);
  return (
    <div className="App">
      <div className="sources">
        <NewsSource setSelectedSource={setSelectedSource} />
      </div>

      <div className="titles">
        <NewsTitle selectedSource={selectedSource} />
      </div>
    </div>
  );
}

export default App;
