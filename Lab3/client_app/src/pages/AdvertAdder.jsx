import React, { useState, useContext } from 'react';
import '../styles/index.css'
import { userContext } from '../contexts/usersContext';
import axios from 'axios';
import {Buffer} from 'buffer';

const AdvertAdder = () => {

    const [fullname, setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [courses, setCourses] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [user] = useContext(userContext);
    const [,setUser] = useContext(userContext);
    const [image, setImage] = useState();

    const getBase64 = (url) => {
        return axios.get(url, {responseType: 'arraybuffer'})
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
    }
    
    const handleFullnameInput = (event) =>{
        setFullname(event.target.value);
    }

    const handleEmailInput = (event) =>{
        setEmail(event.target.value);
    }

    const handleCourseInput = (event) =>{
        setCourses(event.target.value);
    }

    const handleDescInput = (event) =>{
        setDesc(event.target.value);
    }

    const handleTagInput = (event) =>{
        setTags(event.target.value);
    }

    const saveData = async () =>{
        let tempList = JSON.parse(localStorage.getItem("studentsList"));
        let coursesList = courses.split(";");
        if(user){
            setUser();
            let userParsed = JSON.parse(user);
            tempList.push({id: tempList.length + 1,fullname: userParsed.fullname,email: userParsed.email,description: userParsed.description,courses: coursesList,tags: userParsed.tags,image: userParsed.image});
            localStorage.setItem("studentsList", JSON.stringify(tempList));
        }else{
            const res = await getBase64('https://picsum.photos/200/300');
            let tagsList = tags.split(';');
            tempList.push({id: tempList.length + 1,fullname: fullname,email: email,description: fullname,courses: coursesList,tags: tagsList,image: "data:image/png;base64, " + res});
            if(res.length){
                localStorage.setItem("studentsList", JSON.stringify(tempList));
            }
        }
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

        setFullname("");
        setEmail("");
        setCourses("");
        setDesc("");
        setTags("");
    }

    document.title = "Lab4 - Add advert";
    return (
        <div className="main-container">
            <div className="sub-container">
                {!user && 
                    <div>
                        <input value={fullname} onChange={(event) => handleFullnameInput(event)} type="text" className="input" placeholder="Full name"></input>
                        <input value={email} onChange={(event) => handleEmailInput(event)} type="text" className="input" placeholder="Email address"></input>
                    </div>
                }
                <input value={courses} onChange={(event) => handleCourseInput(event)} type="text" className="input" placeholder="Course names separated with ; ex Course1;Course2 ;Course3"></input>
                {!user && 
                    <div> 
                        <input value={desc} onChange={(event) => handleDescInput(event)} type="text" className="input" placeholder="Description"></input>
                        <input value={tags} onChange={(event) => handleTagInput(event)} type="text" className="input" placeholder="Tags separated with ; ex C#;C++ ;java"></input>                   
                    </div>
                }
                <button className="btn-red-full mt-1" onClick={() => getData()}>Submit</button>
                {visible && 
                <div className='message error'>
                    {errorMessage}
                </div>}
            </div>
        </div>
    );
}

export default AdvertAdder;