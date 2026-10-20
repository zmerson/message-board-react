import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const AlreadySignedIn = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    return (React.createElement("div", null,
        React.createElement("p", null, "you are already signed in"),
        React.createElement("p", null,
            "click",
            React.createElement(Link, { to: "" }, "here "),
            " to sign out or",
            React.createElement(Link, { to: "" }, "here"),
            " to go back")));
};
