import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './BlogPublish.css'

const BlogPublish = () => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [reportedArticles, setReportedArticles] = useState([]);

  useEffect(() => {
    axios.get("https://api.realworld.io/api/articles?published=true").then((response) => {
      setPublishedArticles(response.data.articles);
    });

    axios.get("https://api.realworld.io/api/articles?reported=true").then((response) => {
      setReportedArticles(response.data.articles);
    });
  }, []);


  return (
    <div className="blog-publish">
      <div>
        <h2>Blogs Awaiting Approval</h2>
        <ul>
          {publishedArticles.map((article) => (
            <li key={article.slug}>
              <Link to={`/articleDetail`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Reported Blogs</h2>
        <ul>
          {reportedArticles.map((article) => (
            <li key={article.slug}>
            <Link to={`/reportDetail`}>{article.title}</Link>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPublish;
