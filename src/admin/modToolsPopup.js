import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SmallButton, SmallInput, buttonTW } from "../styles/styles";
const popupConent = styled.div `
position: fixed;
top: 50%; /* Adjust this value to center the popup vertically */
left: 0;
transform: translateY(-50%);
background-color: white;
padding: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
z-index: 999; /* Ensure the popup appears above other elements */
overflow: scroll;
`;
const ModToolsPopup = ({ tool, board }) => {
    const [banName, setBanUsername] = useState('');
    const [tags, setTags] = useState('');
    const [boardId, setBoardId] = useState(0);
    const location = useLocation();
    const url = location.pathname;
    const urlarr = url.split('/');
    const boardName = urlarr[(urlarr.length - 1)];
    const handleUsernameChange = (event) => {
        setBanUsername(event.target.value);
    };
    useEffect(() => {
        // console.log('board', board)
        setBoardId(board.id);
    });
    function changeTags() {
        const tagsObj = { name: tags, boardId: boardId };
        console.log('changing tags', tagsObj);
        const response = axios.post(`./${boardName}/tags`, { name: tags, boardId: boardId });
        console.log(response);
    }
    function changeDescription() {
    }
    function viewReports() {
    }
    function editRules() {
    }
    function flagUser() {
    }
    async function banUser() {
        console.log(boardName);
        const userRole = await axios.post(`./${boardName}/ban`, { banName });
    }
    function setBanner() {
    }
    function banTemp() {
    }
    function setMOTD() {
    }
    function timeoutUser() {
    }
    function addMod() {
    }
    if (tool === 'view-reports') {
        return (React.createElement("div", null, "view reports"));
    }
    else if (tool === 'edit-rules') {
        return (React.createElement("div", null, "edit rules"));
    }
    else if (tool === 'flag-user') {
        return (React.createElement("div", null, "flag-user"));
    }
    else if (tool === 'add-mod') {
        return (React.createElement("div", null, "ban-user"));
    }
    else if (tool === 'ban-user') {
        return (React.createElement("div", null,
            React.createElement(SmallInput, { type: "text", value: banName, onChange: handleUsernameChange }),
            React.createElement(SmallButton, { onClick: banUser }, "Ban User")));
    }
    else if (tool === 'ban-temp') {
        return (React.createElement("div", null, "ban-temp"));
    }
    else if (tool === 'edit-rules') {
        return (React.createElement("div", null, "edit-rules"));
    }
    else if (tool === 'set-banner') {
        return (React.createElement("div", null, "set-banner"));
    }
    else if (tool === 'timeout-user') {
        return (React.createElement("div", null, "timeout-user"));
    }
    else if (tool === 'set-motd') {
        return (React.createElement("div", null, "set-motd"));
    }
    else if (tool === 'delete-board') {
        return (React.createElement("div", null, "delete-board"));
    }
    else if (tool === 'change-tags') {
        return (React.createElement("div", null,
            React.createElement("input", { className: "m-2", type: "text", value: tags, onChange: (e) => setTags(e.target.value) }),
            React.createElement("button", { className: buttonTW, onClick: changeTags }, "Change Tags")));
    }
    else {
        return (React.createElement("div", null,
            "no tool for ",
            tool));
    }
    return (React.createElement("div", { className: "popup-content" }, "asdf"));
};
export default ModToolsPopup;
