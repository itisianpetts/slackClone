import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spinner from 'react-spinkit';

// Firebase
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/actions';

// Styles & Icons
import styled from 'styled-components';
import logo from '../src/imgs/slacknew.png';

// Components
import { Header, Sidebar, Chat, Login } from './components';

// Component
function App() {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Component State
  const [loading, setLoading] = useState(false);

  // User Auth
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Logged in
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        // Logged Out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <AppLoading>
          <AppLoadingContent>
            <img src={logo} alt="slack-logo" />
            <Spinner
              name="ball-spin-fade-loader"
              color="#3f0f40"
              fadeIn="none"
            />
          </AppLoadingContent>
        </AppLoading>
      ) : (
        <Router>
          {!user ? (
            <Login />
          ) : (
            <>
              <Header />
              <StyledBody>
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Chat />} />
                </Routes>
              </StyledBody>
            </>
          )}
        </Router>
      )}
    </div>
  );
}

export default App;

const StyledBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
