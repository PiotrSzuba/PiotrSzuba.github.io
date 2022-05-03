import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userContext } from '../contexts/usersContext';

const Login = () => {

    let navigate = useNavigate(); 

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [,setLoggedUser] = useContext(userContext);

    useEffect(() => {
        axios.get('http://localhost:3000/users.json').then(response => {
            const persons = response.data;
            setUsers(persons);
        });
      }, []);

    const handleEmailInput = (event) =>{
        setEmail(event.target.value);
    }
    
    const handlePasswordInput = (event) =>{
        setPassword(event.target.value);
    } 

    const sendError = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
          }, 2000);
    }

    const validateInput = () =>{
        let index = -1;
        if(email.length === 0){
            setErrorMessage("Email field cannot be empty");
            sendError();

            return false;
        }
        for(let i = 0; i < users.length; i++){
            if(users[i].email === email){
                index = i;
                break;
            }
        }
        if(index === -1){
            setErrorMessage("Email is not in database");
            sendError();

            return false;     
        }
        if(password.length === 0){
            setErrorMessage("Password field cannot be empty");
            sendError();

            return false;
        }
        if(users[index].password === password){
            let normalizedUser = JSON.stringify(users[index]);
            saveUserToLocalStorage(normalizedUser);
            setLoggedUser(normalizedUser);
            
            return true;
        }

        setErrorMessage("Password does not match");
        sendError();
        return false;   
    }
    
    const saveUserToLocalStorage = (newUser) =>{
        localStorage.setItem("loggedInUser", newUser);
    }

    const loginUser = () => {
        if(!validateInput()){
            return;
        }

        navigate('/');
    }

    return (
        <div className="main-container">
            <div className="main-container">
                <input value={email} onChange={(event) => handleEmailInput(event)} type="text" className="input" placeholder="Email address"></input>
                <input value={password} onChange={(event) => handlePasswordInput(event)} type="text" className="input" placeholder="Password"></input>
                    <button className='btn-red-full' onClick={() => loginUser()}>Login</button>
                {visible && 
                <div className='message error'>
                    {errorMessage}
                </div>}
            </div>
        </div>
    );
}

export default Login;