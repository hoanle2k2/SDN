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
    const [currentSort, setCurrentSort] = useState(1);
    const [orderBy, setOrderBy] = useState(-1)


    const [articles, setArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;

    const [viewType, setViewType] = useState(1);

    const [tag, setTag] = useState([]);
    const setTablist = (arr) => {
        if (!tag.includes(arr))
            setTag([...tag, arr])
    }
    const [filter, setFilter] = useState(0);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const offset = (currentPage - 1) * limit;
                const apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`;
                const apiUrl2 = `http://localhost:5000/home?filter=${filter}&&sort=${Sort}&&orderBy=${orderBy}`;

                const response = await axios.get(apiUrl);

                setArticles(response.data.articles);
                setArticlesCount(response.data.articlesCount);

            } catch (error) {
                console.error("Error fetching articles:", error);
            }

        };

        fetchArticles();
    }, [currentPage, limit, currentSort, tag]);
    console.log("Done")

    // function sortData(data) {

    //     if(tag.length!=0)
    //     .filter((item) => sortData(item))
    //     console.log(data)
    //     return checker(data.tagList,tag)
    //   }

    //   const checker = (arr, target) => target.every(v => arr.includes(v));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(articlesCount / limit);
    const removeTag = (id) => {
        setTag(tag.filter(item => tag.indexOf(item) !== id))
    }


    return (
        <div className="bg-white body">
            {/* <div>
                <p>Quang cao</p>
            </div> */}

            <div className="bg-white ">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid bg-w">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li onClick={() => setFilter(filter === 1 ? 0 : 1)} className="nav-item">
                                    <a className={`nav-link active ${filter === 1 ? 'text-primary' : 'text-dark'}`} aria-current="page" href="#"><p className="h5">Editors'choice</p></a>
                                </li>
                                <li onClick={() => setFilter(filter === 2 ? 0 : 2)} class="nav-item">
                                    <a className={`nav-link active ${filter === 2 ? 'text-primary' : 'text-dark'}`} href="#"><p className="h5">Followings</p></a>
                                </li>
                                <li onClick={() => setFilter(filter === 3 ? 0 : 3)} class="nav-item">
                                    <a className={`nav-link active ${filter === 3 ? 'text-primary' : 'text-dark'}`} href="#"><p className="h5">Hot</p></a>
                                </li>
                            </ul>
                            <button className="btn  btn-outline-primary " type="submit"><Link className="text-decoration-none" to={`/edit`}>CREATE POST</Link></button>

                        </div>
                    </div>
                </nav>
            </div>


            <div className="content d-flex">
                <div className='aricle col-9'>


                    <div class="dropdown">
                        <span className="h6 text-secondary ">Sort by: </span>
                        <span className="dropdown-toggle text-primary h6" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">

                            {currentSort === 1 && 'Date'}
                            {currentSort === 2 && 'View'}
                            {currentSort === 3 && 'Voted'}
                            {currentSort === 4 && 'Bookmarked'}
                        </span>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li onClick={() => setCurrentSort(1)}><a class="dropdown-item" >Date</a></li>
                            <li onClick={() => setCurrentSort(2)}><a class="dropdown-item" >View</a></li>
                            <li onClick={() => setCurrentSort(3)}><a class="dropdown-item" >Voted</a></li>
                            <li onClick={() => setCurrentSort(4)}><a class="dropdown-item" >Bookmarked</a></li>
                        </ul>
                    </div>
                    <ul className='tag_list'>
                        {tag.map((tagList, index) => (
                            <Link><li className="tag" key={tagList}>{tagList} <i onClick={() => removeTag(index)} class="bi bi-x-circle text-danger"></i></li></Link>

                        ))
                        }
                    </ul>

                    <div >
                        <div className="d-flex justify-content-end">
                            <Link to={`/`} onClick={() => setOrderBy(orderBy * (-1))}> <i type="button" className={`${orderBy === -1 ? 'bi bi-arrow-down' : 'bi bi-arrow-up'}`} data-toggle="tooltip" data-placement="bottom" title="Only title"></i></Link>
                            <Link to={`/`} onClick={() => setViewType(1)}> <i type="button" className={`icon1 bi bi-card-list ${viewType === 2 && 'text-black'}`} data-toggle="tooltip" data-placement="bottom" title="Only title"></i></Link>
                            <Link to={`/`} onClick={() => setViewType(2)}> <i type="button" className={`icon1 bi bi-newspaper ${viewType === 1 && 'text-black'}`} data-placement="bottom" title="With preview contents"></i></Link>
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
                                    <Link to={'/blogdetail'} state={{ blogId: article.slug }} className="article_title text-dark"><h5>{article.title}</h5></Link>
                                    {viewType === 2 && <p className='text-truncate'>{article.description}</p>}
                                    <ul className='tag_list'>
                                        {article.tagList.map(tagList => (
                                            <Link><li onClick={() => setTablist(tagList)} className="tag" key={tagList}>{tagList}</li></Link>
                                        ))
                                        }
                                    </ul>
                                    <div className="d-flex">
                                        <i class="emotion bi bi-eye"> 5</i>
                                        <i class="emotion bi bi-bookmark"> 5</i>
                                        <i class="emotion bi bi-chat"> 5</i>
                                        <i class="emotion bi bi-heart-fill "> {article.favoritesCount}</i>

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
