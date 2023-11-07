import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationList from "../pagination/PaginationList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Homepage.css";
import { vi } from "date-fns/locale";
import { Sort } from "@mui/icons-material";
import env from "../../staticEnvVar";

const HomePage = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(1);
  const [orderBy, setOrderBy] = useState(-1);
  const [userreact, setUserReact] = useState(1);
  const [bloglist, setBlogList] = useState([]);
  const [authorlist, setAuthorList] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [viewType, setViewType] = useState(1);
  const [topic, setTopic] = useState("");
  const [topicname, setTopicName] = useState("");
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userID");
  console.log("userid", userId);
  const limit = env.limit_per_page;

  const handleTopic=(id,name)=>{
    setTopic(id);
    setTopicName(name);
  }

  const handleReact = async (blogid, type) => {
    if (token != null) {
      try {
        // const res = await axios.post(
        //   "/blog/react",
        //   { blogid: blogid, type: type },
        //   {
        //     headers: {
        //       authorization: `token ${token}`,
        //     },
        //   }
        // );
        // setUserReact(userreact * -1);
        // console.log(userreact);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const offset = (currentPage - 1) * limit;

        const apiUrl = `/blog/getall/${search !== "" ? search : "none"}/${limit}/${offset}/${topic !== "" ? topic : "none"
          }/${sortBy}/${orderBy}`;
        const apiAuthorUrl = "/users/topauthorlist";
        const response = await axios.get(apiUrl);
        const response2 = await axios.get(apiAuthorUrl);
        setAuthorList(response2.data.data);
        setBlogList(response.data.data);
        setArticlesCount(response.data.count);
        search = "";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchArticles();
  }, [currentPage, limit, sortBy, topic, orderBy, userreact, search]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(articlesCount / limit);
  const removeTopic = () => {
    setTopic("");
    setTopicName("")
  };

  return (
    <div className="home" >
      {/* <div>
                <p>Quang cao</p>
            </div> */}
      <div className="body d-flex">
        <div className="aricle col-9">
          <div className="d-flex">
            <div className="dropdown">
              <span className="h6 text-secondary ">Sort by: </span>
              <span
                className="dropdown-toggle text-primary h6"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                {sortBy === 1 && "Date"}
                {/* {sortBy === 2 && 'View'} */}
                {sortBy === 2 && "Like"}
                {sortBy === 3 && "Bookmarked"}
              </span>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li onClick={() => setSortBy(1)}>
                  <a className="dropdown-item">Date</a>
                </li>
                {/* <li onClick={() => setSortBy(2)}><a className="dropdown-item" >View</a></li> */}
                <li onClick={() => setSortBy(2)}>
                  <a className="dropdown-item">Like</a>
                </li>
                <li onClick={() => setSortBy(3)}>
                  <a className="dropdown-item">Bookmarked</a>
                </li>
              </ul>
            </div>
            {topicname !== "" && (

              <Link>
                <div className="tag">
                  {topicname}
                  <i onClick={() => removeTopic()} className="bi bi-x-circle-fill text-danger"></i>
                </div>
              </Link>

            )}
          </div>


          <div>
            <div className="d-flex justify-content-end">
              <Link to={`/`} onClick={() => setOrderBy(orderBy * -1)}>
                {" "}
                <i
                  type="button"
                  className={`${orderBy === -1 ? "bi bi-arrow-down" : "bi bi-arrow-up"}`}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Only title"
                ></i>
              </Link>
              <Link to={`/`} onClick={() => setViewType(1)}>
                {" "}
                <i
                  type="button"
                  className={`icon1 bi bi-card-list ${viewType === 2 && "text-black"}`}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Only title"
                ></i>
              </Link>
              <Link to={`/`} onClick={() => setViewType(2)}>
                {" "}
                <i
                  type="button"
                  className={`icon1 bi bi-newspaper ${viewType === 1 && "text-black"}`}
                  data-placement="bottom"
                  title="With preview contents"
                ></i>
              </Link>
            </div>
            {articlesCount === 0 ? (
              <div>
                <p className="h3 text-danger">Ko tìm thấy bài viết phù hợp {search}!</p>
              </div>
            ) : (

              <div className="bloglist">
                {bloglist.map((blog) => (
                  <div className="card mb-2" key={blog._id}>
                    <div className="card-body">
                    <div className="row no-gutters">
                      <div className="col-1">
                        <Link to={`/`}>
                          <img
                            className="author_avatar img-fluid rounded-circle"
                            src={blog.author[0].avatar}
                            alt="avatar"
                          />
                        </Link>
                      </div>
                      <div className="col-11">
                        <div className="d-flex">
                          <p className="text-primary h5 me-3">{blog.author[0].usename}</p>
                          <p className="text-secondary">{formatDate(blog.createdAt)}</p>
                        </div>
                        <Link to={`/blogdetail/${blog._id}`} className="article_title text-dark">
                          <h5 className="card-title">{blog.Title}</h5>
                        </Link>
                        {viewType === 2 && <div className="card-text text-truncate">{blog.Content}</div>}
                        <ul className="tag_list">
                          <Link>
                            <li onClick={() => handleTopic(blog.TopicID,blog.topicname[0].TopicName)} className="tag">
                              {blog.topicname[0].TopicName}
                            </li>
                          </Link>
                        </ul>
                        <div className="d-flex">
                          <i
                            onClick={() => handleReact(blog._id, env.type_of_react.fav)}
                            className="emotion bi bi-bookmark-fill text-dark"
                          >
                            {blog.countbookmark}
                          </i>
                          <i className="emotion bi bi-chat-fill text-secondary">#</i>
                          <i
                            onClick={() => handleReact(blog._id, env.type_of_react.bookmark)}
                            className="emotion bi bi-heart-fill text-danger"
                          >
                            {blog.countfav}
                          </i>
                        </div>
                      </div>
                    </div>
                    </div>
                    
                  </div>
                ))}
                <div className="paging">
                  <PaginationList currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* author section */}

        <div className="author col-3" style={{ marginLeft: '5px', marginTop: '58px' }}>
          <div >
            <p className=" text-primary h5 ">TOP AUTHORS</p>
            {authorlist.map(user => (
              <div className="card rounded-0" key={user._id}>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle" style={{ marginRight: '5px' }} src={user.avatar} alt="avatar" width="50" height="50" />
                    <div>
                      <h5 className="text-danger">{user.username}</h5>
                      <p className="text-secondary mb-0 h7 ">{user.email.slice(0, 20)}{user.email.length > 20 && '...'}</p>
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <div className="emotion2">
                      <i
                        className="bi bi-file-earmark-post"
                        data-toggle="tooltip" data-placement="bottom"
                        title="Total blogs">{user.totalBlogs}</i>
                      
                    </div>
                    <div className="emotion2">
                      <i
                        className="bi bi-bookmark-fill text-primary"
                        data-toggle="tooltip" data-placement="bottom"
                        title="Total bookmarks">{user.totalBookmark}</i>
                      
                    </div>
                    <div >
                      <i
                        className="bi bi-heart-fill text-danger"
                        data-toggle="tooltip" data-placement="bottom"
                        title="Total likes">{user.totalFav}</i>
                      
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
};

export default HomePage;
