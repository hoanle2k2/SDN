import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import env from "../../staticEnvVar";
import "./BlogDetail.css";
import { toast } from "react-toastify";

import { io } from "socket.io-client";

export default function BlogDetail() {
  const navigate = useNavigate();
  const { blogid } = useParams();
  const [blogDetailState, setBlogDetailState] = useState();
  const [bookmark, setBookmark] = useState(false);
  const [fav, setFavorite] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [fatherCommentID, setFatherCommentID] = useState("");
  const [commentAnswerTo, setCommentAnswerTo] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentMenuID, setCommentMenuID] = useState("");

  var alertStatus = false;
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("Role");

  const [isLoading, setIsLoading] = useState(true);

  const [showAllowPublicButton, setShowAllowPublicButton] = useState(false);
  const commentRef = useRef();
  const afterDefineMenuOfComment = "menuComment";
  const afterDefineMenuOfDelete = "menuCommentDelete";

  const socket = io("http://localhost:5001/");
  socket.on("response", (message) => {
    const result = JSON.parse(message);
    if (result.status === 500) {
      toast.error(result.message);
      navigate("/");
      return;
    }
    const newComment = result.message;
    console.log(newComment);
    if (blogid !== newComment.blogID) {
      return;
    }
    var commentList = comments;
    if (newComment.fatherComment === "") {
      newComment.fatherComment = [];
      const find = commentList.find((c) => c._id === newComment._id);
      if (!find) {
        commentList.push(newComment);
      }
    } else {
      commentList = commentList.map((c) => {
        if (c._id === newComment.fatherComment) {
          const find = c.fatherComment.find((child) => child._id === newComment._id);
          if (!find) {
            c.fatherComment.push(newComment);
          }
        }
        return c;
      });
    }
    commentList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setComments((pre) => [...commentList]);
    setFatherCommentID("");
    setShowReplyInput(false);
    setCommentAnswerTo("");
  });
  socket.on("delete_response", (message) => {
    const result = JSON.parse(message);
    if (result.status === 500) {
      toast.error(result.message);
      navigate("/");
      return;
    }
    console.log(result);
    var commentList = comments;
    console.log(commentList);
    const commentID = result.message;
    console.log(commentID);
    if (result.fatherComment === "") {
      const targetIndex = commentList.findIndex((c) => c._id === commentID);
      if (targetIndex !== -1) {
        commentList.splice(targetIndex, 1);
      }
    } else {
      commentList = commentList.map((c) => {
        if ((c.id = c.fatherComment)) {
          const targetIndex = c.fatherComment.findIndex((c) => c._id === commentID);
          if (targetIndex !== -1) {
            c.fatherComment.splice(targetIndex, 1);
          }
        }
        return c;
      });
    }
    setComments((pre) => [...commentList]);
    setCommentMenuID("");
  });
  useEffect(() => {
    alertStatus = true;
    setShowReplyInput(false);
    setIsLoading(true);
    setCommentMenuID("");
    console.log("blogid", blogid);
    axios
      .get(`/blog/blogDetail/${blogid}`, {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setBlogDetailState(res?.data?.blogDetail);
        console.log(res?.data);
        setFavorite(res?.data?.favOfUser);
        setBookmark(res?.data?.bookMarkOfUser);

        if (role === "CONTENT_MANAGER" && res?.data?.blogDetail?.PublicStatus === false) {
          setShowAllowPublicButton(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (alertStatus) {
          alertStatus = false;
          toast.error("Error: " + err.response.data.message);
        }
        navigate("/");
      });
    axios
      .get(`/blog/blogDetail/${blogid}/comments`, {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((res) => {
        const com = res.data.response.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComments((pre) => com);
        setIsLoading((pre) => false);
      })
      .catch((err) => {
        console.log(err);
        if (alertStatus) {
          alertStatus = false;
          toast.error("Error: " + err.response.data.message);
        }
        navigate("/");
      });
  }, []);
  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }
  const handleAllowPublic = () => {
    const headers = {
      authorization: `token ${token}`,
    };
    axios
      .post(`/contentmanager/publicBlog/${blogid}`, null, {
        headers: headers,
      })
      .then((res) => {
        console.log("Bài viết đã được public thành công.");
        toast.success("Public Successfully!");
        setShowAllowPublicButton(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Lỗi khi public bài viết:", err);
      });
  };

  const reactBlog = (blogid, type, status) => {
    const token = localStorage.getItem(env.token);
    if (!token) {
      toast.error("Please login into system");
      return;
    }
    axios
      .post(
        `/blog/react`,
        {
          blogid,
          type,
        },
        {
          headers: {
            authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("React for blog with type " + type);
        toast.success(res.data.message);
        if (type === env.type_of_react.fav) {
          setFavorite(status);
        }
        if (type === env.type_of_react.bookmark) {
          setBookmark(status);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi public bài viết:", err);
      });
  };
  const handleCommentInput = (commentFatherID) => {
    const comment = commentRef.current.value;
    commentRef.current.value = "";
    if (!token) {
      toast.error("please login to comment");
      return;
    }
    if (comment === "") {
      toast.error("Comment must greater than 2 characters");
      return;
    }
    if (!commentFatherID) {
      socket.emit(
        "send_message",
        JSON.stringify({ message: comment, token: token, blogid: blogid, commentFatherId: "" })
      );
    } else {
      socket.emit(
        "send_message",
        JSON.stringify({ message: comment, token: token, blogid: blogid, commentFatherId: commentFatherID })
      );
    }
  };
  const showAnwerForm = (commentFatherID, answerCommentID) => {
    if (!token) {
      toast.error("Please login");
    }
    if (showReplyInput) {
      setShowReplyInput(false);
      return;
    }
    if (commentFatherID) {
      setFatherCommentID(commentFatherID);
      var answerTo = comments.find((c) => c._id === answerCommentID);
      if (commentFatherID !== answerCommentID) {
        answerTo = comments.find((c) => c._id === commentFatherID).fatherComment.find((c) => c._id === answerCommentID);
      } else {
        answerTo = comments.find((c) => c._id === answerCommentID);
      }
      setCommentAnswerTo(answerTo);
    } else {
      setFatherCommentID("");
      setShowReplyInput(false);
      setCommentAnswerTo("");
    }
    setShowReplyInput(true);
  };

  const toggleOptions = (menuElementID, userID) => {
    if (!token) {
      toast.error("Please login");
    }
    const userIDLocal = localStorage.getItem("userID");
    var menu = document.getElementById(menuElementID + afterDefineMenuOfComment);
    var deleteButton = document.getElementById(menuElementID + afterDefineMenuOfDelete);
    if (deleteButton === undefined || menu === undefined) {
      return;
    }
    if (userID === userIDLocal) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }
    if (commentMenuID === "") {
      setCommentMenuID(menuElementID);
      menu.style.display = "block";
      return;
    }

    if (menuElementID === commentMenuID) {
      menu.style.display = "none";
      setCommentMenuID("");
    } else {
      // document.getElementById(commentMenuID + afterDefineMenuOfComment).style.display = "none";
      setCommentMenuID(menuElementID);
      menu.style.display = "block";
    }
  };

  // Hàm xử lý khi nhấp vào "Xóa bình luận"
  const deleteComment = (commentID) => {
    console.log(commentID);
    socket.emit("delete_message", JSON.stringify({ token: token, commentID: commentID }));
  };

  // Hàm xử lý khi nhấp vào "Báo cáo"
  const reportComment = () => {
    // Thực hiện logic báo cáo bình luận ở đây
    toast.error("Bình luận đã được báo cáo.");
  };

  return (
    <div className="container-fluid row mb-5">
      <div className="col-1"></div>
      <div className="col-11">
        <div className="blog-infor row mt-3 ">
          <div className="blog_detail">
            <h1 className="blog__title">{blogDetailState?.Title}</h1>
            {showAllowPublicButton && (
              <button className="btn-allow-public" onClick={handleAllowPublic}>
                Allow Public
              </button>
            )}
          </div>
          <div>
            <div className="blog__topic ">{blogDetailState?.topic?.TopicName}</div>
          </div>
          <div className="author-info col-sm-6 d-flex align-items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Author Avatar" className="avatar" />
            <div className="author-name ml-3">
              <p>UserName</p>
              <span>
                <i className="bi bi-pen"></i> {blogDetailState?.userTotalBlog}
              </span>
            </div>
          </div>
          <div className="blog-meta col-sm-6 ">
            <p>Đã đăng vào {blogDetailState?.createdAt}</p>
            <div className="blog_view">
              <p>
                <i className="bi bi-heart-fill"></i> {blogDetailState?.numberOfFav} yêu thích
              </p>
              <p>
                <i className="bi bi-chat-left-text"></i> {blogDetailState?.numberOfComments} bình luận
              </p>
              <p>
                <i className="bi bi-bookmark"></i> {blogDetailState?.numberOfBookmark} lượt lưu
              </p>
            </div>
          </div>
        </div>
        <div className="blog__content row">
          <div className="blogdetail-option col-sm-1">
            {!showAllowPublicButton && (
              <div className="option-column">
                <div className="answerTo"></div>
                <div className="d-flex justify-content-center">
                  {fav ? (
                    <div>
                      <i className="bi-heart-fill" onClick={() => reactBlog(blogid, env.type_of_react.fav, false)}></i>
                    </div>
                  ) : (
                    <div>
                      <i className="bi-heart" onClick={() => reactBlog(blogid, env.type_of_react.fav, true)}></i>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  {bookmark ? (
                    <div>
                      <i
                        className="bi bi-bookmark-fill"
                        onClick={() => reactBlog(blogid, env.type_of_react.bookmark, false)}
                      ></i>{" "}
                    </div>
                  ) : (
                    <div>
                      <i
                        className="bi bi-bookmark"
                        onClick={() => reactBlog(blogid, env.type_of_react.bookmark, true)}
                      ></i>{" "}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <i className="bi bi-flag-fill" onClick={() => reactBlog(blogid, env.type_of_react.report, null)}></i>
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-11">{blogDetailState?.Content}</div>
        </div>
        {!showAllowPublicButton && (
          <div className="blog__comment">
            <div className="avt__author d-flex align-middle">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Author Avatar"
                  className="avatar__comment"
                />
              </div>
              <div className="ms-2">
                <h1>Bình luận</h1>
              </div>
            </div>
            {showReplyInput ? (
              <div>
                <div className="answerToOnReplyForm">
                  <div>Trả lời bình luận:</div>
                  <div className="answerToOnReply">
                    <div className="user_infor d-flex align-items-center">
                      <div>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="User Avatar"
                          className="avatarUser"
                        />
                      </div>

                      <div className="">
                        <div>{commentAnswerTo?.user?.usename}</div>
                        <div>{commentAnswerTo?.createdAt}</div>
                      </div>
                    </div>
                    <div className="commentAction ">
                      <div className="mt-2 col-11 commentContent">{commentAnswerTo.comment}</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    className="mt-1 w-50 pt-1 ps-1 mt-1 mb-2 pb-3 me-3"
                    type="area"
                    ref={commentRef}
                    placeholder="Viết Trả lời"
                  />
                  <div className="btn btn-success" onClick={() => handleCommentInput(fatherCommentID)}>
                    <div>Trả lời</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center mt-2">
                <input
                  className="mt-1 w-50 pt-1 ps-1 mt-1 mb-2 pb-3 me-3"
                  type="area"
                  ref={commentRef}
                  placeholder="Viết bình luận"
                />
                <div className="">
                  <button className="btn btn-success" onClick={() => handleCommentInput(null)}>
                    Bình luận
                  </button>
                </div>
              </div>
            )}

            {comments.length > 0 ? (
              <div className="commentReviewScroll mt-2">
                {comments.map((c) => {
                  return (
                    <div className="commentUser" key={c._id}>
                      <div className="d-flex justify-content-between w-75 ">
                        <div className="user_infor d-flex align-items-center">
                          <div>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              alt="User Avatar"
                              className="avatarUser"
                            />
                          </div>

                          <div className="">
                            <div>{c?.user?.usename}</div>
                            <div>{c.createdAt}</div>
                          </div>
                        </div>
                        <div className="commentAction d-flex">
                          <i className="bi bi-grip-horizontal me-3" onClick={() => toggleOptions(c._id, c.userID)}></i>
                          <div className="commentOptions" id={c._id + afterDefineMenuOfComment}>
                            <div
                              id={c._id + afterDefineMenuOfDelete}
                              className="deleteOption"
                              onClick={() => deleteComment(c._id)}
                            >
                              Xóa bình luận
                            </div>
                            <div onClick={reportComment}>Báo cáo</div>
                          </div>
                        </div>
                      </div>
                      <div className="commentU">
                        <div className="mt-2 col-11 commentContent">{c.comment}</div>
                        <div className="d-flex">
                          <div onClick={() => showAnwerForm(c._id, c._id)}>Trả lời</div>
                        </div>
                        <div className="commentAnswers ps-5">
                          {c.fatherComment.length > 0 ? (
                            <div>
                              {c.fatherComment.map((childC) => {
                                return (
                                  <div>
                                    <div className="d-flex justify-content-between w-75 ">
                                      <div className="user_infor d-flex align-items-center">
                                        <div>
                                          <img
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            alt="User Avatar"
                                            className="avatarUser"
                                          />
                                        </div>

                                        <div className="">
                                          <div>{childC?.user?.usename}</div>
                                          <div>{childC?.createdAt}</div>
                                        </div>
                                      </div>
                                      <div className="commentAction d-flex">
                                        <i
                                          className="bi bi-grip-horizontal me-3"
                                          onClick={() => toggleOptions(childC._id, childC.userID)}
                                        ></i>
                                        <div className="commentOptions" id={childC._id + afterDefineMenuOfComment}>
                                          <div
                                            id={childC._id + afterDefineMenuOfDelete}
                                            className="deleteOption"
                                            onClick={() => deleteComment(childC._id)}
                                          >
                                            Xóa bình luận
                                          </div>
                                          <div onClick={reportComment}>Báo cáo</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-2 col-11 commentContent">{childC.comment}</div>
                                    <div className="d-flex">
                                      <div onClick={() => showAnwerForm(c._id, childC._id)}>Trả lời</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
