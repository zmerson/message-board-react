import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardData } from "../board-list/boardList";
import axios from "axios";
import React from "react";
import { BoardContext } from "./boardContext";
// interface BoardWrapperProps {
//     // useBoard: (board: BoardData) => BoardData;
//     children: (board: BoardData) => React.ReactNode;
//   }
const BoardWrapperContext = createContext<BoardData | null>(null);

export const BoardWrapper: React.FunctionComponent = () => {
    const [board, setBoard] = useState<BoardData | null>(null);
    const { name } = useParams();
    useEffect(() => {
        axios.get(`/api/board/${name}`).then((response) => {
        console.log('board', response.data);
        setBoard(response.data);
        });
    }, [name]);
    if (!board){
        return <div>Loading board wrapper</div>
    }
    return (
        <>
        board ? {board} : <div>Loading board...</div>
        </>
    );
    }
    // export const useBoard = (): BoardWrapperProps => {
    //     const board = useContext(BoardContext);
    //     if (!board) throw new Error('useAuth must be used within an AuthProvider');
    //     return board;
    //   };