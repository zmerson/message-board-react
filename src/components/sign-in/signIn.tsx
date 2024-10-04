import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'
import Container from '../templates/container';
import { buttonTW } from '../../styles/styles';

const SignInComponent = () => {
  let errorMsg = '';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);
    // const { authenticated, signIn } = useAuth()
    const authContext = useAuth()
    const { state } = useLocation();
    const handleSignIn = async () => {
        try {
        const response = await axios.post('/login', {
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
        handleApiError(error);
      }
  };
  const handleApiError = (error: any) => {
    console.log(error)
    if (error.status === 401) {
      console.log('unauthorized');
      errorMsg = 'Invalid email or password';
    } else if (error.status === 403) {
      console.log('forbidden');
    } else if (error.status === 404) {
      console.log('not found');
    } else if (error.status === 429) {
      console.log('too many requests');
    } else if (error.status === 500) {
      console.log('server error');
    } else if (error.status === 503) {
      console.log('service unavailable');
    } else if (error.status === 504) {
      console.log('gateway timeout');
    }
  };
  return (
    <div className='flex flex-col mt-10 items-center align-center jusutify-center'>
      <Container className='w-1/2'>
        <div>{errorMsg}</div>
      </Container>
      <Container>
          <h2 className='text-3xl m-1 text-center'>Welcome</h2>
          <label>Email</label>
          <input className='w-full bg-zinc-200 text-slate-950 rounded'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input className='w-full bg-zinc-500 text-slate-950 rounded'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={buttonTW + ' mt-5'} onClick={handleSignIn}>Sign In</button>
        <div>Don't have an account?</div>
        <Link className=' w-fit p-2' to={'/create-account'}>Create an Account<span className='text-slate-400'> here</span></Link>
      </Container>
    </div>//should make a tailwind class for buttons
  );
};

export default SignInComponent;
