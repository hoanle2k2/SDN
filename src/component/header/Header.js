import React, { useState } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [showProfileList, setShowProfileList] = useState(false);

  const toggleProfileList = () => {
    setShowProfileList(!showProfileList);
  };

  const userRole = 'manager';

  return (
    <header className={`header ${loggedIn ? 'logged-in' : 'guest'}`}>
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
          {userRole === 'user' && (

            <div>
              <Link to="/edit">
                Tạo bài viết
              </Link>

            </div>

          )}

          {userRole === 'manager' && (
            <div>
              <span>Duyệt bài</span>
            </div>
          )}

          <div className="user-profile">
            <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-fpt-inkythuatso-1-01-01-14-33-35.jpg" alt="Avatar" />
            <span>Tên tài khoản</span>
            <FontAwesomeIcon
              icon={faBars}
              className="navbar"
              onClick={toggleProfileList}
            />
          </div>


          {showProfileList && (
            <div className="profile-list">
              {userRole === 'admin' && (
                <div className='narbar-list'>
                  <div>Dashboard</div>
                  <div>Quản lý người dùng</div>
                  <div>Danh sách các đề tài</div>
                  <div>Danh sách bài viết</div>
                </div>

              )}

              {userRole === 'manager' && (
                <div className='narbar-list'>
                  <div>Danh sách các đề tài</div>
                  <div>Danh sách bài viết bị báo cáo</div>
                </div>
              )}

              {userRole === 'user' && (
                <div className='narbar-list'>
                  <div className='profile'>Trang cá nhân</div>
                  <div onClick={() => console.log('Logout clicked')}>Đăng xuất</div>
                </div>

              )}

            </div>
          )}
        </div>
      ) : (
        <div className="user-actions">
          <Link to="/register">
            Đăng kí
          </Link>
          <Link to="/login">
            Đăng nhập
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
