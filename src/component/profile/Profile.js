import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Profile() {

    const [user, setUser] = useState({
        username: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
               
                if (token) {
                    const response = await axios.get('http://localhost:5000/users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const userData = response.data.data;
                    console.log("userdata",userData);
                    setUser({
                        username: userData.username,
                        email: userData.email,
                        avatar: userData.avatar,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <div className="profileCt">
                <div className="bgProfile">
                    <div className="bgCt">
                        <img src={user.avatar} alt="" />
                        <h4>{user.username}</h4>
                        <Link to="/Setting">
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
                        <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <div>
                                <div className="article-preview border-top border-bottom">
                                    <div className="artical-meta">
                                        <div className="author">
                                            <img
                                             
                                            />
                                            <div className="info"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>No articles are here... yet.</p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div>
                                <div className="article-preview border-top border-bottom">
                                    <div className="artical-meta">
                                        <div className="author">
                                            <img
                                               
                                            />
                                            <div className="info">
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>No favorite articles yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
