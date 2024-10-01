import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'

const SignInComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);
    // const { authenticated, signIn } = useAuth()
    const authContext = useAuth()
    const { state } = useLocation();
    const handleSignIn = async () => {
        try {
        const response = await axios.post('/api/login', {
            email,
            password,
        });
        const { user, token } = response.data;
        Cookies.set('jwt', token, { expires: 1 });
        localStorage.setItem('jwt', token);
        localStorage.setItem('authenticated', 'true');
        setAuthenticated(true);
        if (authContext){
          authContext.signIn(user)
        }
      if (state){
          console.log("state was " + JSON.stringify(state))
          navigate(state.prev)
      }else {
          navigate('/board')
      }
      } catch (error) {
        console.error('Error signing in:', error);
      }
  };

  return (
    <div className='flex flex-col w-1/4 scroll m-5 bg-slate-600 p-2 '>
        <div  className='flex flex-col m-5 gap-1'> 
      <h2 className='text-3xl m-1 text-center'>Sign In</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={`text-blue-800 bg-sky-400 text-lg`} onClick={handleSignIn}>Sign In</button>
      </div>
      <div>Don't have an account?</div>
      <Link className='bg-sky-400 w-fit p-2' to={'/create-account'}>Create Account</Link>
    </div>//should make a tailwind class for buttons
  );
};

export default SignInComponent;
