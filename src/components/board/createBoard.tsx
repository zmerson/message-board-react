import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContextProps, useAuth } from '../../auth/authContext';

interface Board {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
  };
  posts: string[];
}
interface UserRole {
  userId: number;
  boardId: number;
  role: String;
  subscribed: boolean
}
const CreateBoard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { authenticated, user } = useAuth() as AuthContextProps
  const [boardName, setBoardName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
        if (!authenticated || !user){
            navigate('/auth')
            return;
        }
      const response = await axios.post<Board>('/api/newboard', { name: boardName, userId: user.id });
      const newBoardName = response.data.name;
      console.log("here")
      if (newBoardName){
        const userRole = await axios.post<UserRole>('/api/newboard/set-owner', { boardId: response.data.id, userId: user.id });

      navigate(`/board/${newBoardName}`);
    }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className='w-4/5 justify-center text-center align-center bg-blue-400 flex flex-col m-5 border-solid border-2 border-beige-600'>
      <h2>Create a New Board</h2>
      <form  className='flex flex-col items-center align-center justify-center' onSubmit={handleSubmit}>

        <input className='w-2/5 text-center'
          type="text"
          id="boardName"
          value={boardName}
          onChange={handleChange}
          placeholder='Name your board'
          required
        />
        <button className='border-solid border-2 border-blue-500 text-xl bg-sky-500 p-2 m-2 hover:bg-sky-700 ' type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBoard;