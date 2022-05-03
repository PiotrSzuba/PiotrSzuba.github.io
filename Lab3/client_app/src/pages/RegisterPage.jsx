import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userContext } from '../contexts/usersContext';

const Register = () => {

    const [fullname, setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [,setLoggedUser] = useContext(userContext);

    let navigate = useNavigate(); 

    const handleFullnameInput = (event) =>{
        setFullname(event.target.value);
    }
    
    const handleEmailInput = (event) =>{
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event) =>{
        setPassword(event.target.value);
    }  

    const handleDescInput = (event) =>{
        setDescription(event.target.value);
    }
    
    const handleTagInput = (event) =>{
        setTags(event.target.value);
    }

    const sendError = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
          }, 2000);
    }

    const validateInput = () =>{
        if(fullname.length === 0){
            setErrorMessage("Fullname field cannot be empty");
            sendError();
            return false;
        }
        if(email.length === 0){
            setErrorMessage("Email field cannot be empty");
            sendError();
            return false;
        }
        if(password.length === 0){
            setErrorMessage("Password field cannot be empty");
            sendError();
            return false;
        }
        if(description.length === 0){
            setErrorMessage("Description field cannot be empty");
            sendError();
            return false;
        }
        if(tags.length === 0){
            setErrorMessage("Tags field cannot be empty");
            sendError();
            return false;
        }

        return true;
    }

    const saveUserToLocalStorage = (newUser) =>{
        localStorage.setItem("loggedInUser", newUser);
    }

    const saveUserToDatabase = (newUser) => {
        axios.post('http://localhost:3000/users.json', newUser).then(response => {
            console.log(response.data);
        });
    }

    useEffect(() => {
        axios.get('http://localhost:3000/users.json').then(response => {
            const persons = response.data;
            setUsers(persons);
        });
      }, []);

    const registerUser = () => {
        if(!validateInput()){
            return;
        }
        let tagsList = tags.split(';');
        let newUser = JSON.stringify({id: users.length + 1,fullname: fullname,password: password,email: email,description: description,tags: tagsList,advertsBookmark: [],groupsBookmark: []});
        saveUserToLocalStorage(newUser); //localstorage
        setLoggedUser(newUser); //context
        //saveUserToDatabase(newUser);
        navigate('/');
    }

    return (
        <div className="main-container">
            <div className="sub-container">
                <input value={fullname} onChange={(event) => handleFullnameInput(event)} type="text" className="input" placeholder="Full name"></input>
                <input value={email} onChange={(event) => handleEmailInput(event)} type="text" className="input" placeholder="Email address"></input>
                <input value={password} onChange={(event) => handlePasswordInput(event)} type="text" className="input" placeholder="Password"></input>
                <input value={description} onChange={(event) => handleDescInput(event)} type="text" className="input" placeholder="Description"></input>
                <input value={tags} onChange={(event) => handleTagInput(event)} type="text" className="input" placeholder="Tags separated with ; ex C#;C++ ;java"></input>
                <div className="submit-container">
                    <button className='btn-red-full my-1' onClick={() => registerUser()}>Register</button>
                </div>
                {visible && 
                <div className='message error'>
                    {errorMessage}
                </div>}
            </div>
        </div>
    );
}

export default Register;