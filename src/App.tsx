// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BoardList, { BoardData } from './components/board-list/boardList';
import NavBar from './components/nav-bar/navBar'
import SignInComponent from './components/sign-in/signIn'
import axios from 'axios';
import Board from './components/board/board'
import Profile from './components/profile/profile'
import { AuthProvider, useAuth, AuthContextProps } from './auth/authContext';
import AuthWrapper from './auth/authWrapper';
import Home from './components/home';
import AdminPage from './admin/adminPage';
import CreateAccount from './components/sign-up/createAccount';
import PostPage from './components/post/postPage';
import CreateBoard from './components/board/createBoard';
import NewPost from './components/post/newPost';
import './App.css';
import './output.css';
import TagList from './components/Tags/TagList';
import { Turnstile } from '@marsidev/react-turnstile';

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'https://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// Set default headers for all requests (e.g., for JWT authentication)
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + YOUR_JWT_TOKEN;

const App: React.FunctionComponent = () => {

  const [checking, setChecking] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {
    let active = true;

    axios
      .get("/access/status")
      .then((response) => {
        if (active) {
          setVerified(response.data.verified === true);
        }
      })
      .catch((error) => {
        console.error("Access status check failed:", error);
        if (active) {
          setError("Unable to contact the server. Please try again.");
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleTurnstileSuccess(token: string) {
    setError("");

    try {
      const response = await axios.post("/access/verify", { token });

      if (response.data.verified !== true) {
        setError("Verification failed. Please try again.");
        return;
      }

      setVerified(true);
    } catch (error: any) {
      console.error(
        "Turnstile verification failed:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.error ||
        "Unable to verify. Please try again."
      );
    }
  }
  if (checking) {
    return <main>Checking access...</main>;
  }

  if (!verified) {
    return (
      <main className="turnstile-gate">
        <h1>Verify you're human</h1>
        <p>Complete the security check to access the site.</p>

        <Turnstile
          siteKey={siteKey}
          onSuccess={handleTurnstileSuccess}
          onError={() => {
            setError("The security check encountered an error. Please retry.");
          }}
          onExpire={() => {
            setError("The verification expired. Please complete it again.");
          }}
        />

        {error && <p role="alert">{error}</p>}
      </main>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <AuthWrapper>
          {(authenticated: boolean) => (
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tag/:name" element={<TagList />} />
                <Route path="/newboard" element={authenticated ? <CreateBoard /> : <Navigate to="/auth" />} />
                  <Route path="/board/" element={<BoardList />} />
                    <Route path="/board/:name" element={<Board />} />
                      
                        <Route path="/board/:name/newpost" element={authenticated ? <NewPost /> : <SignInComponent/>} />
                        <Route path="/board/:name/post/:id" element={<PostPage />} /> 
                <Route path="/profile" element={authenticated ? <Profile /> : <SignInComponent />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/auth" element={authenticated ? <></> : <SignInComponent />} />
                <Route path="/admin" element={authenticated ? <AdminPage /> : <AdminPage />} />
                {/* <Route path="/board/:name/mod" element={authenticated ? <ModTools /> : <ModTools />} /> */ }
                {/* <Route path="/create-account" element={authenticated ? <Home /> : <CreateAccount />} /> */}
                <Route path="/create-account" element={<CreateAccount />} />
              </Routes>
            </>
          )}
        </AuthWrapper>
      </AuthProvider>   
    </Router>
  );
};

export default App;