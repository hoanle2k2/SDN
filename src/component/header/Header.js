import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfileList, setShowProfileList] = useState(false);
  const [userRole, setUserRole] = useState('');
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserRole = localStorage.getItem('Role');

    if (storedToken) {
      setLoggedIn(true);
      setUserRole(storedUserRole);
    }
    else {
      setLoggedIn(false);
      setUserRole('');
    }
  }, []);

  const toggleProfileList = () => {
    setShowProfileList(!showProfileList);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('Role');
    localStorage.removeItem('name');

    setUserRole('');
    setLoggedIn(false);
  };

  return (
    <header className={`header ${loggedIn ? 'logged-in' : 'guest'}`}>
      <div className="logo">
        <Link to='/'>
          <img className='logo_img' src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="Logo" />
        </Link>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button type="button" className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {!loggedIn && !userRole && (
        <div className="user-actions">
          <Link to="/register">Đăng kí</Link>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}

      {loggedIn && (
        <div className="user-actions">
          {userRole === 'USER' && (
            <div>
              <Link to="/edit">Tạo bài viết</Link>
            </div>
          )}

          {userRole === 'MANAGER' && (
            <div>
              <span>Duyệt bài</span>
            </div>
          )}

          <div className="user-profile">
            <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-fpt-inkythuatso-1-01-01-14-33-35.jpg" alt="Avatar" />
            <span>Xin chào {name.toUpperCase()}</span>
            <FontAwesomeIcon
              icon={faBars}
              className="navbar"
              onClick={toggleProfileList}
            />
          </div>

          {showProfileList && (
            <div className="profile-list">
              {userRole === 'ADMIN' && (
                <div className='narbar-list'>
                  <div>Dashboard</div>
                  <div>Quản lý người dùng</div>
                  <div>Danh sách các đề tài</div>
                  <div>Danh sách bài viết</div>
                </div>
              )}

              {userRole === 'MANAGER' && (
                <div className='narbar-list'>
                  <div>Danh sách các đề tài</div>
                  <div>Danh sách bài viết bị báo cáo</div>
                </div>
              )}

              {userRole === 'USER' && (
                <div className='narbar-list'>
                  <div className='profile'>Trang cá nhân</div>
                  <div onClick={handleLogout}>Đăng xuất</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
