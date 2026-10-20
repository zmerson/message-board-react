import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CopilotButton } from '../../styles/styles';
import { NewPostForm, PostFields } from './newPost.styles';
const NewPost = () => {
    const { name } = useParams();
    // State for the post content and image upload
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = location.pathname;
        const urlArray = url.split('/');
        const boardName = decodeURIComponent(urlArray[urlArray.length - 2]);
        // Process the post data and image here (you can send them to the server, etc.)
        console.log('Content:', content);
        console.log('Image:', image);
        // Reset the form after submission
        setContent('');
        setImage(null);
        const response = await axios.post('/newpost', { title: title, content: content, authorId: 1, boardName: boardName });
        const newPostId = await response.data.id;
        // redirect to the new post
        window.location.href = `/board/${name}/post/${newPostId}`;
        console.log(response);
    };
    return (React.createElement("div", { className: 'flex flex-col align-center' },
        React.createElement("div", { className: "bg-blue-600 w-3/5 text-bold flex flex-column m-2 pl-2 pr-5" },
            React.createElement("h2", { className: "text-5xl" }, "Make a new post on"),
            React.createElement("div", { className: "text-5xl ml-10 p-2 underline font-bold italic" },
                " ",
                name)),
        React.createElement(NewPostForm, { onSubmit: handleSubmit },
            React.createElement("label", { htmlFor: "" }),
            React.createElement(PostFields, { id: "title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Title" }),
            React.createElement(PostFields, { id: "content", value: content, onChange: (e) => setContent(e.target.value), placeholder: "Enter your post content..." }),
            React.createElement("br", null),
            React.createElement(CopilotButton, { className: "text-5xl font-bold  hover:bg-green-400", type: "submit" }, "Submit"))));
};
export default NewPost;
