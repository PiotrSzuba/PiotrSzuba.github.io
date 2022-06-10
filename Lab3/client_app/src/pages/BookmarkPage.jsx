import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../contexts/usersContext';
import GroupCardView from '../components/groupCardView';
import PersonCardView from '../components/personCardView';

import { getUsersAdvertBookmarks, getUsersGroupBookmarks } from '../firebase/users';
import { getAllAdverts } from '../firebase/advert';
import { getAllGroups } from "../firebase/group";

const Bookmark = () => {

    const [mode,setMode] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);

    const [user] = useContext(userContext);
 
    const filterArrayByUidArray = (array, uidArray) => {
        let outputArray = [];
        for(let i = 0; i < uidArray.length; i++){
            for(let j = 0; j < array.length; j++){
                if(uidArray[i] === array[j].uid){
                    outputArray.push(array[j])
                    break;
                }
            }
        }
        
        return outputArray;
    }

    useEffect(() => {
        if(!user){
            return;
        }
        getUsersAdvertBookmarks(user).then(res => {
            const uidArray = res;
            getAllAdverts().then(res => {
                setStudents(filterArrayByUidArray(res,uidArray));
            });
        });
        getUsersGroupBookmarks(user).then(res => {
            const uidArray = res;
            getAllGroups().then(res => {
                setGroups(filterArrayByUidArray(res,uidArray));
            });
        });
    }, [user]);

    return (
        <div className="main-container">
            {user && <>
            <div className="sub-container">
                <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> My Bookmarks</div>
                <div className='flex flex-row m-auto'>
                    {mode && 
                    <div className='w-full'>
                        <button onClick = {() => setMode(false)} className='btn-red-half border-r-0 rounded-l-lg'>People</button>
                        <button onClick = {() => setMode(true)} className='btn-red-half-active rounded-r-lg'>Groups</button>
                    </div>
                    }
                    {!mode && 
                    <div className='w-full'>
                        <button onClick = {() => setMode(false)} className='btn-red-half-active border-r-0 rounded-l-lg'>People</button>
                        <button onClick = {() => setMode(true)} className='btn-red-half rounded-r-lg'>Groups</button>
                    </div>
                    }
                </div>
            </div>
            { !mode && students.map((student, index) => 
                <PersonCardView key = {index} uid = {student.uid} fullname = {student.content.fullname} 
                email={student.content.email} description = {student.content.description} courses = {student.content.courses} 
                tags = {student.content.tags} text = {"is looking for these groups"} image={student.content.image} />
            )}
            { mode && groups.map((group, index) => 
                <GroupCardView key={index} uid = {group.uid} groupName = {group.content.groupName} description = {group.content.description} 
                members = {group.content.members} course = {group.content.course} image={group.content.image} email = {group.content.email}/>
            )}
            </>
            }
            { !user && 
            <div className='main-container'>
                U need to log in !
            </div>
            }
        </div>
    );
}

export default Bookmark;