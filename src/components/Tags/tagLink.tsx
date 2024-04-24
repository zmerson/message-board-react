import React from "react";
import { NavLink } from "react-router-dom";

interface TagLinkProps {
    name: string;
    // boardName: string;
    }

const TagLink: React.FunctionComponent<TagLinkProps> = ({ name }) => {
  return (
    <NavLink to={`/tag/${name}`} className="text-cyan-500  text-sm hover:underline">
      {name}
    </NavLink>
  );
}
export default TagLink;