import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `News-Fever-->${capitalizeFirstLetter(props.category)}`;

  const updatenews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&pageSize=${props.pageSize}&page=${page}`; 
    setLoading(true);

    let data = await fetch(url);
    let parseData = await data.json();

    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    
  };

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);

  const handlePreviousClick = async () => {
    setPage(page - 1);
    updatenews();
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    updatenews();
  };
  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page + 1);
    setLoading(true);

    try {
      let response = await fetch(url);
      let data = await response.json();

      setArticles(articles.concat(data.articles));
      setTotalResults(data.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop: "80px" }}>
          News-Fever - Top {capitalizeFirstLetter(props.category)} headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          endMessage={<p>No more data to load.</p>}
        >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-info"
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page >= Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-info"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};
export default News;
