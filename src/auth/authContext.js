import React, { useState, useContext, createContext } from 'react';
//https://stackoverflow.com/questions/72163183/how-can-i-redirect-to-previous-page-after-login-in-react-router
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [lastVisitedPage, setLastVisitedPage] = useState(null);
    const signIn = (userData) => {
        setAuthenticated(true);
        console.log('signed in as ' + JSON.stringify(userData));
        setUser(userData);
    };
    const signOut = () => {
        setAuthenticated(false);
        console.log('signed out');
        setUser(null);
    };
    const updateAuthState = (authenticated, user) => {
        setAuthenticated(authenticated);
        setUser(user);
    };
    return (React.createElement(AuthContext.Provider, { value: { user, authenticated, signIn, signOut, updateAuthState, lastVisitedPage } }, children));
};
export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth)
        throw new Error('useAuth must be used within an AuthProvider');
    return auth;
};
