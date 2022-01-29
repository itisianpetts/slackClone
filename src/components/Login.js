import React from 'react';

// Firebase
import { signInWithPopup } from '@firebase/auth';
import { auth, provider } from '../firebase';

// Icons and Styles
import styled from 'styled-components';
import logo from '../imgs/slacknew.png';

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => err.message);
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt="" />
        <h1>Sign in to Slack</h1>
        <p>Slack Clone</p>
        <button onClick={signIn}>Sign in with Google</button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > p {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
    padding: 15px 18px;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
  }
`;
