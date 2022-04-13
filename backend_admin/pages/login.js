import React from 'react';
import Login from '../components/login/Login';
import ifLogin from '../utils/ifLogin';



const  loginPage = ()=> {
  
  return (
    <Login/>
  )
}

export default ifLogin(loginPage)
