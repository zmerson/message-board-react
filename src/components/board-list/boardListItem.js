import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TagLink from "../Tags/tagLink";
import Container from "../templates/container";
const BoardListItem = (props) => {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        axios.get(`/${props.board.id}/tags`).then((response) => {
            setTags(response.data);
        });
    }, [props.board.name]);
    return (React.createElement(Container, { className: "w-full mt-1 mb-1 p-0 hover:bg-sky-600 pointer" },
        React.createElement(Link, { className: "p-10", to: `/board/${props.board.name}` },
            React.createElement("div", { className: 'border-solid text-xl text-center w-full' }, props.board.name)),
        React.createElement("div", { className: "flex gap-1 flex-row" }, tags?.map((tag) => (React.createElement(TagLink, { name: tag.name, key: tag.id }))))));
};
export default BoardListItem;
