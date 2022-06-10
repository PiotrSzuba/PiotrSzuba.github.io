import React, { useState,useContext,useEffect} from 'react';
import { userContext } from './../contexts/usersContext';
import { NavLink } from "react-router-dom";
import {VscBookmark} from 'react-icons/vsc';
import { addAdvertBookmark,getUsersAdvertBookmark } from '../firebase/users';

const PersonCardView = (props) => {
    const [user] = useContext(userContext);

    const studentsGroupsList = props.courses.map((course,index) =>  
        <li key={index}>{course}</li>  
    );

    const studentsTagsList = props.tags.map((tag,index) => 
        <div key={index} className='card-tag'>{tag}</div>
    );
    const [href] = useState(() => {
            if(user && user.email === props.email)
            {
                return "/Account";
            }

            return "/MessagePersonPage/" + props.uid;
        }
    )

    const [bookmark, setBookmark] = useState(false);
        
    useEffect(() => {
        if(!user){
            return;
        }
        getUsersAdvertBookmark(user,props.uid).then(res => {
            setBookmark(res);
        })        
      }, [props.uid, user]);

    const handleBookmarkChange = () => {
        if(!user){
            return;
        }
        addAdvertBookmark(user,props.uid).then(res => {
            setBookmark(res)
        });
    }

    return(
        <div className='m-auto w-4/5'>
            { user &&
            <div onClick = {() => handleBookmarkChange()} className="cursor-pointer flex flex-row-reverse">
                { !bookmark &&
                <div className="relative top-8 right-1 text-white-600">
                    <VscBookmark />
                </div>
                }
                { bookmark &&
                <div className="relative top-8 right-1 text-red-500">
                    <VscBookmark />
                </div>
                }
            </div>
            }
            <div className='card-container'>
                <NavLink className = 'navlink-stripper' to = {href}>
                    <div className="card-photo-title-container">
                        <img className = "card-photo" alt = "Loading" src={props.image}/>
                        <div className="flex flex-col sm:mt-8">
                            <div className='card-title'>{props.fullname} {props.text}</div>
                            <div className='card-groups'>
                                {studentsGroupsList}
                            </div>
                        </div>
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-description'>
                        {props.description}
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-tags'>
                        {studentsTagsList}
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default PersonCardView;