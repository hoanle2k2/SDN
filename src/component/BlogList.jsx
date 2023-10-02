import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationList from "./PaginationList";
import { Link } from "react-router-dom";
import { format } from "date-fns"; 
import './style/BlogList.css'

const BlogList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const offset = (currentPage - 1) * limit;
                const apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`;
    
                const response = await axios.get(apiUrl);
    
                setArticles(response.data.articles);
                setArticlesCount(response.data.articlesCount);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
    
        fetchArticles();
    }, [currentPage, limit]);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    const totalPages = Math.ceil(articlesCount / limit);

    return (
        <div>
            <div className='article'>
                {articles.map(article => (
                    <div className='article-preview border-top border-bottom' key={article.slug}>
                        <div className='artical-meta'>
                            <div className='author'>
                                <img className='rounded-circle' src={article.author.image} alt="avatar" />
                                <div className="info">
                                    <p>{article.author.username}</p>
                                    <p>{formatDate(article.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        <h2>{article.title}</h2>
                        <p className='article-description'>{article.description}</p>
                        <Link to={`/article/${article.slug}`}>Read more...</Link>
                        <ul className='artical-tags'>
                            {article.tagList.map(tagList => (
                                <li key={tagList}>{tagList}</li>
                            ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
            <div>
                <PaginationList
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default BlogList;
