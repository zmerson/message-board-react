import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'
import { buttonTW } from '../../styles/styles';

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
          const response = await axios.post('/api/create-account', formData);
          console.log(response.data); // User data from the server (e.g., user ID, name, etc.)
         } catch (error: any) {
          console.log('Error creating user:', error.response.data);
        }
        navigate('/auth')
    }
      return (
        <div className='flex flex-col items-center align-center jusutify-center'>
          <form  className='items-center w-2/5 bg-sky-400 gap-1 flex flex-col m-5 p-2 rounded-lg align-center justify-center' onSubmit={handleSubmit}>
              <h2 className='text-2xl mb-2
              '>Create a New Account</h2>
            <div>
              <label></label>
              <input placeholder="Email" type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <label></label>
              <input  placeholder="Username" type="text" name="name" onChange={handleChange} />
            </div>
            <div>
              <label></label>
              <input placeholder="Password" type="password" name="password" onChange={handleChange} />
            </div>
            <button  className={buttonTW} type="submit">Register</button>
          </form>
        </div>
      );
    };

export default CreateAccount;
