import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginV2 from './pages/user/Login/LoginV2';
import { message } from 'antd';
import { login, register, logout, tokenLogin as tokenLoginAPI, profile, inactive } from '@services/api.service';
import ConfirmComponent from '@components/ConfirmComponent';
import TitleComponent from '@components/TitleComponent';

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isTokenLogin, setIsTokenLogin] = useState(false);

  const removeUserinfo = () => {
    setUser(null);
    localStorage.removeItem('userinfo');
  }

  const handleAction = async (action, id, params) => {
    try {
      let result = null;
      if (action === 'login') {
        result = await login(params);
        setUser(result.data);
        localStorage.setItem('userinfo', JSON.stringify(result.data));
        navigate('/');
      } else if (action === 'token') {
        result = await tokenLoginAPI(params);
        console.log(result);
        if (result) {
          setUser(result.data);
        } else {
          removeUserinfo();
        }
      } else if (action === 'register') {
        result = await register(params);
      } else if (action === 'logout') {
        result = await logout(params);
        removeUserinfo();
        navigate('/');
      } else if (action === 'profile') {
        result = await profile(id, params);
      } else if (action === 'inactive') {
        result = await inactive(id, params);
        message.success('Inactive account success');
        removeUserinfo();
        navigate('/');
      }
      // console.log('handleAction', result);
      return true;
    } catch (error) {
      const text = `handle action is error: ${error?.data?.message || 'please try again'}`;
      console.log(text);
      message.error(text);
      return false;
    }
  }
  

  useEffect(() => {
    async function tokenLogin() {
      const userinfo = localStorage.getItem('userinfo');
      if (userinfo) {
        await handleAction('token', null, JSON.parse(userinfo));
        setIsTokenLogin(true);
      } else {
        setIsTokenLogin(true);
      }
    }
    tokenLogin();
  }, []);




  /*const handleLogout = () => {
    ConfirmComponent(async () => {
      await handleAction('logout', user?._id, user)
    }, 'Are you sure logout?', 'Logout Confirm')
  }*/
  

  return (
    <>
      <TitleComponent user={user} isTokenLogin={isTokenLogin}/>
      <Routes>
        
        <Route path="/login" element={<LoginV2 handleAction={handleAction} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
