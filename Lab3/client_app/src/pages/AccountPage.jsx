import React, { useState,useContext,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { userContext } from './../contexts/usersContext';
import PersonCardView from '../components/personCardView';
import axios from 'axios';
import {Buffer} from 'buffer';

const Account = () => {
    let navigate = useNavigate(); 
    const [loggedUser] = useContext(userContext);
    const [,setLoggedUser] = useContext(userContext);
    let tempUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const [dummyState,setDummyState] = useState();
    const [image, setImage] = useState(tempUser.image);
    const [loaded, setLoaded] = useState(() => {
        if(tempUser.image.length)
        {
            return true;
        }
        return false;
    });

    const getBase64 = (url) => {
        setDummyState("");
        return axios.get(url, {responseType: 'arraybuffer'})
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
    }

    useEffect(async () => {
        if(!tempUser.image.length && tempUser)
        {         
            const res = await getBase64('https://picsum.photos/200/300');
            if(res.length)
            {
                tempUser = {id: tempUser.id ,fullname: tempUser.fullname,
                            email: tempUser.email,description: tempUser.description,
                            courses: [],tags: tempUser.tags,advertsBookmark: tempUser.
                            advertsBookmark, groupsBookmark: tempUser.groupsBookmark,
                            image: "data:image/png;base64, " + res};
                localStorage.setItem("loggedInUser", JSON.stringify(tempUser));
                setLoggedUser(JSON.stringify(tempUser));
                setImage("data:image/png;base64, " + res);
                setLoaded(true);
            }
        }
      }, []);

      const clear = () => {
        setLoggedUser(false);
        localStorage.clear()
        navigate('/');
    }


    return (
        <>
        {tempUser && loaded &&
        <div className='main-container'>
            <PersonCardView key = {tempUser.id} id = {tempUser.id} fullname = {tempUser.fullname} email={tempUser.email} description = {tempUser.description} courses = {[]} tags = {tempUser.tags} image={image}/>
            <div className='sub-container'>
                <button className = "btn-red-full mt-8" onClick = {() => clear()}>Reset localStorage</button>
            </div>
        </div>
        }
        { !tempUser && 
            <div className='main-container'>
                U need to log in !
            </div>
        }
        </>
    );
}

export default Account;