import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationList from "../pagination/PaginationList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { Link } from "react-router-dom";
import { format } from "date-fns";
import './Homepage.css'

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;

    const [tab, setTab] = useState(1);

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
        <div className="bg-white body">
            {/* <div>
                <p>Quang cao</p>
            </div> */}

            <div className="bg-white ">
                <nav class="navbar navbar-expand-lg bg-light">
                    <div class="container-fluid bg-w">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active text-primary" aria-current="page" href="#"><p className="h5">Lastest</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link  text-primary" href="#"><p className="h5">Editors'Choice</p></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link  text-primary" href="#"><p className="h5">Hot</p></a>
                                </li>
                            </ul>
                            <button class="btn  btn-outline-primary " type="submit"><Link className="text-decoration-none" to={`/edit`}>CREATE POST</Link></button>

                        </div>
                    </div>
                </nav>
            </div>


            <div className="content d-flex">
                <div className='aricle col-9'>
                    <div >
                        <div className="d-flex justify-content-end">
                            <Link to={`/`} onClick={() => setTab(1)}> <i type="button" class={`icon1 bi bi-card-list ${tab === 2 && 'text-black'}`} data-toggle="tooltip" data-placement="bottom" title="Only title"></i></Link>
                            <Link to={`/`} onClick={() => setTab(2)}> <i type="button" class={`icon1 bi bi-newspaper ${tab === 1 && 'text-black'}`} data-placement="bottom" title="With preview contents"></i></Link>
                        </div>

                        {articles.map(article => (
                            <div className='article d-flex' key={article.slug}>
                                <div className="col-1">
                                    <img className="author_avatar img-fluid rounded-circle" src={article.author.image} alt="avatar" />
                                </div>
                                <div className="col-11">
                                    <div className="d-flex ">
                                        <p className="text-primary me-3">{article.author.username}</p>
                                        <p className="text-secondary">{formatDate(article.createdAt)}</p>
                                    </div>
                                    <Link to={`/`} className="article_title text-dark"><h5>{article.title}</h5></Link>
                                    {tab === 2 && <p className='text-truncate'>{article.description}</p>}
                                    <ul className='tag_list'>
                                        {article.tagList.map(tagList => (
                                            <Link to={`/`}><li className="tag" key={tagList}>{tagList}</li></Link>
                                        ))
                                        }
                                    </ul>
                                    <div className="d-flex">
                                        <i class="emotion bi bi-eye"> 5</i>
                                        <i class="emotion bi bi-bookmark"> 5</i>
                                        <i class="emotion bi bi-chat"> 5</i>
                                        <i class="emotion bi bi-heart-fill"> 5</i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="paging" >
                        <PaginationList
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <div className="author col-3 ">
                    <div >
                        <p className=" text-primary h5 ">TOP AUTHORS</p>
                        {articles.map(article => (
                            <div className='article-preview border-top border-bottom' key={article.slug}>
                                <div className='artical-meta'>
                                    <div className='author'>
                                        <img className='rounded-circle' src={article.author.image} alt="avatar" />
                                        <div className="info">
                                            <p>{article.author.username}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
