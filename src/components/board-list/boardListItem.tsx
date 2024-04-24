import React, { useEffect, useState } from "react"
import { CardContainer } from "../../styles/styles"
import { BoardData } from "./boardList"
import { Link, NavLink } from "react-router-dom"
import { Container, ListItemContainer } from "./boardListStyles"
import axios from "axios"
import { Tag } from "@prisma/client"
import TagLink from "../Tags/tagLink"


const BoardListItem = (props: {board: BoardData}) => {
    const [tags, setTags] = useState<Tag[]>([]);
    
    useEffect( () => {
            axios.get(`/api/${props.board.id}/tags`).then((response) => {
            setTags(response.data);
          });
        }, [props.board.name]);
    return (
        <div className="">    
            <Link to={`/board/${props.board.name}`}>
                <div className='border-solid border-2 border-slate-600 text-xl text-center w-full'>
                {props.board.name}
                </div>
            </Link>
                <div className="flex gap-1 flex-row">{  
                    tags?.map((tag) => (
                        <TagLink name={tag.name} key={tag.id}/>
                        ))
                    }
                </div>
        </div>
    )
}
export default BoardListItem