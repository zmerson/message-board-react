import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'
import { buttonTW } from '../../styles/styles';
import Container from '../templates/container';

interface RegisterFormData {
    email: string;
    name: string;
    password: string;
  }

const CreateAccount: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        name: '',
        password: '',
      });
    // const { authenticated, signIn } = useAuth()

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          const response = await axios.post('/create-account', formData);
          console.log(response.data); // User data from the server (e.g., user ID, name, etc.)
         } catch (error: any) {
          console.log('Error creating user:', error.response.data);
        }
        navigate('/auth')
    }
      return (
        <div className='flex flex-col mt-10 items-center align-center jusutify-center'>
        <Container>
          <form onSubmit={handleSubmit} className='min-fit'>
          {/* <form  className='items-center w-2/5 bg-sky-400 gap-1 flex flex-col m-5 p-2 rounded-lg align-center justify-center' onSubmit={handleSubmit}> */}
              <h2 className='text-2xl mb-2
              '>Create a New Account</h2>
            <div>
              <label>Email</label>
              <input className='w-full bg-zinc-200 text-slate-950 rounded' placeholder="Email" type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <label>Username</label>
              <input className='w-full bg-zinc-300 text-slate-950 rounded'  w-max-100 placeholder="Username" type="text" name="name" onChange={handleChange} />
            </div>
            <div>
              <label>Password</label>
              <input className='w-full bg-zinc-500 text-slate-950 rounded' placeholder="Password" type="password" name="password" onChange={handleChange} />
            </div>
            <button  className={buttonTW + " mt-5"} type="submit">Register</button>
          </form>
        </Container>
        </div>
      );
    };

export default CreateAccount;
