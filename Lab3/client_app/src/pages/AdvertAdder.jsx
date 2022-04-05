import React, { useState } from 'react';
import '../styles/index.scss'
const AdvertAdder = () => {

    const [fullname, setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [courses, setCourses] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");

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
    
    const saveData = (name,email,description,groups,tags) =>{
        let tempList = JSON.parse(localStorage.getItem("studentsList"));
        tempList.push({name: name,email: email,description: description,groups: groups,tags: tags});

        localStorage.setItem("studentsList", JSON.stringify(tempList));
    }

    const getData = () => {
        let coursesList = courses.split(";");
        let tagsList = tags.split(';');
   
        saveData(fullname,email,desc,coursesList,tagsList);

        setFullname("");
        setEmail("");
        setCourses("");
        setDesc("");
        setTags("");
    }

    document.title = "Lab3 - Add advert";
    return (
        <div class="container ">
            <div class="adder-container">
                <div class="filter-inputs">
                    <input value={fullname} onChange={(event) => handleFullnameInput(event)} type="text" class="title-input" placeholder="Full name"></input>
                    <input value={email} onChange={(event) => handleEmailInput(event)} type="text" class="title-input" placeholder="Email address"></input>
                    <input value={courses} onChange={(event) => handleCourseInput(event)} type="text" class="title-input" placeholder="Course names separated with ; ex Course1;Course2 ;Course3"></input>
                    <input value={desc} onChange={(event) => handleDescInput(event)} type="text" class="title-input" placeholder="Description"></input>
                    <input value={tags} onChange={(event) => handleTagInput(event)} type="text" class="title-input" placeholder="Tags separated with ; ex C#;C++ ;java"></input>
                </div>
                <div class="submit-container">
                    <button class='submit-button filter-button' onClick={() => getData()}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default AdvertAdder;