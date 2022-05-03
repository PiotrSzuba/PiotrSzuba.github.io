import React, { useState, useRef, useCallback } from 'react';
import GroupCardView from '../components/groupCardView';

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
    const [visible, setVisible] = useState(false);
    const [sendMessageStatus,setSendMessageStatus] = useState("");
    const textInput = useRef("");
    const wrapper = useCallback((node) => {
        textInput.current = node;
    }, [])
      
    const sendMessage = () => {
        if(textInput.current.value.length){
            setSendMessageStatus("Message " + textInput.current.value +  " was sent");
        }
        else{
            setSendMessageStatus("Message cannot be empty");
        }
        textInput.current.value = "";
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
          }, 1000);
    }

    return (
        <div className="main-container ">
            <GroupCardView id = {GetId()} groupName = {group.groupName} description = {group.description}
             members = {group.members} course = {group.course} image={group.image}/>
            <div className="sub-container">
                <textarea autoFocus className = "textArea" ref={wrapper} placeholder = "Write message"/>
                <button className="btn-red-full" onClick={() => sendMessage()}>Send</button>
                    {visible && 
                    <div className='message error'>
                        {sendMessageStatus}
                    </div>}
            </div>
        </div>
    );
}

export default MessageGroupPage;