import React, { useState, useContext } from 'react';
import '../styles/index.css'
import { userContext } from '../contexts/usersContext';
import {updateAdvertByUID} from "../firebase/advert";

const AdvertEdit = (props) => {

    const [courses, setCourses] = useState(props.advert.content.courses.join(";"));
    const [desc, setDesc] = useState(props.advert.content.description);
    const [tags, setTags] = useState(props.advert.content.tags.join(";"));
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [user] = useContext(userContext);

    const handleCourseInput = (event) =>{
        setCourses(event.target.value);
    }

    const handleDescInput = (event) =>{
        setDesc(event.target.value);
    }

    const handleTagInput = (event) =>{
        setTags(event.target.value);
    }

    const saveData = async () => {
        let coursesList = courses.split(";");
        let tagsList = tags.split(';');
        let content = {fullname: user.displayName,email: user.email,description: desc,courses: coursesList,tags: tagsList,image: props.advert.content.image};
        updateAdvertByUID(props.advert.uid,content).then(res =>{
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
        if(courses.length === 0){
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
            <>
            <input value={courses} onChange={(event) => handleCourseInput(event)} type="text" className="input" placeholder="Course names separated with ; ex Course1;Course2 ;Course3"></input>
            <div> 
                <input value={desc} onChange={(event) => handleDescInput(event)} type="text" className="input" placeholder="Description"></input>
                <input value={tags} onChange={(event) => handleTagInput(event)} type="text" className="input" placeholder="Tags separated with ; ex C#;C++ ;java"></input> 
                <button className="btn-red-full mt-1" onClick={() => getData()}>Submit</button>                  
            </div>                  
            </>
        }
            {visible && 
            <div className='message error'>
                {errorMessage}
            </div>
            }       
        </>
    );
}

export default AdvertEdit;