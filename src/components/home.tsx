

import React, { useEffect, useState, FunctionComponent } from 'react';
import { MainContentContainer, bigButtonTW, buttonTW } from '../styles/styles';
import { NavLink } from 'react-router-dom';
const Home = () => {


    return (
        <div className='m-2 p-2'>
            <div className="ml-10 text-5xl font-bold text-secondray">Message Board App</div>
            <div className="mt-10 text-3xl font-bold">Use the nav bar to navigate the site</div>
            <div className="leading-4 mt-10 text-3xl font-bold"><NavLink to='board'  className={`${buttonTW} block w-fit`}>Boards</NavLink> 
            <p>
            to view the list of Boards
            </p>
            </div>
            <div className="mt-10 text-3xl font-bold">Click on a Board to view the Posts</div>
            <div className='leading-4 mt-10 text-3xl font-bold'><NavLink to={'/create-account'} className={`${buttonTW} block w-fit`}>Create an account </NavLink><p className='leading-8'>to make a new Post or Comment</p></div> 
            <footer>
                <div className='text-center text-2xl'><a href='https://react.dev'>React</a> - <a href='https://expressjs.com'>Express</a> - <a href='https://www.prisma.io'>Prisma</a></div>
                <div className='text-center text-2xl'>🚀Serving files via Ubuntu Virtual Private Server🚀</div>
                <div className='text-center text-2xl'>🖥️VPS provided by <a href="https://vultr.com">Vultr</a></div>
                <div className='text-center text-2xl'>☁️Cloud DB Hosted by <a href="https://supabase.com/">Supabase</a></div>
                <div className='text-center text-2xl'>🚇Domain Registed with Godaddy</div>
                <div className='text-center text-2xl'>🔒DNS & Security via Cloudflare</div>
                <div className='text-center text-2xl'>This App is currently under development.</div>
                <div className='text-center text-2xl'>Some features are incomplete. Many will change.</div>
            </footer>
        </div>
    )
};

export default Home