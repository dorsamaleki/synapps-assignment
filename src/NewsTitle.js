import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./NewsTitle.module.css";
export const NewsTitle = () => {
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  var url =
    "http://newsapi.org/v2/everything?" +
    "q=bitcoin&" +
    "from=2020-11-12&" +
    "sortBy=publishedAt&" +
    "apiKey=a2f55d1f83be43af84d529e89a06117a";
  var req = new Request(url);
  useEffect(() => {
    fetch(req)
      .then((response) => response.json())
      .then((data) => setNews(data.articles));
  }, []);
  const fetchMoreData = () => {
    if (news.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setNews(news.concat(Array.from({ length: 20 })));
    }, 500);
  };
  return (
    <div>
      {" "}
      <InfiniteScroll
        dataLength={news.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
      >
        {news.map((item) => {
          return (
            <div key={item.index} className={styles.news}>
              <img
                src={item.urlToImage}
                alt={item.index}
                className={styles.image}
              />
              <div className={styles.title}>{item.title}</div>
              <div className={styles.title1}>{item.source.name}</div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
