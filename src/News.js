import React from "react";
import styles from "./News.module.css";
export const News = (props) => (
  <a
    key={props.url}
    className={styles.news}
    href={props.url}
    target="_blank"
    rel="noreferrer"
  >
    <div className={styles.left}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.source}>{props.source.name}</div>
    </div>
    <div className={styles.image}>
      <img src={props.urlToImage} alt={props.index} />
    </div>
  </a>
);
