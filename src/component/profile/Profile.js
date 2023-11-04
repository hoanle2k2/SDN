import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (token) {
          const response = await axios.get("http://localhost:5000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data.data;
          console.log("userdata", userData);
          setUser({
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar,
          });

          // Lấy danh sách bài viết của người dùng sau khi lấy thông tin người dùng thành công
          fetchUserPosts(token);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserPosts = async (token) => {
      try {
        if (token) {
          const response = await axios.get("http://localhost:5000/blog/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userPostsData = response.data.userBlogs;
          setUserPosts(userPostsData);
          console.log(userPostsData);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRequestPublic = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const postToRequest = userPosts.find((post) => post._id === postId);

        if (postToRequest && !postToRequest.PublicRequest) {
          const postIds = [postId];

          const updateResponse = await axios.put(
            "http://localhost:5000/blog/requested",
            { postIds },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Cập nhật dữ liệu trên phía máy khách sau khi yêu cầu "Public"
          const updatedUserPosts = userPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                PublicRequest: true,
              };
            }
            return post;
          });

          setUserPosts(updatedUserPosts);
        }
      }
    } catch (error) {
      console.error("Error requesting public:", error);
    }
  };
  const handleOnClick = (id) => {
    navigate(`/updateBlog/${id}`);
  };

  return (
    <div>
      <div className="profileCt">
        <div className="bgProfile">
          <div className="bgCt">
            <img src={user.avatar} alt="" />
            <h4>{user.username}</h4>
            <Link to="/setting">
              <i className="fa fa-cog"></i> Edit Profile Settings
            </Link>
          </div>
        </div>
        <div className="articles-toggle">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Favorite Post
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                My Post
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div>
                <div className="article-preview border-top border-bottom">
                  <div className="artical-meta"></div>
                </div>
              </div>
              <p>No articles are here... yet.</p>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                  <div key={index} className="article-preview border-top border-bottom">
                    <div className="artical-meta">
                      <div className="author">
                        <img className="rounded-circle" src={user.avatar} alt="avatar" />
                        <div className="info">
                          <Link to="/profile">{user.username}</Link>
                          <p>{post.createdAt}</p>
                        </div>
                        <div className="publicStatus">
                          <p className={post.PublicStatus ? "true-text" : "false-text"}>
                            Public Status: {post.PublicStatus ? "Public" : "Private"}
                          </p>
                        </div>
                      </div>
                      <div className="actions">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleOnClick(post._id);
                          }}
                        >
                          Edit
                        </button>
                        {post.PublicRequest || post.PublicStatus ? (
                          <button className="btn btn-secondary" style={{ display: "none" }}></button>
                        ) : (
                          <button className="btn btn-danger" onClick={() => handleRequestPublic(post._id)}>
                            Request Public
                          </button>
                        )}
                      </div>
                    </div>
                    <Link to={`/blogDetail/${post._id}`} className="titles1">
                      {post.Title}
                    </Link>
                    <Link to={`/blogDetail/${post._id}`} className="article-description">
                      {post.Content}
                    </Link>
                    <Link to={`/blogDetail/${post._id}`} className="readm">
                      Read more...
                    </Link>
                  </div>
                ))
              ) : (
                <p>No posts available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
