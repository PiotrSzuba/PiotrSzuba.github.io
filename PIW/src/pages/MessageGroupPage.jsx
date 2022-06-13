import React, { useState, useRef, useCallback, useEffect } from 'react';
import GroupCardView from '../components/groupCardView';
import {getGroupByUID} from "../firebase/group";
const MessageGroupPage = () =>{
    
    const GetUID = () =>{
        return window.location.pathname.replace("/MessageGroupPage/","");
    }

    const [group, setGroup] = useState();
    const [visible, setVisible] = useState(false);
    const [sendMessageStatus,setSendMessageStatus] = useState("");
    const textInput = useRef("");
    const wrapper = useCallback((node) => {
        textInput.current = node;
    }, [])

    useEffect(() => {
        getGroupByUID(GetUID()).then(res => {
            if(res.length === 1){
                setGroup(res[0]);
            }
        });
      },[]);

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
            { group &&
            <>
            <GroupCardView uid = {GetUID()} groupName = {group.content.groupName} description = {group.content.description}
                members = {group.content.members} course = {group.content.course} image={group.content.image} email={group.content.email}/>            
            <div className="sub-container">
                <textarea autoFocus className = "textArea" ref={wrapper} placeholder = "Write message"/>
                <button className="btn-red-full" onClick={() => sendMessage()}>Send</button>
                    {visible && 
                    <div className='message error'>
                        {sendMessageStatus}
                    </div>}
            </div>
            </>
            }
        </div>
    );
}

export default MessageGroupPage;