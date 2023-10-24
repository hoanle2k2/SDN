import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationList from "../pagination/PaginationList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { Await, Link } from "react-router-dom";
import { format } from "date-fns";
import './Homepage.css'
import Header from '../header/Header.js'
import { vi } from "date-fns/locale";
import { Sort } from "@mui/icons-material";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(1);
    const [orderBy, setOrderBy] = useState(-1)


    const [bloglist, setBlogList] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;

    const [viewType, setViewType] = useState(1);

    const [topic, setTopic] = useState("");
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const offset = (currentPage - 1) * limit;

                const apiUrl = `http://localhost:5000/blog/getall/${limit}/${offset}/${topic !== "" ? topic : "none"}/${sortBy}/${orderBy}`;
                const response = await axios.get(apiUrl);
                setBlogList(response.data.data);
                setArticlesCount(response.data.count);

            } catch (error) {
                console.error("Error fetching data:", error);
            }

        };
        fetchArticles();
    }, [currentPage, limit, sortBy, topic, orderBy]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(articlesCount / limit);
    const removeTopic = () => {
        setTopic("")
    }

    return (
        <div className="bg-white body">
            {/* <div>
                <p>Quang cao</p>
            </div> */}

            <div className="content d-flex">
                <div className='aricle col-9'>


                    <div class="dropdown">
                        <span className="h6 text-secondary ">Sort by: </span>
                        <span className="dropdown-toggle text-primary h6" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">

                            {sortBy === 1 && 'Date'}
                            {/* {sortBy === 2 && 'View'} */}
                            {sortBy === 2 && 'Like'}
                            {sortBy === 3 && 'Bookmarked'}
                        </span>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li onClick={() => setSortBy(1)}><a class="dropdown-item" >Date</a></li>
                            {/* <li onClick={() => setSortBy(2)}><a class="dropdown-item" >View</a></li> */}
                            <li onClick={() => setSortBy(2)}><a class="dropdown-item" >Like</a></li>
                            <li onClick={() => setSortBy(3)}><a class="dropdown-item" >Bookmarked</a></li>
                        </ul>
                    </div>
                    {topic !== "" &&
                        <ul className='tag_list'>
                            <Link><li className="tag" >{topic}<i onClick={() => removeTopic()} class="bi bi-x-circle-fill text-danger"></i></li></Link>
                        </ul>
                    }

                    <div >
                        <div className="d-flex justify-content-end">
                            <Link to={`/`} onClick={() => setOrderBy(orderBy * (-1))}> <i type="button" className={`${orderBy === -1 ? 'bi bi-arrow-down' : 'bi bi-arrow-up'}`} data-toggle="tooltip" data-placement="bottom" title="Only title"></i></Link>
                            <Link to={`/`} onClick={() => setViewType(1)}> <i type="button" className={`icon1 bi bi-card-list ${viewType === 2 && 'text-black'}`} data-toggle="tooltip" data-placement="bottom" title="Only title"></i></Link>
                            <Link to={`/`} onClick={() => setViewType(2)}> <i type="button" className={`icon1 bi bi-newspaper ${viewType === 1 && 'text-black'}`} data-placement="bottom" title="With preview contents"></i></Link>
                        </div>

                        {bloglist.map(blog => (

                            <div className='article d-flex' key={blog._id}>

                                <div className="col-1">
                                    <Link to={`/`}><img className="author_avatar img-fluid rounded-circle" src={blog.author[0].avatar} alt="avatar" /></Link>
                                </div>
                                <div className="col-11">
                                    <div className="d-flex ">
                                        <p className="text-danger me-3">{blog.author[0].usename}</p>
                                        <p className="text-secondary">{formatDate(blog.createdAt)}</p>
                                    </div>
                                    <Link to={'/blogdetail'} state={{ blogId: blog._id }} className="article_title text-dark"><h5>{blog.Title}</h5></Link>
                                    {viewType === 2 && <p className='text-truncate'>{blog.Content}</p>}
                                    <ul className='tag_list'>
                                        <Link><li onClick={() => setTopic(blog.TopicID)} className="tag" >{blog.TopicID}</li></Link>
                                    </ul>
                                    {/* <i class="emotion bi bi-eye"> 5</i> */}
                                    <div className="d-flex">
                                        <i class="emotion bi bi-bookmark-fill text-primary" >{blog.countbookmark}</i>
                                        <i class="emotion bi bi-chat-fill text-secondary">#</i>
                                        <i class="emotion bi bi-heart-fill text-danger">{blog.countfav}</i>
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

                {/* author section */}

                {/* <div className="author col-3 ">
                    <div >
                        <p className=" text-primary h5 ">TOP AUTHORS</p>
                        {bloglist.map(article => (
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
                </div> */}
            </div>
        </div >
    );
}

export default HomePage;
