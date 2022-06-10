import React, { useState, useContext } from 'react';
import '../styles/index.css'
import { userContext } from '../contexts/usersContext';
import {updateGroupByUID} from "../firebase/group";

const GroupEdit = (props) => {

    const [course, setCourse] = useState(props.group.content.course);
    const [desc, setDesc] = useState(props.group.content.description);
    const [members, setMembers] = useState(props.group.content.members.join(";"));
    const [groupName,setGroupName] =useState(props.group.content.groupName);
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [user] = useContext(userContext);

    const handleCourseInput = (event) =>{
        setCourse(event.target.value);
    }

    const handleDescInput = (event) =>{
        setDesc(event.target.value);
    }

    const handleMembersInput = (event) =>{
        setMembers(event.target.value);
    }

    const handleGroupNameInput = (event) => {
        setGroupName(event.target.value)
    }

    const saveData = async () => {
        let content = {groupName: groupName, description: desc, members: 
            members.split(";"), course: course, email:user.email, image: props.group.content.image}
        updateGroupByUID(props.group.uid,content).then(res =>{
            props.callback();
        });
    }
    const sendError = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
          }, 2000);
    }

    
    const validateInput = () => {
        if(course.length === 0){
            setErrorMessage("Courses field cannot be empty");
            sendError();
            return false;
        }
        return true;
    }

    const getData = () => {
        if(!validateInput()){
            return;
        }
        saveData();
    }

    return (
        <>
        {user && 
        <div className="">
            <div className="">
                <input placeholder="Group name" type="text" className="input" value={groupName} onChange={handleGroupNameInput} />
                <input placeholder="Description" type="text" className="input" value={desc} onChange={handleDescInput} />
                <input placeholder="Emails of members seperate with ; example: email1;email2" type="text" className="input" value={members} onChange={handleMembersInput} />
                <input placeholder="Course" type="text" className="input" value={course} onChange={handleCourseInput} />
                <button className="btn-red-full mt-1" onClick={() => getData()}>Submit</button>
                {visible && 
                    <div className='message error'>
                        {errorMessage}
                    </div>
                }
            </div>
        </div>
        }     
        </>
    );
}

export default GroupEdit;