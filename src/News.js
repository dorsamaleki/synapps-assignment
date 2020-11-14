import React from "react";
import styles from "./News.module.css";
export const News = (props) => (
  <div key={props.url} className={styles.news}>
    <div className={styles.left}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.title1}>{props.source.name}</div>
    </div>
    <div className={styles.image}>
      <img src={props.urlToImage} alt={props.index} />
    </div>
  </div>
);
