import React, { useState, useEffect } from 'react';
import './setting.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: '',
    
  });

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/users', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data.data;
          setUser({
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar,
         
          });
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        });
    }
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return;
      }

      const response = await axios.put(
        'http://localhost:5000/users',
        {
          user: {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
           
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data.user;
        setUser({
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
         
        });

        alert('Cập nhật thông tin người dùng thành công.');
        navigate('/profile', { state: { updatedAvatar: user.avatar } });
      } else {
        // Xử lý các trạng thái phản hồi khác nếu cần
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
      alert('Không thể cập nhật dữ liệu người dùng. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="avatar"
                    value={user.avatar}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    name="bio"
                   
                    
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    id="passw"
                  />
                </fieldset>
                <button className="btnSt" type="submit">
                  Cập nhật cài đặt
                </button>
                <hr />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
