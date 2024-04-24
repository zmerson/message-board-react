import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the board id from the URL
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
import Sidebar from '../nav-bar/leftSideBar';
import { CardContainer, CopilotButton, MainContentContainer, PageHeader, buttonTW } from '../../styles/styles';
import BoardInfo from '../nav-bar/rightSideBar';
import PostLink, { Post } from '../post/postlink';
import PostPage from '../post/postPage';
import { Role} from '@prisma/client';
import { BoardData } from '../board-list/boardList';
import { BoardContext } from './boardContext';
// import './styles.tsx';

export interface UserRolez {
  id: number,
  userId: number,
  boardId: number,
  banned?: boolean,
  subscrubed?: boolean
  role?: Role,
  timeoutStart?: Date,
  TimeoutEnd?: Date,
}
const Board: React.FunctionComponent = () => {
  const [ board, setBoard ] = useState<BoardData | null | undefined>(null);
  // const [ board, setBoardContext ] = useContext(BoardContext);
  const { authenticated, user } = useAuth()
  const [userRole, setRole] = useState<UserRolez | null>(null);
  const { name: boardName, id: postId } = useParams();
  const [ userRoleLoading, setUserRoleLoading ] = useState<boolean>(true);
  const location = useLocation();
  const admin: boolean = false;

  useEffect( () => {
    console.log('board use effect')

    const fetchBoard = async () => {
      const response = await axios.get<BoardData>(`/api/board/${boardName}`);
      try {
        // Fetch the board data from the API using the board id
        // console.log('res', response)
        setBoard(response.data);
      } catch (error) {
        console.error('Error fetching board:', error);
      }
      if (response.data){
        // await fetchRole()
        console.log('got board: ' + JSON.stringify(response.data))
      }else {
        console.log("no board", response)
      }
      fetchRole();
      
    };
    
    const fetchRole = async () => {
      if (board  && user) {
      console.log("getting your role")
      const userRoleResponse: UserRolez = await axios.post(`/api/board/${board.name}/userRole`, {userId: user.id, boardId: board.id})
      try {
        console.log(JSON.stringify(userRoleResponse) + "is your role")
        setRole(userRoleResponse)
        // userRoleLoading = false;
      }
      catch (error){
        console.log("error", error)
        // userRoleLoading = false;
      }
      // console.log('board', board)
      // console.log(board)
    }  
    setUserRoleLoading(false);
  }

  fetchBoard();
    console.log('board', board)
    console.log('userRoleloading ?', userRoleLoading)
  }, [boardName]);
  // useEffect(() => {
  //   const fetchRole = async () => {
  //     if (board) {
  //     console.log("getting your role")
  //     const userRoleResponse: UserRolez = await axios.post(`/api/board/${board!.name}/userRole`, {userId: user!.id})
  //     try {
  //       console.log(JSON.stringify(userRoleResponse) + "is your role")
  //       setRole(userRoleResponse) //(userRoleResponse as UserRolez).banned = true && setRole(userRoleResponse)}
  //       userRoleLoading = false;
  //     }
  //     catch (error){
  //       console.log("error", error)
  //     }
  //     // console.log('board', board)
  //     // console.log(board)
  //   }
  // }
  // fetchRole();
  // }, [board, userRole])
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate(`/board/${boardName}/newpost`);
  };
  if (!board) {
    return <div>Loading..</div>;
  }
  //console.log("board was" + JSON.stringify(board))
  return (
    <BoardContext.Provider value={board}>
    <div className=''>
    <Routes>
      <Route path="/" element={
        <MainContentContainer>
          <BoardInfo board={board}></BoardInfo>
          <h1  className='text-5xl mb-5 mt-2 underline text-bold' >{board.name}</h1>
        { userRoleLoading ? <div>{userRole?.banned}loading</div> : 
        user ? userRole?.banned ? <div className='bg-sky-500 border text-center'> You are banned</div> : <button className={buttonTW} onClick={handleCreatePost}>Create Post</button> :               
        <div className='bg-sky-200 m-2 p-1 text-sm'>
        <NavLink className='text-md text-blue-800 mb-2' to='/auth'>Sign in
        </NavLink> or <NavLink  className='text-md text-blue-800' to='/create-account'>Sign up
        </NavLink> to make a post
        </div> }
        <ul>
          <CardContainer>
        { board.posts.length > 0 ? (
            board.posts.map((post) => <PostLink key={post.id} post={post} board={board}/>)
          ) : (
            <div className='flex flex-col items-center bg-sky-500 pb-2'>
              no posts<br></br>
            </div>
          )}</CardContainer>
        </ul>
        <Outlet />
      </MainContentContainer>

      }/>
      <Route path="post/:id" element={<PostPage/>} />
    </Routes>
    </div>
    </BoardContext.Provider>
  );
};

export default Board;
