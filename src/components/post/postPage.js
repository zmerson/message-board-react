import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { BoardContext } from '../board/boardContext';
const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const { authenticated, user } = useAuth();
    const [userRole, setRole] = useState(null);
    const [comments, setComments] = useState(null);
    const { name: boardName, id } = useParams();
    const board = useContext(BoardContext);
    let commentDootMap = new Map();
    const [commentDoots, setCommentDoots] = useState(commentDootMap);
    const container = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    };
    const postTitle = {
        borderBottom: "2px solid black",
        display: "inline-block",
        marginBottom: "10px",
    };
    const commentContainer = {
        marginTop: "20px",
        border: "1px solid #ccc",
        padding: "10px",
    };
    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`/post/${id}`);
            setPost(response.data);
            console.log('post', response.data);
            try {
                const userRoleResponse = await axios.post(`/board/${boardName}/userRole`, { userId: user.id });
                setRole(userRoleResponse);
                console.log(JSON.stringify(userRoleResponse) + "is your role");
            }
            catch (error) {
                console.log("error", error);
            }
            try {
                const getComments = await axios.get(`/${id}/comments`);
                console.log('comments', getComments.data);
                setComments(getComments.data);
            }
            catch (error) {
                console.log("error", error);
            }
        };
        fetchPost();
    }, [id]);
    const getCommentDoots = async (comments) => {
        const response = await axios.get(`/${id}/cdoots`);
        setPost({ ...post, doots: response.data.doots });
    };
    const setCDoots = async (doots) => {
        const response = await axios.post(`/${id}/cdoots`, { doots });
        setPost({ ...post, doots: response.data.doots });
        alert(response.data);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user) {
            try {
                console.log("submitting comment for postId=", id, "userId=", user.id, "comment=", comment);
                const response = await axios.post(`/${id}/newComment`, {
                    comment: comment,
                    postId: id,
                    userId: user.id,
                });
                console.log("comment submitted successfully", response.data);
                window.location.reload();
            }
            catch (error) {
                console.log("error submitting comment", error);
            }
        }
    };
    return (React.createElement("div", { className: 'flex flex-col justify-center items-center min-h-screen bg-slate-700' },
        React.createElement("div", { className: 'container mx-auto bg-slate-600 p-6 rounded-lg shadow-md' },
            post && (React.createElement(React.Fragment, null,
                React.createElement("h1", { className: 'postTitle' },
                    React.createElement("span", null, "+"),
                    post.title,
                    " - \uD83C\uDFBA ",
                    post.doots ? post.doots : "0"),
                React.createElement("p", null, post.content),
                React.createElement(Link, { to: `/profile/${post.authorName}` },
                    "Author: ",
                    post.authorName),
                React.createElement("p", null,
                    "Posted On: ",
                    post.createdAt),
                React.createElement("h2", null, "Comments:"),
                comments?.map((comment, index) => (React.createElement("div", { key: index, className: 'commentContainer' },
                    React.createElement("span", { onClick: async () => { setCDoots(1); }, className: 'text-lg cursor-pointer bg-sky-600' }, "+"),
                    React.createElement("span", null,
                        "\uD83C\uDFBA",
                        comment.doots ? comment.doots : "0"),
                    React.createElement("p", null, comment.comment),
                    React.createElement("p", null,
                        "Posted By: ",
                        comment.userName,
                        "."),
                    React.createElement(Link, { to: `/profile/${comment.userName}` },
                        "Commented by: ",
                        comment.userId)))))),
            user && (React.createElement("form", { className: "flex flex-col w-1/3 bg-slate-500 m-2 p-2", onSubmit: handleSubmit },
                React.createElement("label", { htmlFor: "comment" }, "Comment:"),
                React.createElement("textarea", { className: 'bg-slate-200', value: comment, onChange: (e) => setComment(e.target.value) }),
                React.createElement("button", { type: "submit" }, "Submit"))))));
};
export default PostPage;
