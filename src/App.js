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
  const [selection, setSelection] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div
          onClick={() => {
            setSelection(!selection);
          }}
          className={styles.click}
        >
          {selection ? "hide sort and filters" : "sort and filters"}
        </div>
      </div>
      <NewsSource
        setSelectedLanguage={setSelectedLanguage}
        setSelectedSort={setSelectedSort}
        selectedSort={selectedSort}
        onChange={onChange}
        selectedLanguage={selectedLanguage}
        selectedSources={selectedSources}
        selection={selection}
      />
      <NewsTitle
        selectedSources={selectedSources}
        selectedLanguage={selectedLanguage}
        selectedSort={selectedSort}
        selection={selection}
      />
    </div>
  );
};
