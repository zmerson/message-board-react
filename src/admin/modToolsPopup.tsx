import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BoardData } from "../components/board-list/boardList";
import { SmallButton, SmallInput, buttonTW } from "../styles/styles";

const popupConent = styled.div`
position: fixed;
top: 50%; /* Adjust this value to center the popup vertically */
left: 0;
transform: translateY(-50%);
background-color: white;
padding: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
z-index: 999; /* Ensure the popup appears above other elements */
overflow: scroll;
` 

interface ModToolsPopupProps {
  tool: string;
  board: BoardData;
}

const ModToolsPopup: React.FunctionComponent<ModToolsPopupProps> = ({ tool, board }) => {
  const [banName, setBanUsername] = useState('');
  const [tags, setTags] = useState('');
  const [boardId, setBoardId] = useState(0);
  const location = useLocation();
  const url = location.pathname
  const urlarr = url.split('/')
  const boardName = urlarr[(urlarr.length - 1)]
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBanUsername(event.target.value);
  };
  
  useEffect(() => {
    // console.log('board', board)
    setBoardId(board.id)
  });

  function changeTags() {
    const tagsObj: Tag = { name: tags, boardId: boardId}
    console.log('changing tags', tagsObj)
  const response = axios.post(`./api/${boardName}/tags`, {name: tags, boardId: boardId})
  console.log(response)
  }
  function changeDescription() {
    
  }
  function viewReports(){
      
  }
  function editRules(){
      
  }
  function flagUser(){
      
  }
  async function banUser(){
    console.log(boardName)
    const userRole = await axios.post(`./api/${boardName}/ban`, {banName})
  }
  function setBanner(){
      
  }
  function banTemp(){
      
  }
  function setMOTD(){
      
  }
  function timeoutUser(){
      
  }
  function addMod(){
      
  }

  if (tool === 'view-reports'){
    return (
      <div>
        view reports
      </div>
    )
  }  
  else if (tool === 'edit-rules'){
    return (
      <div>
        edit rules
      </div>
    )
  }  
  else if (tool === 'flag-user'){
    return (
      <div>
        flag-user
      </div>
    )
  }  
  else if (tool === 'add-mod'){
    return (
      <div>
        ban-user
      </div>
    )
  }  
  else if (tool === 'ban-user'){
    return (
      <div>
      <SmallInput type="text" value={banName} onChange={handleUsernameChange} />
      <SmallButton onClick={banUser}>Ban User</SmallButton>
    </div>
    )
  }  
  else if (tool === 'ban-temp'){
    return (
      <div>
        ban-temp
      </div>
    )
  }  
  else if (tool === 'edit-rules'){
    return (
      <div>
        edit-rules
      </div>
    )
  }  
  else if (tool === 'set-banner'){
    return (
      <div>
        set-banner
      </div>
    )
  }  
  else if (tool === 'timeout-user'){
    return (
      <div>
        timeout-user
      </div>
    )
  }  
  else if (tool === 'set-motd'){
    return (
      <div>
        set-motd
      </div>
    )
  }  
  else if (tool === 'delete-board'){
    return (
      <div>
        delete-board
      </div>
    )
  } 
  else if ( tool === 'change-tags'){
    return (
      <div>
        <input className="m-2" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button className={buttonTW} onClick={changeTags}>Change Tags</button>
      </div>
    )
  }
  else{
    return (
      <div>no tool for {tool}</div>
    )
  }

  return (
      <div className="popup-content">asdf
        {/* Your popup content goes here */}
      </div>
    );
  };

  export interface Tag {
    name: string;
    boardId: number;
  }
  export default ModToolsPopup