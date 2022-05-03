import React, { useState,useContext } from 'react';
import { NavLink } from "react-router-dom";
import { RiLoginCircleLine } from 'react-icons/ri';
import {VscAccount,VscBookmark} from 'react-icons/vsc';
import { userContext } from '../contexts/usersContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate(); 
    
    const [,setLoggedUser] = useContext(userContext);
    const [user] = useContext(userContext);

    const checkForUser = () => {
        let tempUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if(tempUser === null ){
            return false;
        }
        
        if(!user){
            setLoggedUser(JSON.stringify(tempUser));
            return true;
        }

        return true;
    }

    const [visible,setVisible] = useState(checkForUser());

    const logout = () => {
        setLoggedUser(false);
        setVisible(false);
        localStorage.setItem("loggedInUser", JSON.stringify(null));

        navigate('/');
    }

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="force-left">
                    <NavLink className="navLink" to="/">Home</NavLink>
                    <NavLink className="navLink" to="/AddAdvert">Add advert</NavLink>
                    <NavLink className="navLink" to="/Groups">Groups</NavLink>
                    <NavLink className="navLink" to="/AddGroup">Add group</NavLink>
                </div>
                <div className="force-right">
                    {!user && 
                    <div className="force-right">
                        <NavLink className="navLink" to="/Login"><RiLoginCircleLine/> Login</NavLink>
                        <NavLink className="navLink" to="/Register"><VscAccount/> Register</NavLink>
                    </div>                                   
                    }
                    {user && 
                    <div className="force-right">
                        <NavLink className="navLink" to="/Bookmark"><VscBookmark/>Bookmark</NavLink>
                        <NavLink className="navLink" to="/Account"><VscAccount/>Account</NavLink>
                        <NavLink onClick = {() => logout() } className="navLink" to="/"><RiLoginCircleLine/>Logout</NavLink>
                    </div>                                   
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;