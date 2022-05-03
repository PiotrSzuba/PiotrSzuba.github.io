import React, { useState, useRef, useCallback } from 'react';
import PersonCardView from '../components/personCardView';

const MessagePersonPage = () =>{

    const GetId = () =>{
        return window.location.pathname.replace("/MessagePersonPage/","");
    }

    const getStudentsFromLocal = () => {
        let localList = JSON.parse(localStorage.getItem("studentsList"));

        return localList[GetId()];
    }

    const [student, setStudent] = useState(getStudentsFromLocal());
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
        <div className="main-container">
            <PersonCardView id = {GetId()} fullname = {student.fullname} description = {student.description} courses = {student.courses} tags = {student.tags} image={student.image}/>
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

export default MessagePersonPage;