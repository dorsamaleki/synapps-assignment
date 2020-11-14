import React, { useEffect, useState } from "react";
import useScrollInfo from "react-element-scroll-hook";
import { debounce } from "lodash";
import { fakeFetchHelper } from "./fakeFetchHelper";
import styles from "./NewsTitle.module.css";

const PAGE_SIZE = 20;
var getUrl = (page) =>
  `https://newsapi.org/v2/everything?q=bitcoin&from=2020-11-12&sortBy=publishedAt&page=${page}&pageSize=${PAGE_SIZE}&apiKey=969be8c2e9374ffcb2510f892c53bb04`;

export const NewsTitle = (props) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [scrollInfo, setRef] = useScrollInfo();

  const fetchData = debounce(() => {
    if (loading) return;
    if (error) setError(null);
    setLoading(true);
    // fakeFetchHelper()
    fetch(getUrl(page))
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.articles.length < PAGE_SIZE) {
          setHasMore(false);
          return;
        }
        setPage(page + 1);
        setNews([...news, ...data.articles]);
      })
      .catch(() => {
        setLoading(false);
        setError("Data fetch failed");
      });
  }, 400);
  const fetchDataSource = debounce(() => {
    console.log("from fetchDataSource");
    console.log(props.selectedSource);
    if (loading) return;
    if (error) setError(null);
    setLoading(true);
    fetch(
      `http://newsapi.org/v2/everything?source=${props.selectedSource}&q=apple&from=2020-11-13&to=2020-11-13&sortBy=popularity&apiKey=969be8c2e9374ffcb2510f892c53bb04`
    )
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
      });
  }, 400);

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    setError(false);
    fetchDataSource();
    console.log("from useEffect");
    console.log(props.selectedSource);
  }, [props.selectedSource]);

  useEffect(() => {
    if (news.length === 0) {
      fetchData();
    }
  }, [news.length === 0]);

  const fetchMoreData = () => {
    if (!hasMore) return;
    fetchData();
  };

  useEffect(() => {
    if (scrollInfo.y.percentage > 0.8) {
      fetchData();
    }
  }, [scrollInfo.y.percentage]);

  return (
    <div ref={setRef} className={styles.root}>
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
      {loading && <div>Loading</div>}
      {!loading && (
        <button onClick={fetchMoreData} disabled={!hasMore}>
          Load More...
        </button>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
