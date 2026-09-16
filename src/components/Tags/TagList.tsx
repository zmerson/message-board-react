import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardData } from "../board-list/boardList";

 interface TaglistProps {
    id: number;
    name: string;
}
const TagList: React.FunctionComponent = () => {
    
    const [boards, setBoards] = useState<TaglistProps[]>([{ id: 999, name: 'none'}]); 
    const { name } = useParams();
    useEffect(() => {
        axios.get(`/tag/${name}`).then((response) => {
            console.log('boards', response.data);
            setBoards(response.data);
            const id = response.data[0]?.id;
            console.log('set board', boards)
            console.log('id', id)
        });
    }, [name]);
    return (
    <div className="flex flex-col bg-sky-400 md:container md:mx-auto">
                <h1 className="ml-2">{name}</h1>
      <div>Discover more "{name}" Boards</div>
      <div> 
            <div>
                {/* {board?.map((board) => {
                    <div>{board.Board.name}</div>
                })} */}
            </div>
            <div className="bg-sky-800">
                {boards.map((board) => (
                    <a href={`/board/${board.name}`} key={board.id}>{board.name}</a>
                ))}
            </div>
          
      </div>
    </div>
  );
}
export default TagList;