import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const TagList = () => {
    const [boards, setBoards] = useState([{ id: 999, name: 'none' }]);
    const { name } = useParams();
    useEffect(() => {
        axios.get(`/tag/${name}`).then((response) => {
            console.log('boards', response.data);
            setBoards(response.data);
            const id = response.data[0]?.id;
            console.log('set board', boards);
            console.log('id', id);
        });
    }, [name]);
    return (React.createElement("div", { className: "flex flex-col bg-sky-400 md:container md:mx-auto" },
        React.createElement("h1", { className: "ml-2" }, name),
        React.createElement("div", null,
            "Discover more \"",
            name,
            "\" Boards"),
        React.createElement("div", null,
            React.createElement("div", null),
            React.createElement("div", { className: "bg-sky-800" }, boards.map((board) => (React.createElement("a", { href: `/board/${board.name}`, key: board.id }, board.name)))))));
};
export default TagList;
