import React, { useState } from "react";
import "./PublishDetail.css";

export default function BlogReport() {
    const [showOptions, setShowOptions] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);

    // Hàm để hiển thị menu tùy chọn khi nhấp vào biểu tượng ba chấm
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    // Hàm để hiển thị input trả lời khi nhấn vào "Trả lời"
    const toggleReplyInput = () => {
        setShowReplyInput(!showReplyInput);
    };

    return (
        <div className="container-fluid">
            <div className="blog-detail row">
                <div className="author-info col-6 d-flex align-items-center">
                    {/* Phần avatar và tên tác giả */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="Author Avatar"
                        className="avatar"
                    />
                    <div className="author-name ml-3">
                        <p>UserName</p>
                        <span> <i className="fa fa-user-plus"></i> 1000</span>
                    </div>
                </div>
                <div className="blog-meta col-6 ">
                    {/* Phần thông tin bài viết */}
                    <p>Đã đăng vào Tháng 4 21, 6:09 CH 11 phút đọc</p>
                    <div className="blog_view">
                        <p>
                            <i className="fa fa-eye"></i> 1000 lượt xem{" "}
                        </p>
                        <p>
                            <i className="fa fa-comment"></i> 50 bình luận{" "}
                        </p>
                        <p>
                            <i className="fa fa-bookmark"></i> 200 lượt lưu
                        </p>
                    </div>
                </div>
            </div>
            <div className="blog__content">
                <div className="blog-title-container">
                    <h1 className="blog__title">Blog Tittle</h1>
                    <div className="action-buttons">
                        <button className="reject-button">Unpublish</button>
                    </div>
                </div>
                <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro repellat voluptatum eveniet et quod ea consectetur quo magnam architecto magni, sint dolor soluta natus suscipit. Autem et aliquam numquam incidunt ipsum temporibus quisquam similique tempora blanditiis minima debitis, asperiores dolorem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, aliquam ducimus id inventore, commodi exercitationem laborum temporibus doloribus nemo natus a! Voluptatem sint at iste cum. Porro, dignissimos. Natus ab excepturi perferendis, commodi laboriosam autem eum ea, deserunt magnam laudantium atque voluptates debitis aperiam voluptatem exercitationem nihil hic sunt necessitatibus quaerat odio vitae eius! Laudantium tempora consequatur dolorum ducimus facere. </p>
                <div className="blog__action">
                    <i className="fa fa-thumbs-up"></i>
                    <i className="fa fa-thumbs-down"></i>
                    <i className="fa fa-bookmark"></i>
                </div>
            </div>
        </div>
    );
}
