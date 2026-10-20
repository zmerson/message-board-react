import React, { useState } from 'react';
import ModToolsPopup from './modToolsPopup';
import { MinorContentContainer, SmallButton, Stronk } from '../styles/styles';
const ModTools = ({ userRole, board }) => {
    const isOwner = userRole === 'OWNER';
    const isTier1Moderator = userRole === 'MODERATOR_TIER_1';
    const isTier2Moderator = userRole === 'MODERATOR_TIER_2';
    const isTier3Moderator = userRole === 'MODERATOR_TIER_3';
    const [showPopup, setShowPopup] = useState(false);
    const [tool, setTool] = useState('STANDARD');
    const handleButtonClick = (tool) => {
        setShowPopup(!showPopup);
        setTool(tool);
    };
    function changeTags() {
        handleButtonClick('change-tags');
    }
    function changeDescription() {
        handleButtonClick('change-description');
    }
    function viewReports() {
        handleButtonClick('view-reports');
    }
    function editRules() {
        handleButtonClick('edit-rules');
    }
    function flagUser() {
        handleButtonClick('flag-user');
    }
    function banUser() {
        handleButtonClick('ban-user');
    }
    function setBanner() {
        handleButtonClick('set-banner');
    }
    function banTemp() {
        handleButtonClick('ban-temp');
    }
    function setMOTD() {
        handleButtonClick('set-motd');
    }
    function timeoutUser() {
        handleButtonClick('timeout-user');
    }
    function addMod() {
        handleButtonClick('add-mod');
    }
    function deleteBoard() {
        handleButtonClick('delete-board');
    }
    return (React.createElement("div", { className: 'fixed inset-0 flex items-center justify-center' },
        React.createElement("div", { className: 'bg-sky-500 border-solid border-2 border-indigo-600 rounded-3xl border-width-5px' },
            React.createElement(MinorContentContainer, null, showPopup && React.createElement(ModToolsPopup, { tool: tool, board: board })),
            React.createElement(MinorContentContainer, null,
                React.createElement("h3", null,
                    React.createElement(Stronk, null, board.name),
                    " Mod Tools"),
                isOwner && (React.createElement("div", null,
                    React.createElement("h4", null, "Owner Tools"),
                    React.createElement(SmallButton, { onClick: changeTags }, "change tags"),
                    React.createElement(SmallButton, { onClick: changeDescription }, "change description"),
                    React.createElement(SmallButton, { onClick: addMod }, "Invite Mod"))),
                isTier3Moderator || isOwner && (React.createElement("div", null,
                    React.createElement("h4", null, "Tier 3 Moderator Tools"),
                    React.createElement(SmallButton, { onClick: banUser }, "Ban User Permanently"),
                    React.createElement(SmallButton, { onClick: flagUser }, "Flag User for Mod Review"),
                    React.createElement(SmallButton, { onClick: editRules }, "Edit Rules"))),
                isTier2Moderator || isTier3Moderator || isOwner && (React.createElement("div", null,
                    React.createElement("h4", null, "Tier 2 Moderator Tools"),
                    React.createElement(SmallButton, { onClick: banTemp }, "Ban User Temporarily"),
                    React.createElement(SmallButton, { onClick: setBanner }, "Set Banner"))),
                isTier1Moderator || isTier2Moderator || isTier3Moderator && (React.createElement("div", null,
                    React.createElement("h4", null, "Tier 1 Moderator Tools"),
                    React.createElement(SmallButton, { onClick: timeoutUser }, "Timeout User"),
                    React.createElement(SmallButton, { onClick: setMOTD }, "Change Message Of The Day"))),
                React.createElement("div", null,
                    React.createElement("h4", null, "Common Tools"),
                    React.createElement(SmallButton, { onClick: viewReports }, "View Reports"))))));
};
export default ModTools;
