import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
const CreateBoard = () => {
    const navigate = useNavigate();
    const { authenticated, user } = useAuth();
    const [boardName, setBoardName] = useState('');
    const handleChange = (event) => {
        setBoardName(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!authenticated || !user) {
                navigate('/auth');
                return;
            }
            const response = await axios.post('/newboard', { name: boardName, userId: user.id });
            const newBoardName = response.data.name;
            console.log("here");
            if (newBoardName) {
                const userRole = await axios.post('/newboard/set-owner', { boardId: response.data.id, userId: user.id });
                navigate(`/board/${newBoardName}`);
            }
        }
        catch (error) {
            console.error('Error creating board:', error);
        }
    };
    return (React.createElement("div", { className: 'w-4/5 justify-center text-center align-center bg-blue-400 flex flex-col m-5 border-solid border-2 border-beige-600' },
        React.createElement("h2", null, "Create a New Board"),
        React.createElement("form", { className: 'flex flex-col items-center align-center justify-center', onSubmit: handleSubmit },
            React.createElement("input", { className: 'w-2/5 text-center', type: "text", id: "boardName", value: boardName, onChange: handleChange, placeholder: 'Name your board', required: true }),
            React.createElement("button", { className: 'border-solid border-2 border-blue-500 text-xl bg-sky-500 p-2 m-2 hover:bg-sky-700 ', type: "submit" }, "Create"))));
};
export default CreateBoard;
