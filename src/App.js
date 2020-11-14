import React, { useState } from "react";
import styles from "./App.module.css";
import { defaultSort } from "./constants/constants";
import { NewsSource } from "./App/NewsSource";
import { NewsTitle } from "./App/NewsTitle.js";

export const App = () => {
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
    <div className={styles.root}>
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
};
