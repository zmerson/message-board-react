import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
// interface BoardWrapperProps {
//     // useBoard: (board: BoardData) => BoardData;
//     children: (board: BoardData) => React.ReactNode;
//   }
const BoardWrapperContext = createContext(null);
export const BoardWrapper = () => {
    const [board, setBoard] = useState(null);
    const { name } = useParams();
    useEffect(() => {
        axios.get(`/board/${name}`).then((response) => {
            console.log('board', response.data);
            setBoard(response.data);
        });
    }, [name]);
    if (!board) {
        return React.createElement("div", null, "Loading board wrapper");
    }
    return (React.createElement(React.Fragment, null, board ? React.createElement("pre", null, JSON.stringify(board, null, 2)) : React.createElement("div", null, "Loading board...")));
};
// export const useBoard = (): BoardWrapperProps => {
//     const board = useContext(BoardContext);
//     if (!board) throw new Error('useAuth must be used within an AuthProvider');
//     return board;
//   };
