import React, { useState } from "react";
import "./App.css";
import { defaultSort } from "./constants";
import { NewsSource } from "./NewsSource";
import { NewsTitle } from "./NewsTitle.js";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const [selectedSources, setSelectedSources] = useState([]);

  const onChange = (value) => {
    const foundIndex = selectedSources.find((item) => item === value);
    if (foundIndex) {
      setSelectedSources(selectedSources.filter((item) => item !== value));
    } else {
      setSelectedSources([...selectedSources, value]);
    }
  };
  return (
    <div className="App">
      <NewsSource
        setSelectedLanguage={setSelectedLanguage}
        setSelectedSort={setSelectedSort}
        selectedSort={selectedSort}
        onChange={onChange}
        selectedLanguage={selectedLanguage}
        selectedSources={selectedSources}
      />
      <NewsTitle
        selectedSources={selectedSources}
        selectedLanguage={selectedLanguage}
        selectedSort={selectedSort}
      />
    </div>
  );
}

export default App;
