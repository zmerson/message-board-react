import React, { useState, useContext, createContext, FC, FunctionComponent, ReactNode, useEffect } from 'react';
import { BoardData } from '../board-list/boardList';
import axios from 'axios';

export const BoardsContext = createContext<BoardsContextProps | null>(null)
export const BoardContext = createContext<BoardData | null>(null)

interface BoardsContextProps {
  boards: BoardData[];
  useBoards: () => Promise<void>;
}
interface BoardContextProps {
  board: BoardData | undefined;
}
interface BoardsProviderProps {
    children: ReactNode; 
  }
interface BoardProviderProps {
    children: ReactNode; 
  }
//   export const BoardProvider: FunctionComponent<BoardProviderProps> = ({ children }) => {
//     const [board, setBoard] = useState<BoardData>();

//     // Fetch the board data here and set it using setBoard

//     // const useBoard = async (board: BoardData) => {
//     //     const response = await axios.get(`/board/${board.name}`);
//     //     setBoard(response.data);
//     // }
//     return (
//         <BoardContext.Provider value={{ board  }}>
//             {children}
//         </BoardContext.Provider>
//     );
//   }
export const BoardsProvider: FunctionComponent<BoardsProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<BoardData[]>([]); // replace with your board type

  // Fetch the board data here and set it using setBoards

  const useBoards = async () => {
    const response = await axios.get('/boards');
    setBoards(response.data);
    return response.data;
  }
  return (
    <BoardsContext.Provider value={{ boards, useBoards  }}>
      {children}
    </BoardsContext.Provider>
  );
}