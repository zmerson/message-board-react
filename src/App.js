// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BoardList from './components/board-list/boardList';
import NavBar from './components/nav-bar/navBar';
import SignInComponent from './components/sign-in/signIn';
import axios from 'axios';
import Board from './components/board/board';
import Profile from './components/profile/profile';
import { AuthProvider } from './auth/authContext';
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
const App = () => {
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
            if (active)
                setChecking(false);
        });
        return () => {
            active = false;
        };
    }, []);
    async function handleTurnstileSuccess(token) {
        setError("");
        try {
            const response = await axios.post("/access/verify", { token });
            if (response.data.verified !== true) {
                setError("Verification failed. Please try again.");
                return;
            }
            setVerified(true);
        }
        catch (error) {
            console.error("Turnstile verification failed:", error.response?.data || error);
            setError(error.response?.data?.error ||
                "Unable to verify. Please try again.");
        }
    }
    if (checking) {
        return React.createElement("main", null, "Checking access...");
    }
    if (!verified) {
        return (React.createElement("main", { className: "turnstile-gate" },
            React.createElement("h1", null, "Verify you're human"),
            React.createElement("p", null, "Complete the security check to access the site."),
            React.createElement(Turnstile, { siteKey: siteKey, onSuccess: handleTurnstileSuccess, onError: () => {
                    setError("The security check encountered an error. Please retry.");
                }, onExpire: () => {
                    setError("The verification expired. Please complete it again.");
                } }),
            error && React.createElement("p", { role: "alert" }, error)));
    }
    return (React.createElement(Router, null,
        React.createElement(AuthProvider, null,
            React.createElement(AuthWrapper, null, (authenticated) => (React.createElement(React.Fragment, null,
                React.createElement(NavBar, null),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/tag/:name", element: React.createElement(TagList, null) }),
                    React.createElement(Route, { path: "/newboard", element: authenticated ? React.createElement(CreateBoard, null) : React.createElement(Navigate, { to: "/auth" }) }),
                    React.createElement(Route, { path: "/board/", element: React.createElement(BoardList, null) }),
                    React.createElement(Route, { path: "/board/:name", element: React.createElement(Board, null) }),
                    React.createElement(Route, { path: "/board/:name/newpost", element: authenticated ? React.createElement(NewPost, null) : React.createElement(SignInComponent, null) }),
                    React.createElement(Route, { path: "/board/:name/post/:id", element: React.createElement(PostPage, null) }),
                    React.createElement(Route, { path: "/profile", element: authenticated ? React.createElement(Profile, null) : React.createElement(SignInComponent, null) }),
                    React.createElement(Route, { path: "/profile/:name", element: React.createElement(Profile, null) }),
                    React.createElement(Route, { path: "/auth", element: authenticated ? React.createElement(React.Fragment, null) : React.createElement(SignInComponent, null) }),
                    React.createElement(Route, { path: "/admin", element: authenticated ? React.createElement(AdminPage, null) : React.createElement(AdminPage, null) }),
                    React.createElement(Route, { path: "/create-account", element: React.createElement(CreateAccount, null) }))))))));
};
export default App;
