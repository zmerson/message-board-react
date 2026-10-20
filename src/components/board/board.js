import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the board id from the URL
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
import { CardContainer, MainContentContainer, buttonTW } from '../../styles/styles';
import BoardInfo from '../nav-bar/rightSideBar';
import PostLink from '../post/postlink';
import PostPage from '../post/postPage';
import { BoardContext } from './boardContext';
const Board = () => {
    const [board, setBoard] = useState(null);
    // const [ board, setBoardContext ] = useContext(BoardContext);
    const { authenticated, user } = useAuth();
    const [userRole, setRole] = useState(null);
    const { name: boardName, id: postId } = useParams();
    const [userRoleLoading, setUserRoleLoading] = useState(true);
    const location = useLocation();
    const admin = false;
    useEffect(() => {
        console.log('board use effect');
        const fetchBoard = async () => {
            const response = await axios.get(`/board/${boardName}`);
            try {
                // Fetch the board data from the API using the board id
                // console.log('res', response)
                setBoard(response.data);
            }
            catch (error) {
                console.error('Error fetching board:', error);
            }
            if (response.data) {
                // await fetchRole()
                console.log('got board: ' + JSON.stringify(response.data));
            }
            else {
                console.log("no board", response);
            }
            fetchRole();
        };
        const fetchRole = async () => {
            if (board && user) {
                console.log("getting your role");
                const userRoleResponse = await axios.post(`/board/${board.name}/userRole`, { userId: user.id, boardId: board.id });
                try {
                    console.log(JSON.stringify(userRoleResponse) + "is your role");
                    setRole(userRoleResponse);
                    // userRoleLoading = false;
                }
                catch (error) {
                    console.log("error", error);
                    // userRoleLoading = false;
                }
                // console.log('board', board)
                // console.log(board)
            }
            setUserRoleLoading(false);
        };
        fetchBoard();
        console.log('board', board);
        console.log('userRoleloading ?', userRoleLoading);
    }, [boardName]);
    // useEffect(() => {
    //   const fetchRole = async () => {
    //     if (board) {
    //     console.log("getting your role")
    //     const userRoleResponse: UserRolez = await axios.post(`/board/${board!.name}/userRole`, {userId: user!.id})
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
        return React.createElement("div", null, "Loading..");
    }
    //console.log("board was" + JSON.stringify(board))
    return (React.createElement(BoardContext.Provider, { value: board },
        React.createElement("div", { className: '' },
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(MainContentContainer, null,
                        React.createElement(BoardInfo, { board: board }),
                        React.createElement("h1", { className: 'text-5xl mb-5 mt-2 underline text-bold' }, board.name),
                        userRoleLoading ? React.createElement("div", null,
                            userRole?.banned,
                            "loading") :
                            user ? userRole?.banned ? React.createElement("div", { className: 'bg-sky-500 border text-center' }, " You are banned") : React.createElement("button", { className: buttonTW, onClick: handleCreatePost }, "Create Post") :
                                React.createElement("div", { className: 'bg-sky-200 m-2 p-1 text-sm' },
                                    React.createElement(NavLink, { className: 'text-md text-blue-800 mb-2', to: '/auth' }, "Sign in"),
                                    " or ",
                                    React.createElement(NavLink, { className: 'text-md text-blue-800', to: '/create-account' }, "Sign up"),
                                    " to make a post"),
                        React.createElement("ul", null,
                            React.createElement(CardContainer, null, board.posts.length > 0 ? (board.posts.map((post) => React.createElement(PostLink, { key: post.id, post: post, board: board }))) : (React.createElement("div", { className: 'flex flex-col items-center bg-sky-500 pb-2' },
                                "no posts",
                                React.createElement("br", null))))),
                        React.createElement(Outlet, null)) }),
                React.createElement(Route, { path: "post/:id", element: React.createElement(PostPage, null) })))));
};
export default Board;
