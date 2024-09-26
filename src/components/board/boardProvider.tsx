// import React, { useState, useEffect, FunctionComponent, ReactNode } from 'react';
// import { BoardsContext } from './boardContext';
// import { BoardData } from '../board-list/boardList';
// import axios from 'axios';

// // interface BoardsContextProps {
// //     boards: BoardData[]; // replace with your board type
// //     // useBoards: () => Promise<BoardData[] | null>;
// //     useBoards: () => ;
// //   }
// //   interface BoardContextProps {
// //     board: BoardData; // replace with your board type
// //     useBoard: () => BoardData;
// //   }
//   interface BoardsProviderProps {
//       children: ReactNode; 
//     }
// //   interface BoardProviderProps {
// //       children: ReactNode; 
// //     }
//   export const BoardsProvider: FunctionComponent<BoardsProviderProps> = ({ children }) => {
//     const [boards, setBoards] = useState<BoardData[]>([]); // replace with your board type
  
//     // Fetch the board data here and set it using setBoards
  
//     const useBoards = async () => {
//       await axios.get('/boards').then((response) => {
//         setBoards(response.data);
//         return boards;
//       });
//     }
//     return (
//       <BoardsContext.Provider value={{ boards, useBoards  }}>
//         {children}
//       </BoardsContext.Provider>
//     );
//   }