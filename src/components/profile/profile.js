import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
import { buttonTW } from '../../styles/styles';
import BoardListItem from '../board-list/boardListItem';
;
const containerTW = 'container mx-auto p-4 b m-4 border-2 border-gray-600 bg-gray-800 rounded-lg';
const Profile = () => {
    // between 0 and 2
    const rand = Math.floor(Math.random() * 3);
    const { authenticated, user } = useAuth();
    const { name } = useParams();
    const [profile, setProfile] = useState();
    // const [ userRole, setRole ] = useState<UserRolez | null>(null) 
    const [userLoading, setUserLoading] = useState(true);
    const [boardRoles, setBoardRoles] = useState(null);
    // const [ boardMap, setBoardMap ] = useState<Map<number, string> | null>(null);
    const getProfile = useCallback(async () => {
        let profileReq;
        try {
            if (name !== undefined) {
                profileReq = await axios.get(`/user/${name}`);
                setProfile(profileReq.data);
            }
            else if (user?.username) {
                console.log(user.username);
                profileReq = await axios.get(`/user/${user.username}`);
                setProfile(profileReq.data);
            }
            else {
                console.log('no user');
            }
            if (profileReq) {
                console.log(`profileReq is ,`, profileReq.data);
            }
        }
        catch (error) {
            console.log('error', error);
        }
        // console.log('profile', profile)
        // console.log('profileReq', profileReq?.data)
        // const response = await axios.get(`/user/${name}`);
        // console.log('profile is ', response.data)
        // console.log('getprofile is ', getProfile.data)
        // setProfileState(getProfile.data);
        // console.log('boards', getProfile.data.boards)
        // console.log('profile', profile)
    }, [user]);
    useEffect(() => {
        getProfile();
        if (!user) {
            console.log('no user');
            return;
        }
        else {
            console.log(user);
        }
    }, [user, authenticated, name]);
    if (!authenticated) {
        return React.createElement("div", null, "You are not logged in");
    }
    return (React.createElement("div", { className: containerTW },
        profile ? React.createElement("span", { className: 'text-3xl underline' },
            profile.user.name,
            "'s Profile") : React.createElement("p", null, "no profile"),
        React.createElement("br", null),
        React.createElement("span", { className: 'text-4xl' }, "Boards"),
        profile?.boards.map((board) => (React.createElement("div", { key: board.name },
            React.createElement(BoardListItem, { key: board.id, board: board }),
            board && React.createElement("p", null,
                "123",
                board.name)))),
        React.createElement("div", { className: containerTW },
            React.createElement("span", { className: 'text-4xl' }, "Subscriptions"),
            profile?.subscriptions.map((board) => (React.createElement("div", { key: board.name },
                React.createElement(BoardListItem, { key: board.id, board: board }),
                board && React.createElement("p", null,
                    "board name: ",
                    board.name))))),
        React.createElement("div", { className: containerTW },
            React.createElement("span", { className: 'text-4xl mn-' }, "Posts"),
            React.createElement("br", null),
            React.createElement("br", null),
            profile?.posts.map((post) => (React.createElement("div", { key: post.id },
                React.createElement(Link, { className: buttonTW, to: `/board/${post.boardName}/post/${post.id}` }, post.title),
                post && React.createElement("p", { className: 'm-4' },
                    "\"",
                    post.content,
                    "\""))))),
        React.createElement("div", { className: containerTW },
            React.createElement("span", { className: 'text-4xl' }, "Comments"),
            profile?.comments.map((comment) => (React.createElement("div", { key: comment.id },
                React.createElement("p", null, comment.comment),
                comment && React.createElement("p", null, comment.comment))))),
        React.createElement("div", { className: containerTW })));
};
export default Profile;
// interface UserRolez = {
// id: number,
// userId: number,
// boardId: number,
// banned?: boolean,
// subscrubed?: boolean
// role?: Role,
// timeoutStart?: Date,
// TimeoutEnd?: Date,
// }
