import React, { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'; // You'll need to install the 'jwt-decode' library
import { AuthContext } from './authContext';
const AuthWrapper = ({ children }) => {
    const { authenticated, updateAuthState } = useContext(AuthContext);
    const [auth, setAuthenticated] = useState(authenticated);
    const [loading, setLoading] = useState(true);
    //console.log("init auth " + auth)
    useEffect(() => {
        // Check if the user is authenticated in LocalStorage and update the app state
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = jwtDecode(token);
            // Check if the token has expired
            if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
                setAuthenticated(true);
                const userData = {
                    id: decodedToken.id,
                    username: decodedToken.name,
                    email: decodedToken.email,
                    password: ''
                };
                updateAuthState(true, userData);
                //console.log(JSON.stringify("token.exp: "+ decodedToken.exp))
            }
            else {
                localStorage.removeItem('jwt');
                localStorage.setItem('authenticated', 'false');
                //console.log("removed token")
                setAuthenticated(false);
                updateAuthState(false, null);
            }
        }
        setLoading(false);
    }, []);
    useEffect(() => {
        console.log("Updated auth value: " + auth);
    }, [auth]);
    if (loading) {
        return React.createElement("div", null, "Loading Auth...");
    }
    return React.createElement(React.Fragment, null, children(authenticated));
};
export default AuthWrapper;
