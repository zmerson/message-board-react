
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { CardContainer, MainContentContainer } from '../../styles/styles';
import BoardListItem from './boardListItem';
import { Board, Tag } from '@prisma/client';
import { Post } from '../post/postlink';
import { List } from './boardListStyles';
import Container from '../templates/container';

export interface BoardData {
  id: number;
  name: string;
  posts: Post[];
  tags?: Tag[]
  & Board;
}
interface BoardWrapperProps {
  children: (board: BoardData) => React.ReactNode;
}

const BoardList: React.FunctionComponent = () => {
  const [boards, setBoards] = useState<BoardData[] | null>(null);
  
  useEffect(() => {

    axios.get('/api/boards').then((response) => {
      setBoards(response.data);
      console.log('boards', response.data);
    }).catch((error) => {
      console.error('Error fetching boards:', error);
      handleApiError(error);
    });
  }, []);

  const handleApiError = (error: any) => {
    if (error.response.status === 401) {
      console.log('unauthorized');
    } else if (error.response.status === 403) {
      console.log('forbidden');
    } else if (error.response.status === 404) {
      console.log('not found');
    } else if (error.response.status === 429) {
      console.log('too many requests');
    } else if (error.response.status === 500) {
      console.log('server error');
    } else if (error.response.status === 503) {
      console.log('service unavailable');
    } else if (error.response.status === 504) {
      console.log('gateway timeout');
    }
  }
  if (!boards){
    return <div>Loading..</div>
  }
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='bg-slate-950 mt-2 w-fit flex flex-col items-center p-5 rounded'>
        <h2 className='text-xl text-slate-200'>Message Boards</h2>
        <List className='flex flex-col align-center justify-center'>
          {boards.map((board) => (          
            <BoardListItem key={board.id} board={board}/>
          ))
          }
        </List>
      </div>
      <NavLink className={`p-3 drop-shadow-2xl text-center mt-5 rounded border-slate-300 hover:bg-sky-700 text-xl bg-cyan-800 border border-black`} 
      to='/newBoard'>Create your own Board</NavLink>
    </div>
  );
};

export default BoardList;

// {boards?.map((board) => (
//   <Card><li key={board.id}><Link to={`/board/${board.name}`}>{board.name}</Link></li></Card>
// ))}