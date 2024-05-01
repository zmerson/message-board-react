

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

            to see the list of Boards
            </p>
            </div>
            <div className="mt-10 text-3xl font-bold">Click on a Board to view the Posts</div>
            <div className='leading-4 mt-10 text-3xl font-bold'><NavLink to={'/create-account'} className={`${buttonTW} block w-fit`}>Create an account </NavLink><p className='leading-8'>to make a new Post or Comment</p></div> 
        </div>
    )
};

export default Home