import React, { useEffect, useState } from "react";
import { uniq } from "lodash";
import styles from "./NewsSource.module.css";
import { API_KEY, sortTypes } from "./constants";
import { CheckboxList } from "./CheckboxList";
import Select from "react-select";
var getUrl = (page) => `http://newsapi.org/v2/sources?&apiKey=${API_KEY}`;

export const NewsSource = (props) => {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    fetch(getUrl())
      .then((response) => response.json())
      .then((response) => setSourceList(response.sources));
  }, []);

  const languagesList = [
    "all",
    ...uniq(
      sourceList.reduce((result, item) => {
        return result.concat(item.language);
      }, [])
    ),
  ];

  return (
    <div className={styles.root}>
      <div className={styles.sortlabel}>Sort</div>
      <Select
        options={sortTypes}
        onChange={props.setSelectedSort}
        value={props.selectedSort}
        className={styles.sort}
      />

      <CheckboxList
        items={languagesList.map((language) => ({
          title: language,
          value: language,
        }))}
        onChange={props.setSelectedLanguage}
        value={props.selectedLanguage}
        title="Language"
      />
      <CheckboxList
        items={sourceList.map((source) => ({
          title: source.name,
          value: source.id,
        }))}
        onChange={props.onChange}
        value={props.selectedSources}
        title="Source"
      />
    </div>
  );
};
