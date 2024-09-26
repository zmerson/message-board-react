import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from './postlink';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { UserRolez } from '../board/board';
import { BoardData } from '../board-list/boardList';
import { BoardContext } from '../board/boardContext';


interface PostComment {
  id: number;
  comment: string;
  userId: number;
  postId: number;
  doots?: number;
  userName?: string;
}


const PostPage: React.FunctionComponent = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const { authenticated, user } = useAuth()
  const [ userRole, setRole ] = useState<UserRolez | null>(null)
  const [ comments, setComments ] = useState<PostComment[] | null>(null)
  const { name: boardName, id } = useParams();
  const board = useContext(BoardContext);
  let commentDootMap = new Map<number, number>();
  const [commentDoots, setCommentDoots] = useState(commentDootMap);

  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  }
  const postTitle = {
    borderBottom: "2px solid black",
    display: "inline-block",
    marginBottom: "10px",
  }
  const commentContainer = {
    marginTop: "20px",
    border: "1px solid #ccc",
    padding: "10px",
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/post/${id}`);
      setPost(response.data);
      console.log('post', response.data)
      try{
        const userRoleResponse: UserRolez = await axios.post(`/board/${boardName}/userRole`, {userId: user!.id})
        setRole(userRoleResponse)
        console.log(JSON.stringify(userRoleResponse) + "is your role")
      }
      catch (error){
        console.log("error", error)
      }
      try{
        const getComments = await axios.get(`/${id}/comments`);
        console.log('comments', getComments.data)
        setComments(getComments.data);
      }
      catch (error){
        console.log("error", error)
      }
    };

    fetchPost();
  }, [id]);
  const getCommentDoots = async (comments: any[]) => {
    const response = await axios.get(`/${id}/cdoots`);
    setPost({...post!, doots: response.data.doots});
  }
  const setCDoots = async (doots: number) => {
    const response = await axios.post(`/${id}/cdoots`, {doots});
    setPost({...post!, doots: response.data.doots});
    alert(response.data)
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (user) {
      try {
        const response = await axios.post(`/${id}/newComment`, {
          comment: comment,
          postId: id,
          userId: user.id,
        });
        window.location.reload(); 
      } catch (error) {
      }
    }
  };
  return (
  <div className='flex flex-col justify-center items-center min-h-screen bg-slate-700'>
    <div className='container mx-auto bg-slate-600 p-6 rounded-lg shadow-md'>
    {post && (
    <>
      <h1 className='postTitle'><span>+</span>{post.title} - 🎺 {post.doots ? post.doots : "0"}</h1>
      <p>{post.content}</p>
      <Link to={`/profile/${post.authorName}`}>Author: {post.authorName}</Link>
      <p>Posted On: {post.createdAt}</p>
      <h2>Comments:</h2>
      {comments?.map((comment, index) => (
        <div key={index} className='commentContainer'>
          
          <span onClick={ async () => {setCDoots(1)}} className='text-lg cursor-pointer bg-sky-600'>+</span><span>🎺{comment.doots ? comment.doots : "0"}</span>
          <p>{comment.comment}</p>
          <p>Posted By: {comment.userName}.</p>
          <Link to={`/profile/${comment.userName}`}>Commented by: {comment.userId}</Link>
        </div>
      ))}
    </>
  )}
    {user && (
      <form className="flex flex-col w-1/3 bg-slate-500 m-2 p-2" onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <textarea className='bg-slate-200' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    )}
    </div>
  </div>
);
};

export default PostPage;