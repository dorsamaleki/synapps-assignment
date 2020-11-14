import React, { useEffect, useState } from "react";
import useScrollInfo from "react-element-scroll-hook";
import { debounce } from "lodash";
import qs from "query-string";
import { API_KEY, NEWS_FOCUS, PAGE_SIZE } from "./constants";
import styles from "./NewsTitle.module.css";
import { News } from "./News";

var getUrl = (page, sources, language, sortBy) =>
  "https://newsapi.org/v2/everything?" +
  qs.stringify(
    {
      page,
      sortBy,
      q: NEWS_FOCUS,
      sources: sources && sources.length > 0 ? sources.join(",") : null,
      language: language && language !== "all" ? language : null,
      pageSize: PAGE_SIZE,
      apiKey: API_KEY,
    },
    { skipNull: true }
  );

export const NewsTitle = (props) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [scrollInfo, setRef] = useScrollInfo();

  const fetchData = debounce((forceFetch) => {
    if (!forceFetch && loading) return;
    if (error) setError(null);
    setLoading(true);
    const selectedPage = forceFetch ? 1 : page;
    fetch(
      getUrl(
        selectedPage,
        props.selectedSources,
        props.selectedLanguage,
        props.selectedSort
      )
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.articles.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setPage(page + 1);
        let newNews = [...news, ...data.articles];
        if (forceFetch) newNews = data.articles;
        setNews(newNews);
      })
      .catch(() => {
        setLoading(false);
        setError("Data fetch failed");
      });
  }, 400);

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    setError(false);
    fetchData(true);
  }, [props.selectedSources, props.selectedLanguage, props.selectedSort]);

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
        return <News {...item} />;
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
