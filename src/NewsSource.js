import React, { useEffect, useState } from "react";
import { uniq } from "lodash";
import styles from "./NewsSource.module.css";
export const NewsSource = (props) => {
  const [sourceList, setSourceList] = useState([]);
  var getUrl = (page) =>
    `http://newsapi.org/v2/sources?&apiKey=969be8c2e9374ffcb2510f892c53bb04`;
  useEffect(() => {
    fetch(getUrl())
      .then((response) => response.json())
      .then((response) => setSourceList(response.sources));
  }, []);

  // fetch sources
  // languages = uniq source.language

  const f = uniq(sourceList.map((item) => item.language));
  return (
    <div>
      ////////
      <div className={styles.f}>{f}</div>
      <label for="sources">News Source</label>
      <select
        onChange={(event) => props.setSelectedSource(event.target.value)}
        name="sources"
      >
        <option value="null">All</option>

        {/* {sources.map()} */}
        {sourceList.map((item, index) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
      {/* {languages.map()} */}
    </div>
  );
};
