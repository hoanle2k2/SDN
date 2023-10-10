import React, { useState } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const GuestHeader = () => {
  const [loggedIn, setLoggedIn] = useState(true); 

  return (
    <header className="guest-header">
      <div className="logo">
        <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="Logo" />
      </div>
      
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button type="button" className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      
      {loggedIn ? ( 
        <div className="user-actions">
          <div className="user-profile">
            <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-fpt-inkythuatso-1-01-01-14-33-35.jpg" alt="Avatar" /> 
            <span>Tên tài khoản</span> 
          </div>
        </div>
      ) : (
        <div className="user-actions">
          <a href="/dang-nhap">Đăng nhập</a>
          <a href="/dang-ky">Đăng ký</a>
        </div>
      )}
    </header>
  );
}

export default GuestHeader;
