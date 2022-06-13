import React, { useState, useRef, useCallback, useEffect } from 'react';
import PersonCardView from '../components/personCardView';
import {getAdvertByUID} from "../firebase/advert";

const MessagePersonPage = () =>{

    const GetUID = () =>{
        return window.location.pathname.replace("/MessagePersonPage/","");
    }

    const [student, setStudent] = useState();
    const [visible, setVisible] = useState(false);
    const [sendMessageStatus,setSendMessageStatus] = useState("");
    const textInput = useRef("");
    const wrapper = useCallback((node) => {
        textInput.current = node;
    }, [])

    useEffect(() => {
        getAdvertByUID(GetUID()).then(res => {
            console.log(res);
            if(res.length === 1){
                setStudent(res[0]);
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
        <div className="main-container">
            { student &&
            <>
            <PersonCardView id = {GetUID()}  fullname = {student.content.fullname} description = {student.content.description} 
                courses = {student.content.courses} tags = {student.content.tags} image={student.content.image}/>
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

export default MessagePersonPage;