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
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
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

          // Lấy danh sách bài viết đã đánh dấu
          fetchBookmarkedPosts(token);
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


    const fetchBookmarkedPosts = async (token) => {
      try {
        if (token) {
          const response = await axios.get("http://localhost:5000/blog/react", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const bookmarkedPostsData = response.data;
          console.log("Bookmarked Posts:", bookmarkedPostsData)
          setBookmarkedPosts(bookmarkedPostsData);
          console.log(bookmarkedPostsData);
        }
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
      }
    };

    fetchUserData();
  }, []);
  function createMarkup(html) {
    return { __html: html };
  }
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  }


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
              <i className="fa fa-cog"></i> Chỉnh sửa người dùng
            </Link>
          </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active nav-pills1" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Bài Viết Bookmark</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Bài viết của tôi</a>
  </li>
 
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">{bookmarkedPosts && bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post, index) => (
                <div key={index} className="article-preview border-top border-bottom">
                  <div className="artical-meta">
                    <div className="author">
                      <img className="rounded-circle" src={user.avatar} alt="avatar" />
                      <div className="info">
                        <Link to="/profile">{user.username}</Link>
                        <p>{post.createdAt}</p>
                      </div>

                    </div>

                  </div>
                  <Link to={`/blogDetail/${post._id}`} className="titles1">
                    {post.Title}
                  </Link>
                  <div className="article-description" dangerouslySetInnerHTML={createMarkup(truncateText(post.Content, 20))} />
                  <Link to={`/blogDetail/${post._id}`} className="readm">
                    Đọc thêm.
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có bài viết nào có sẵn.</p>
            )}</div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> {userPosts.length > 0 ? (
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
                          Trạng Thái Public: {post.PublicStatus ? "Public" : "Private"}
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
                        Sửa
                      </button>
                      {post.PublicRequest || post.PublicStatus ? (
                        <button className="btn btn-secondary" style={{ display: "none" }}></button>
                      ) : (
                        <button className="btn btn-danger" onClick={() => handleRequestPublic(post._id)}>
                          Yêu cầu Public
                        </button>
                      )}
                    </div>
                  </div>
                  <Link to={`/blogDetail/${post._id}`} className="titles1">
                    {post.Title}
                  </Link>
                  <div className="article-description" dangerouslySetInnerHTML={createMarkup(truncateText(post.Content, 20))} />
                  <Link to={`/blogDetail/${post._id}`} className="readm">
                    Đọc thêm ...
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có bài viết nào có sẵn.</p>
            )}</div>
  
</div>
      </div>
    </div>

  );

}
