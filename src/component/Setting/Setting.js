import React, { useState, useEffect } from 'react';
import './setting.css';
import { useDispatch } from 'react-redux';
// import { logout } from './redux/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [user, setUser] = useState({
  //   username: '',
  //   email: '',
  //   bio: '',
  //   profilePicture: 'https://api.realworld.io/images/smiley-cyrus.jpeg'
  // });

  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (token) {
  //     axios.get('https://api.realworld.io/api/user', {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //       .then(response => {
  //         const userData = response.data.user;
  //         setUser({
  //           username: userData.username,
  //           email: userData.email,
  //           bio: userData.bio,
  //           profilePicture: userData.image // Update the property name to 'image'
  //         });
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user data:', error);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/')
  //   }
  // }, [token, navigate])

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   dispatch(logout());
  //   navigate('/');
  // };

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = async event => {
  //   event.preventDefault();

  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       return;
  //     }

  //     const response = await axios.put(
  //       'https://api.realworld.io/api/user',
  //       {
  //         user: {
  //           username: user.username,
  //           email: user.email,
  //           bio: user.bio,
  //           image: user.profilePicture // Update the property name to 'image'
  //         }
  //       },
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const userData = response.data.user;
  //       setUser({
  //         username: userData.username,
  //         email: userData.email,
  //         bio: userData.bio,
  //         profilePicture: userData.image
  //       });

  //       alert('User information updated successfully.');
  //       navigate('/profile', { state: { updatedProfilePicture: user.profilePicture } });
  //     } else {
  //       // Handle other response statuses if needed
  //     }
  //   } catch (error) {
  //     console.error('Error updating user data:', error);
  //   }
  // };


  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <form >
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    name='profilePicture'
               
           
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    name='username'
             
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                    name='bio'
             
                  
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email'
                    name='email'
                 
                  
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='New Password'
                    id='passw'
                  />
                </fieldset>
                <button
                  className='btnSt'
                  type='submit'
                >
                  Update Settings
                </button>
                <hr />
                <button className='btnLogout' >
                  Or click here to logout.
                </button>
              </fieldset>


            </form>

          </div>
        </div>
      </div>
    </div>
  );

};

export default Setting;
