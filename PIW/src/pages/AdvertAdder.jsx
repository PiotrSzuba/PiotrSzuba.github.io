import React, { useState, useContext } from 'react';
import '../styles/index.css'
import { userContext } from '../contexts/usersContext';
import axios from 'axios';
import {Buffer} from 'buffer';
import {addAdvert} from "../firebase/advert";


const AdvertAdder = (props) => {

    const [courses, setCourses] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [user] = useContext(userContext);

    const getBase64 = (url) => {
        return axios.get(url, {responseType: 'arraybuffer'})
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
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

    const saveData = async () => {
        let coursesList = courses.split(";");
        const res = await getBase64('https://picsum.photos/200/300');
        let tagsList = tags.split(';');
        let content = {fullname: user.displayName,email: user.email,description: desc,courses: coursesList,tags: tagsList,image: "data:image/png;base64, " + res};
        if(res.length){
            addAdvert(content);
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

        setCourses("");
        setDesc("");
        setTags("");
    }

    document.title = "Lab4 - Add advert";
    return (
        <div className="main-container">
            <div className="sub-container">
                {user && 
                <>
                <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> Add new advert</div>
                <input value={courses} onChange={(event) => handleCourseInput(event)} type="text" className="input" placeholder="Course names separated with ; ex Course1;Course2 ;Course3"></input>
                <div> 
                    <input value={desc} onChange={(event) => handleDescInput(event)} type="text" className="input" placeholder="Description"></input>
                    <input value={tags} onChange={(event) => handleTagInput(event)} type="text" className="input" placeholder="Tags separated with ; ex C#;C++ ;java"></input> 
                    <button className="btn-red-full mt-1" onClick={() => getData()}>Submit</button>                  
                </div>                  
                </>
                }
                { !user &&
                    <div className=' text-4xl text-red-500'>You need to login to access this page !</div>
                }
                {visible && 
                <div className='message error'>
                    {errorMessage}
                </div>}
            </div>
        </div>
    );
}

export default AdvertAdder;