import React, { useState, createContext } from 'react';
import axios from 'axios';
export const BoardsContext = createContext(null);
export const BoardContext = createContext(null);
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
export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([]); // replace with your board type
    // Fetch the board data here and set it using setBoards
    const useBoards = async () => {
        const response = await axios.get('/boards');
        setBoards(response.data);
        return response.data;
    };
    return (React.createElement(BoardsContext.Provider, { value: { boards, useBoards } }, children));
};
