import React, { useState } from 'react';
import ModToolsPopup from './modToolsPopup';
import { BoardData } from '../components/board-list/boardList';
import { MinorContentContainer, SmallButton, Stronk } from '../styles/styles';
interface ModerationToolsProps {
    userRole: string;
    board: BoardData;
  }
  
const ModTools: React.FunctionComponent<ModerationToolsProps>= ({ userRole, board }) => {
  const isOwner = userRole === 'OWNER';
  const isTier1Moderator = userRole === 'MODERATOR_TIER_1';
  const isTier2Moderator = userRole === 'MODERATOR_TIER_2';
  const isTier3Moderator = userRole === 'MODERATOR_TIER_3';

 const [showPopup, setShowPopup ] = useState(false);
 const [tool, setTool] = useState('STANDARD')

 const handleButtonClick = (tool: React.SetStateAction<string>) => {
   setShowPopup(!showPopup)
   setTool(tool)
  }
  
  function changeTags() {
      handleButtonClick('change-tags')

  }
  function changeDescription() {
      handleButtonClick('change-description')
  }
  function viewReports(){
        handleButtonClick('view-reports')
    }
    function editRules(){
        handleButtonClick('edit-rules')
    }
    function flagUser(){
        handleButtonClick('flag-user')
    }
    function banUser(){
        handleButtonClick('ban-user')
    }
    function setBanner(){
        handleButtonClick('set-banner')
    }
    function banTemp(){
        handleButtonClick('ban-temp')
    }
    function setMOTD(){
        handleButtonClick('set-motd')
    }
    function timeoutUser(){
        handleButtonClick('timeout-user')
    }
    function addMod(){
        handleButtonClick('add-mod')
    }
    function deleteBoard(){
        handleButtonClick('delete-board')
    }

  return (
    // <div className='place-self-center flex flex-col fixed bg-sky-500 border-solid border-2 border-indigo-600  rounded-3xl border-width-5px'>
    <div className='fixed inset-0 flex items-center justify-center'>
    <div className='bg-sky-500 border-solid border-2 border-indigo-600 rounded-3xl border-width-5px'>
      <MinorContentContainer>
      {showPopup && <ModToolsPopup tool={tool} board={board}/>}
      </MinorContentContainer>
      <MinorContentContainer> 
      <h3><Stronk>{board.name}</Stronk> Mod Tools</h3>
      {/* Display different tools for each role */}
      {isOwner && (
        <div>
          <h4>Owner Tools</h4>
          {/* Display owner-specific moderation tools */}
          <SmallButton onClick={changeTags}>change tags</SmallButton>
          <SmallButton onClick={changeDescription}>change description</SmallButton>
          <SmallButton onClick={addMod}>Invite Mod</SmallButton>
          {/* Add more owner-specific tools here */}
        </div>
      )}

      {isTier3Moderator || isOwner && (
        <div>
          <h4>Tier 3 Moderator Tools</h4>
          {/* Display tier 2 moderator-specific moderation tools */}
          <SmallButton onClick={banUser}>Ban User Permanently</SmallButton>
          <SmallButton onClick={flagUser}>Flag User for Mod Review</SmallButton>
          <SmallButton onClick={editRules}>Edit Rules</SmallButton>
          {}
        </div>
      )}
      {isTier2Moderator || isTier3Moderator || isOwner && (
        <div>
          <h4>Tier 2 Moderator Tools</h4>
          {/* Display tier 2 moderator-specific moderation tools */}
          <SmallButton onClick={banTemp}>Ban User Temporarily</SmallButton>
          {/* <button onClick={changeDescription}>Flag User for Mod Review</button> */}
          <SmallButton onClick={setBanner}>Set Banner</SmallButton>
          {/* Add more tier 2 moderator-specific tools here */}
        </div>
      )}

      {isTier1Moderator || isTier2Moderator || isTier3Moderator && (
        <div>
          <h4>Tier 1 Moderator Tools</h4>
          {/* Display tier 1 moderator-specific moderation tools */}
          <SmallButton onClick={timeoutUser}>Timeout User</SmallButton>
          {/* <button onClick={changeDescription} >Save Comment for Review</button> */}
          <SmallButton onClick={setMOTD}>Change Message Of The Day</SmallButton>
          {/* Add more tier 1 moderator-specific tools here */}
        </div>
      )}

      {/* Common tools for all roles */}
      <div>
        <h4>Common Tools</h4>
        <SmallButton onClick={viewReports}>View Reports</SmallButton>
        {/* Add more common tools here */}
      </div>
      </MinorContentContainer>
      </div>
    </div>
  );
};

export default ModTools;
