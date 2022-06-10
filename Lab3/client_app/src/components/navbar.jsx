import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import { RiLoginCircleLine } from 'react-icons/ri';
import {VscAccount,VscBookmark} from 'react-icons/vsc';
import { RiAddCircleLine} from 'react-icons/ri';
import { IoMenuOutline} from 'react-icons/io5';
import { HiOutlineUserGroup } from "react-icons/hi"
import { MdOutlineAnnouncement } from "react-icons/md"

import { auth } from "../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout } from "../firebase/users";

const Navbar = () => {

    const [user] = useAuthState(auth);
    let navigate = useNavigate(); 

    const [sideMenu, setSideMenu] = useState(false);

    const handleSideMenu= ()  => {
        if(sideMenu){
            setSideMenu(false);
            return;
        }
        setSideMenu(true);
    }

    const handleNavigate = (path) => {
        navigate(path);
        setSideMenu(false);
    }

    return (
        <div className='navbar-container flex flex-row'>
            <div className="navbar-content">
                <div className="navLink font-comforter text-3xl" onClick={() => handleNavigate("/")}>Szuba</div>
            </div>
            <div className='text-4xl cursor-pointer bg-black-900 text-white-100 pl-4 text-center flex flex-col' onClick={handleSideMenu}>
                <div className='my-auto'><IoMenuOutline /></div>
            </div>
            {sideMenu && <>
                <div className='flex flex-col bg-black-900/90 pr-1 fixed top-12 z-50 w-screen items-center'>
                <div className="navlink-no-center flex mx-4" onClick={() => handleNavigate("/")}><MdOutlineAnnouncement className='my-auto mx-1'/>Adverts</div>
                <div className='navlink-no-center flex mx-4' onClick={() => handleNavigate("/Groups")}><HiOutlineUserGroup className='my-auto mx-1'/>Groups</div>
                {!user &&
                <div className='navlink-no-center flex mx-4' onClick={() => handleNavigate("/Login")}><RiLoginCircleLine className='my-auto mx-1'/>Login</div>
                }
                {user && <>
                <div className='navlink-no-center flex mx-4' onClick={() => handleNavigate("/AddAdvert")}><RiAddCircleLine className='my-auto mx-1'/>Add new advert</div>
                <div className='navlink-no-center flex mx-4' onClick={() => handleNavigate("/AddGroup")}><RiAddCircleLine className='my-auto mx-1'/>Add new group</div>
                <div className='navlink-no-center flex mx-4' onClick={() => handleNavigate("/Bookmark")}><VscBookmark className='my-auto mx-1'/>Bookmarks</div>
                <div className="navlink-no-center flex mx-4" onClick={() => handleNavigate("/Account")}><VscAccount className='my-auto mx-1'/>{user.displayName}`s account</div>
                <div className="navlink-no-center flex mx-4" onClick={() => logout() }><RiLoginCircleLine className='my-auto mx-1'/>LogOut</div>
                </>}
                </div>
                <div className='fixed w-screen h-screen bg-black-900/30 z-40 bottom-0' onClick={handleSideMenu}></div>
            </>}
        </div>
    );
}

export default Navbar;