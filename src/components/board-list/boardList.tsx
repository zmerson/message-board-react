
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { CardContainer, MainContentContainer } from '../../styles/styles';
import BoardListItem from './boardListItem';
import { Board, Tag } from '@prisma/client';
import { Post } from '../post/postlink';
import { List } from './boardListStyles';

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
    });
  }, []);

  if (!boards){
    return <div>Loading..</div>
  }
  return (
    <MainContentContainer>
      <div className='bg-gray-700 p-10'>
        <h2 className='text-xl'>Message Boards</h2>
        <List className='flex flex-col align-center justify-center'>
          {boards.map((board) => (
            <BoardListItem key={board.id} board={board}/>
          ))
          }
        </List>
      </div>
      <NavLink className={`p-3 mt-5 border-slate-300 hover:bg-sky-700 text-xl bg-sky-400`} to='/newBoard'>Create your own Board</NavLink>
    </MainContentContainer>
  );
};

export default BoardList;

// {boards?.map((board) => (
//   <Card><li key={board.id}><Link to={`/board/${board.name}`}>{board.name}</Link></li></Card>
// ))}