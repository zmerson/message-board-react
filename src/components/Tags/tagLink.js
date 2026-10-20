import React from "react";
import { NavLink } from "react-router-dom";
const TagLink = ({ name }) => {
    return (React.createElement(NavLink, { to: `/tag/${name}`, className: "text-cyan-500  text-sm hover:underline" }, name));
};
export default TagLink;
