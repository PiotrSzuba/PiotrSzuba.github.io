import React, { useState } from 'react';
import PersonCardView from '../components/personCardView/personCardView';

const MessagePersonPage = () =>{

    const GetId = () =>{
        return window.location.pathname.replace("/MessagePersonPage/","");
    }

    const getStudentsFromLocal = () => {
        let localList = JSON.parse(localStorage.getItem("studentsList"));

        return localList[GetId()];
    }

    const [student, setStudent] = useState(getStudentsFromLocal());
    const [textArea, setTextArea] = useState("");
    const [visible, setVisible] = useState(false);
    const [sendMessageStatus,setSendMessageStatus] = useState("");

    const handleTextArea = (event) => {
        setTextArea(event.target.value);
    }

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

    return (
        <div className="container ">
            {<PersonCardView id = {GetId()} name = {student.name} description = {student.description} groups = {student.groups} tags = {student.tags}/>}
            <div className='messagePage-elements'>
                <textarea className = "messagePage-textArea" value={textArea} onChange={(event) => handleTextArea(event)} placeholder = "Write message"/>   
                <button className='button filter-button' onClick={() => sendMessage()}>Send</button>
                {visible && 
                <div className='message'>
                    Message was sent
                </div>}
            </div>

        </div>
    );
}

export default MessagePersonPage;