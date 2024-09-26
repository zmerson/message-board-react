import axios from 'axios';
import React, { ReactNode, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CopilotButton, MainContentContainer, MinorContentContainer } from '../../styles/styles';
import { BoardData } from '../board-list/boardList';
import { Container, NewPostForm, PostContainer, PostFields } from './newPost.styles';

interface BoardPost {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
    boardId: number;
}

const NewPost: React.FunctionComponent = () => {
  const { name } = useParams();

  // State for the post content and image upload
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState('')
    const location = useLocation()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const url = location.pathname
    const urlArray = url.split('/')
    const boardName = decodeURIComponent(urlArray[urlArray.length - 2])
    // Process the post data and image here (you can send them to the server, etc.)
    console.log('Content:', content);
    console.log('Image:', image);

    // Reset the form after submission
    setContent('');
    setImage(null);
    const response = await axios.post<BoardPost>('/newpost', { title: title, content: content, authorId: 1, boardName: boardName});
    const newPostId = await response.data.id;
    // redirect to the new post
    window.location.href = `/board/${name}/post/${newPostId}`
    console.log(response)
    }

  return (
    <div className='flex flex-col align-center'>
      <div className="bg-blue-600 w-3/5 text-bold flex flex-column m-2 pl-2 pr-5">
      <h2 className="text-5xl">Make a new post on</h2>
        <div className="text-5xl ml-10 p-2 underline font-bold italic"> {name}</div>
      </div>
      <NewPostForm onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <PostFields id="title"
          value={title}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}
          placeholder="Title"
        ></PostFields>
        <PostFields id="content"
          value={content}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setContent(e.target.value)}
          placeholder="Enter your post content..."
        ></PostFields>
        {/* <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        /> */}<br></br>
        <CopilotButton className="text-5xl font-bold  hover:bg-green-400" type="submit">Submit</CopilotButton>
      </NewPostForm>
  </div>
  );
};

export default NewPost;
