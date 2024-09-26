import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserName = ({ userId } : any ) => {
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
  return (
    <div>
      <p onClick={handleClick} >{userName}</p>
      <button>View Profile</button>
    </div>
  );
};

export default UserName;