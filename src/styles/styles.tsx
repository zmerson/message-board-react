import React, { useState } from 'react';
import styled from 'styled-components';

export const buttonTW = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
export const bigButtonTW = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-5";
export const inputTW = "border border-gray-300 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:focus:ring-blue-800";
export const bigInputTW = "border border-gray-300 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:focus:ring-blue-800";


export const MainContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    margin-right: 150px;
    min-height: 90vh;
    overflow: hidden;
`
export const MinorContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    max-height: 90vh;
    max-width: 50vw;
    }
`
export const CardContainer = styled.div`
    padding: 20px;
    border: solid 1px grey;
    width: 100%;
    max-width: 75vw;
    border-top: none;
    border-bottom: dashed 1px grey;
    background-color: beige;
    margin-right: 50px;
`
export const PageHeader = styled.h3`
    margin-top: 10px;    
    Font-size: 3.5rem;
    line-height: 3.5rem;
    text-outline: 2px embossed eggplant;
    border: 2px outset gold;   
    border-bottom: solid 0.3px black;
    text-align: center;
    font-weight: bold;
    font-family: 'permanent marker', cursive;
    background-color: rgba(0, 0, 220, 0.4);
`
export const CopilotButton = styled.button`
    background-color: #1b451429;
    border: 10px solid black;
    outline: 2px inset gold;
    color: black;
    height: 50px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border: 1px inset purple;
`
export const PostLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
`
export const SmallButton = styled.button`
    background-color: #f0f0f0;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
`
export const SmallInput = styled.input`
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`
export const PostLinkTitle = styled.h3`
    margin: 0;
    font-size: 1.5rem;
`   
export const PostLinkContent = styled.p`
    margin: 0;
    font-size: 1rem;
`   
export const PostLinkAuthor = styled.p`
    margin: 0;
    font-size: 1rem;
`   
export const Stronk = styled.strong`
    font-size: 1.5rem;
    color: #333;
    outline: 1px solid gold;
`