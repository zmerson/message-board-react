import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/authContext';
import axios from 'axios';
import ModTools from '../../admin/modTools';
import { buttonTW } from '../../styles/styles';
import { NavLink } from 'react-router-dom';
const SidebarContainer = styled.div `
  width: ${props => props.width || '150px'};
  background-color: #f0f0f0;
  padding: 50px 0 0 0;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`;
const sidebarContent = "p-4";
const sidebarContainer = `w-64 bg-gray-100 p-4 fixed top-30 right-0 h-80 shadow-lg overflow-y-auto`;
const SidebarHeader = styled.div `
  display: flex;
  align-items: center;
  cursor: 
`;
const BoardDescription = styled.div `
  display: flex;
  align-items: center;
  width: 100%;
  overflow: scroll;
  font-size: 12px;
  border: solid 1px;
  border-radius: 5px;
  line-height: 1;
  font-family: 'Arial';
  
`;
const SidebarArrow = styled.div `
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SidebarButton = styled.button `
  background-color: ${(props) => props.user !== undefined ? 'blue' : 'red'};
`;
const SidebarContent = styled.div `
`;
const SubscribeButton = styled.a `
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
`;
const SidebarLink = styled.a `
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
  border: solid 1px;
`;
const SidebarIcon = styled.a `
  width: 20px;
  height: 20px;
  background-color: #333;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
// const BoardInfo = ({children}: Children  ): React.ReactNode => {
const BoardInfo = ({ board }) => {
    const { user, authenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    // const [ boardInfo, setBoardInfo ] = useEffect(checkSubscribed());
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [tags, setTags] = useState('test');
    const [showModTools, setShowModTools] = useState(false);
    const [userRole, setUserRole] = useState('STANDARD');
    const [hiddenstate, sethiddenState] = useState(false);
    const [wit, setwit] = useState('150px');
    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }
            try {
                if (user) {
                    const response = await axios.post(`/board/info/subscribed`, { userId: user.id, boardId: board.id });
                    console.log(response);
                    console.log("subscribed was " + response.data.subscribed);
                    setIsLoading(false);
                    const userRole = await axios.post(`/board/${board.name}/userRole`, { userId: user.id, boardId: board.id });
                    //const userRole = JSON.stringify(role)
                    console.log(userRole);
                    setUserRole(userRole.data.role);
                    setIsSubscribed(userRole.data.subscribed);
                }
                else {
                    console.log("no user, sign in please");
                }
                // console.log(user)
            }
            catch (error) {
                console.error('Error fetching subscription status:', error);
            }
        };
        fetchSubscriptionStatus();
    }, [isSubscribed]);
    // useEffect(() => {
    //   const getTags = async () => {
    //     // const response = await axios.get(`/board/info/${board.name}/tags`)
    //     // return response
    //   }
    //  }, [tags])
    const getTags = async () => {
        const response = await axios.get(`/board/info/${board.name}/tags`);
        setTags(JSON.stringify(response));
        return response;
    };
    const updateWit = () => {
        console.log(wit);
    };
    // const tagOnClick = async () => {
    //   const response = getTags();
    // }
    const unSubscribe = async () => {
        setIsSubscribed(false);
        const response = await axios.post(`/unsubscribe`, { userId: user.id, boardId: board.id });
        setIsSubscribed(false);
        window.alert("you have clicked unsubscribe");
    };
    // const toggleSidebar = () => {
    //   console.log(expanded)
    //   expanded === 'true' ? setExpanded('false') : setExpanded('true')
    //   //setExpanded((expanded) => !expanded);
    // };
    const subscribe = async () => {
        const response = await axios.post('api/subscribe', { userId: user.id, boardName: board.name });
        window.alert("you have clicked subscribe");
        setIsSubscribed(true);
    };
    const toggleModTools = () => {
        setShowModTools(!showModTools);
    };
    if (isLoading) {
        return React.createElement("div", null, "loading");
    }
    function toggleHiddenstate() {
        sethiddenState(!hiddenstate);
    }
    return (React.createElement("div", null,
        showModTools && (React.createElement(ModTools, { userRole: userRole, board: board })),
        React.createElement("div", { className: sidebarContainer },
            React.createElement(SidebarHeader, null,
                React.createElement("h2", { className: 'm1-2 bg-sky-200' }, board.name)),
            React.createElement(BoardDescription, { onClick: toggleHiddenstate }, tags),
            React.createElement("div", { className: sidebarContent },
                user ? isSubscribed ? React.createElement("button", { className: buttonTW, onClick: unSubscribe }, "unsubscribe") : React.createElement("button", { className: buttonTW, onClick: subscribe }, "Subscribe") : React.createElement(NavLink, { to: '/auth' }, "Sign in to subscribe"),
                React.createElement("button", { className: buttonTW, onClick: getTags }, "Tags"),
                React.createElement("button", { className: buttonTW }, "console"),
                React.createElement("button", { className: buttonTW, onClick: toggleModTools }, "mod tools")))));
};
export default BoardInfo;
