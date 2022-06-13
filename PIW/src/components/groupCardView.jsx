import React,{ useState, useContext,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {VscBookmark} from 'react-icons/vsc';
import { userContext } from './../contexts/usersContext';
import { addGroupBookmark,getUsersGroupBookmark } from '../firebase/users';

const GroupCardView = (props) => {
    const [user] = useContext(userContext);

    const studentsList = props.members.map((student,index) => 
        <div key={index}>
            {student}
        </div>
    );

    const [href] = useState(() => {
        if(user && user.email === props.email)
        {
            return "/Account";
        }

        return "/MessageGroupPage/" + props.uid;
    });   

    const [bookmark, setBookmark] = useState(false);
            
    useEffect(() => {
        if(!user){
            return;
        }
        getUsersGroupBookmark(user,props.uid).then(res => {
            setBookmark(res);
        })        
    }, [props.uid, user]);

    const handleBookmarkChange = () => {
        if(!user){
            return;
        }
        addGroupBookmark(user,props.uid).then(res => {
            setBookmark(res)
        });
    }

    return(
        <div className='m-auto w-4/5'>
            {user && 
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
                        <img className = "card-photo" alt = "No content" src={props.image}/>
                        <div className="flex flex-col sm:mt-8">
                        <div className='card-title'>{props.groupName} is looking for members for {props.course}</div>
                        </div>
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-description'>
                        {props.description}
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-groups'>
                    {studentsList}
                </div>
                </NavLink>
            </div>
        </div>
    );
}

export default GroupCardView;