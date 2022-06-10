import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {AiFillGoogleCircle,AiFillGithub} from "react-icons/ai";

import { auth } from "../firebase/init";
import { logInWithGoogle,logInWithGithub } from "../firebase/users";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {

    let navigate = useNavigate(); 
    const [user, loading, error] = useAuthState(auth);
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        if (loading)
            return
        if (user)
            navigate("/");
        if(error)
            console.error({error});
        return;

      }, [user, loading, navigate, error]);

    const handleEmailInput = (event) =>{
        setEmail(event.target.value);
    }
    
    const handlePasswordInput = (event) =>{
        setPassword(event.target.value);
    } 

    return (
        <div className="main-container">
            {!user && 
            <div className="main-container">
                <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> Login</div>
                <input value={email} onChange={(event) => handleEmailInput(event)} type="text" className="input" placeholder="Email address"></input>
                <input value={password} onChange={(event) => handlePasswordInput(event)} type="text" className="input" placeholder="Password"></input>
                <button className='btn-red-full'>Login</button>
                <div className=' flex flex-row mt-8'>
                    <div className='my-auto'>Login with: </div>
                    <AiFillGoogleCircle onClick={logInWithGoogle} className='text-4xl text-red-500 cursor-pointer mx-4 my-auto' />
                    <AiFillGithub onClick={logInWithGithub} className="text-4xl text-black-500 cursor-pointer my-auto" />
                </div>
            </div>
            }
        </div>
    );
}

export default Login;