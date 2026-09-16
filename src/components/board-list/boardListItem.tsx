import React, { useEffect, useState } from "react"
import { CardContainer } from "../../styles/styles"
import { BoardData } from "./boardList"
import { Link, NavLink } from "react-router-dom"
import { ListItemContainer } from "./boardListStyles"
import axios from "axios"
import { Tag } from "@prisma/client"
import TagLink from "../Tags/tagLink"
import Container from "../templates/container"


const BoardListItem = (props: {board: BoardData}) => {
    const [tags, setTags] = useState<Tag[]>([]);
    
    useEffect( () => {
            axios.get(`/${props.board.id}/tags`).then((response) => {
            setTags(response.data);
          });
        }, [props.board.name]);
    return (
        <Container className="w-full mt-1 mb-1 p-0 hover:bg-sky-600 pointer">    
            <Link className="p-10" to={`/board/${props.board.name}`}>
                <div className='border-solid text-xl text-center w-full'>
                {props.board.name}
                </div>
            </Link>
                <div className="flex gap-1 flex-row">{  
                    tags?.map((tag) => (
                        <TagLink name={tag.name} key={tag.id}/>
                        ))
                    }
                </div>
        </Container>
    )
}
export default BoardListItem