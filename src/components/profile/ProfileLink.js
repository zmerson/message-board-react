import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserName = ({ userId }) => {
    const [userName, setUserName] = useState('');
    const history = useNavigate();
    useEffect(() => {
        axios.get(`/users/${userId}`)
            .then(response => {
            const user = response.data;
            setUserName(user.name);
        })
            .catch(error => {
            console.error(error);
        });
    }, [userId]);
    const handleClick = () => {
        history(`/user/${userId}`);
    };
    return (React.createElement("div", null,
        React.createElement("p", { onClick: handleClick }, userName),
        React.createElement("button", null, "View Profile")));
};
export default UserName;
