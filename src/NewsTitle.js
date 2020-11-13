/*
import { useEffect, useState } from "react";
import axios from "axios";
export const UseNewsSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setNews([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "Get",
      url:
        "http://newsapi.org/v2/everything?" +
        "q=bitcoin&" +
        "from=2020-11-12&" +
        "sortBy=publishedAt&" +
        "apiKey=a2f55d1f83be43af84d529e89a06117a",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setNews((prevNews) => {
          return [
            ...new Set([...prevNews, ...res.data.articles.map((b) => b.title)]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, news, hasMore };
};
*/

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
        {news.map((item) => (
          <div> {item.title}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
