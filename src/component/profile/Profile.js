    import React from 'react'
    import "./profile.css"
    import { Link } from 'react-router-dom'

    export default function Profile() {
    return (
        <div>
        <div className='profileCt'>
                <div className='bgProfile'>
                    <div className='bgCt'>
                        <img src={ "https://api.realworld.io/images/smiley-cyrus.jpeg"} alt="" />
                        <h4>username</h4>
                        
                        <Link to="/setting">
                            <i className="fa fa-cog"></i> Edit Profile Settings
                        </Link>
                    
                    </div>
                </div>
                <div className='articles-toggle'>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Favorite Post</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">My Post</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        
                                <div>
                                
                                        <div className='article-preview border-top border-bottom'>
                                            <div className='artical-meta'>
                                                <div className='author'>
                                                    <img className='rounded-circle' src alt="avatar" />
                                                    <div className="info">
                                                        
                                                
                                                    </div>
                                                </div>
                                            
                                            </div>
                                        
                                        
                                        </div>
                                
                                </div>
                            
                                <p>No articles are here... yet.</p>
                            
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        
                                <div>
                                    
                                        <div className='article-preview border-top border-bottom' >
                                            <div className='artical-meta'>
                                                <div className='author'>
                                                    <img className='rounded-circle' src alt="avatar" />
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
    )
    }
