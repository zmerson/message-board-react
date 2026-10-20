import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import BoardListItem from './boardListItem';
import { List } from './boardListStyles';
const BoardList = () => {
    const [boards, setBoards] = useState(null);
    useEffect(() => {
        axios.get('/boards').then((response) => {
            setBoards(response.data);
            console.log('boards', response.data);
        }).catch((error) => {
            console.error('Error fetching boards:', error);
            handleApiError(error);
        });
    }, []);
    const handleApiError = (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.log('unauthorized');
            }
            else if (error.response.status === 403) {
                console.log('forbidden');
            }
            else if (error.response.status === 404) {
                console.log('not found');
            }
            else if (error.response.status === 429) {
                console.log('too many requests');
            }
            else if (error.response.status === 500) {
                console.log('server error');
            }
            else if (error.response.status === 503) {
                console.log('service unavailable');
            }
            else if (error.response.status === 504) {
                console.log('gateway timeout');
            }
        }
    };
    if (!boards) {
        return React.createElement("div", null, "Loading..");
    }
    return (React.createElement("div", { className: 'w-full flex flex-col items-center' },
        React.createElement("div", { className: 'bg-slate-950 mt-2 w-fit flex flex-col items-center p-5 rounded' },
            React.createElement("h2", { className: 'text-xl text-slate-200' }, "Message Boards"),
            React.createElement(List, { className: 'flex flex-col align-center justify-center' }, boards.map((board) => (React.createElement(BoardListItem, { key: board.id, board: board }))))),
        React.createElement(NavLink, { className: `p-3 drop-shadow-2xl text-center mt-5 rounded border-slate-300 hover:bg-sky-700 text-xl bg-cyan-800 border border-black`, to: '/newBoard' }, "Create your own Board")));
};
export default BoardList;
// {boards?.map((board) => (
//   <Card><li key={board.id}><Link to={`/board/${board.name}`}>{board.name}</Link></li></Card>
// ))}
