/*import React, { useCallback, useRef, useState } from "react";
import { UseNewsSearch } from "./UseNewsSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { news, loading, hasMore, error } = UseNewsSearch(query, pageNumber);
  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setPageNumber(1);
  };

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      {news.map((item, index) => {
        if (item.length === index + 1) {
          return (
            <div ref={lastNewsElementRef} key={item}>
              {item}
            </div>
          );
        } else {
          return <div key={item}>{item}</div>;
        }
      })}
      <div>{loading && "loading..."}</div>
      <div>{error && "erroe..."}</div>
    </div>
  );
}

export default App;
*/

import React, { useState } from "react";
import { UseNewsSearch } from "./UseNewsSearch";

function App() {
  return (
    <div>
      <UseNewsSearch />
    </div>
  );
}

export default App;
