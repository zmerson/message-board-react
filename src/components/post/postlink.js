import React from 'react';
import { Link } from 'react-router-dom';
import { PostLinkWrapper, buttonTW } from '../../styles/styles';
const PostLink = ({ post, board }) => {
    // console.log('post was', post);
    // console.log('boardName was', board)
    const doots = post.doots ? post.doots : 0;
    const shortContent = post.content.length > 20
        ? post.content.substring(0, 20) + '...'
        : post.content;
    return (React.createElement(PostLinkWrapper, null,
        React.createElement(Link, { className: buttonTW, to: `/board/${board.name}/post/${post.id}` },
            React.createElement("h2", null,
                post.title,
                " - \uD83C\uDFBA ",
                doots ? doots : '0')),
        React.createElement("p", null,
            shortContent,
            React.createElement("br", null)),
        React.createElement(Link, { className: 'border-solid-1 text-sm', to: `/profile/${post.authorName}` },
            React.createElement("p", null,
                "Author: ",
                post.authorName)),
        React.createElement("p", { className: 'text-sm' },
            "Posted ",
            post.createdAt)));
};
export default PostLink;
