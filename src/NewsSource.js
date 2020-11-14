import React, { useEffect, useState } from "react";
import { uniq } from "lodash";
import styles from "./NewsSource.module.css";
export const NewsSource = (props) => {
  const [sourceList, setSourceList] = useState([]);

  var getUrl = (page) =>
    `http://newsapi.org/v2/sources?&apiKey=07bd893c0bd947fbba9a7ec91ce34cf6`;
  useEffect(() => {
    fetch(getUrl())
      .then((response) => response.json())
      .then((response) => setSourceList(response.sources));
  }, []);

  // fetch sources
  // languages = uniq source.language
  console.log(typeof sourceList);
  console.log(sourceList);
  const languagesList = uniq(
    sourceList.reduce((result, item) => {
      return result.concat(item.language);
    }, [])
  );

  return (
    <div>
      <div>{languagesList}</div>
      <label for="sources">News Source</label>
      <select
        onChange={(event) => props.setSelectedSource(event.target.value)}
        name="sources"
      >
        <option value="null">All</option>

        {/* {sources.map()} */}
        {sourceList.map((item, index) => (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        ))}
      </select>
      {/* {languages.map()} */}
    </div>
  );
};
