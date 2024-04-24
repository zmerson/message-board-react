import styled from "styled-components";

export const PostContainer = "text-xs text-slate-500 bg-slate-100 p-4 rounded-lg shadow-md w-full max-w-2xl";

export const NewPostForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 50%;
    background-color: #333;

`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 150px 200px 200px;
    align-items: center;
    justify-content: space-between;

    `

export const PostFields = styled.textarea`
    width: 100%;
    height: 100px;
    margin: 10px;
    padding: 10px;
    outline: 1px solid gold;
    border-radius: 5px;
    border: 2px solid;
    border-image-source: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="1000" viewBox="0 0 10 10"><path d="M 5 0 Q 10 5 5 10 Q 0 5 5 0 Z" fill="none" stroke="white"/></svg>');
    border-image-slice: 5;
    border-image-repeat: round;
    background-color: #333; /* Dark background */
    color: #f5f5f5; /* Off-white text */
    ::webkit-input-placeholder,
    ::placeholder {
        color: #f5f5f5;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    scrollbar-color: #888 #333; /* Scrollbar color */
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-bubble-color: white; /* Scrollbar handle color */
    expand: padding-box; /* Scrollbar expands content */
    ::-webkit-scrollbar-track {
        background: #333; /* Dark background */
    }

    ::-webkit-scrollbar-thumb {
        background: #888; /* Lighter scrollbar */
        border-radius: 2px; /* Rounded border */
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Darker when hovering */
    }

    /* Remove scrollbar buttons */
    ::-webkit-scrollbar-button {
        display: none;
    }


    `