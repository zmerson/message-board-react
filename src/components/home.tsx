

import React, { useEffect, useState, FunctionComponent } from 'react';
import { MainContentContainer, bigButtonTW, buttonTW } from '../styles/styles';
import { NavLink } from 'react-router-dom';
const Home = () => {

    return (
        <MainContentContainer>
            <div className="ml-10 text-5xl font-bold text-secondray">Message Board App</div>
            <div className="leading-4 mt-10 text-3xl font-bold">Click <NavLink to='board'  className={`${bigButtonTW}`}>Boards</NavLink> to see the list of Boards</div>
            <div className="mt-10 text-3xl font-bold">Click on a Board to view the Posts</div>
            <div className='leading-4 mt-10 text-3xl font-bold'><NavLink to={'/create-account'} className={bigButtonTW}>Create an account </NavLink>to make a new Post or Comment</div> 
        </MainContentContainer>
    )
};

export default Home