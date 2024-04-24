import React from 'react';
import { Link } from 'react-router-dom';
import { BoardData } from '../board-list/boardList';
import { PostLinkWrapper, buttonTW } from '../../styles/styles';
import axios from 'axios';

// write an interface for Post
export interface Post {
  id: number;
  boardName: string;
  title: string;
  content: string;
  comments?: Comment[];
  authorName: string;
  boardId: number;
  doots?: number;
  createdAt: string;
}
export interface Comment{
  id: number;
  content: string;
  authorId: number;
  postId: number;
  doots?: number;
}
const PostLink = ({ post, board }: { post: Post, board: BoardData }) => {
  // console.log('post was', post);
  // console.log('boardName was', board)
  const doots = post.doots ? post.doots : 0;
  const shortContent = post.content.length > 20
    ? post.content.substring(0, 20) + '...'
    : post.content;
  return (  
    <PostLinkWrapper>
    
    <Link className={buttonTW} to={`/board/${board.name}/post/${post.id}`}>
      <h2>{post.title} - 🎺 {doots ? doots : '0'}</h2>
    </Link>
      <p>{shortContent}<br/></p>
      <Link  className='border-solid-1 text-sm' to={`/profile/${post.authorName}`}>
        <p>Author: {post.authorName}</p>
      </Link>      
      <p className='text-sm'>Posted {post.createdAt}</p>
    </PostLinkWrapper>
  );
};

export default PostLink;