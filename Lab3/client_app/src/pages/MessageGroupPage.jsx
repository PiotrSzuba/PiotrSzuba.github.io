import React, { useState } from 'react';
import GroupCardView from '../components/groupCardView/groupCardView';

const MessageGroupPage = () =>{

    const GetId = () =>{
        let id = window.location.pathname.replace("/MessageGroupPage/","");
    
        return id = window.location.pathname.replace("/MessageGroupPage/","");
    }

    const getGroupsFromLocal = () => {
        let localList = JSON.parse(localStorage.getItem("groupsList"));

        return localList[GetId()];
    }

    const [group, setGroup] = useState(getGroupsFromLocal());
    const [textArea, setTextArea] = useState("");
    const [visible, setVisible] = useState(false);
    const [sendMessageStatus,setSendMessageStatus] = useState("");

    const sendMessage = () => {
        if(textArea.length){
            setSendMessageStatus("Message was sent");
        }
        else{
            setSendMessageStatus("Message cannot be empty");
        }
        setTextArea("");
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
          }, 1000);
    }

    const handleTextArea = (event) => {
        setTextArea(event.target.value);
    }

    return (
        <div className="container ">
            <GroupCardView id = {GetId()} groupName = {group.groupName} description = {group.description} members = {group.members} course = {group.course}/>
            <div className='messagePage-elements'>
            <textarea className = "messagePage-textArea" value={textArea} onChange={(event) => handleTextArea(event)} placeholder = "Write message"/>
                <button className='button filter-button' onClick={() => sendMessage()}>Send</button>
                {visible && 
                <div className='message'>
                    {sendMessageStatus}
                </div>}
            </div>
        </div>
    );
}

export default MessageGroupPage;