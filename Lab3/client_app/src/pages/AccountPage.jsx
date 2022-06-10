import React, { useState,useContext,useEffect} from 'react';
import { userContext } from './../contexts/usersContext';
import PersonCardView from '../components/personCardView';
import GroupCardView from '../components/groupCardView';
import {getUsersAdverts,delAdvert} from "../firebase/advert";
import {getUsersGroups, delGroup} from "../firebase/group";
import AdvertEdit from '../components/AdvertEdit';
import GroupEdit from '../components/GroupEdit';

const Account = () => {
    const [user] = useContext(userContext);
    const [mode,setMode] = useState(false);
    const [editedAdverts, setEditedAdverts] = useState([]);
    const [editedGroups, setEditedGroups] = useState([]);

    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getUsersAdverts(user).then(res => {
            setStudents(res);
            let edited_adverts = [];
            for(let i = 0; i < res.length; i++){
                edited_adverts.push(false);
            }
            setEditedAdverts(edited_adverts);
        });
        getUsersGroups(user).then(res => {
            setGroups(res);
            let edited_groups = [];
            for(let i = 0; i < res.length; i++){
                edited_groups.push(false);
            }
            setEditedGroups(edited_groups);
        });
      }, [user]);

    const handleDeleteAdvert = (uid) => {
        delAdvert(uid).then(res => {
            getUsersAdverts(user).then(res => {
                setStudents(res);
            });
        });
    }

    const handleDeleteGroup = (uid) => {
        delGroup(uid).then(res => {
            getUsersGroups(user).then(res => {
                setGroups(res);
            });
        });
    }

    const handleEditAdvertButton = (index) => {
        const newEditedAdverts = [...editedAdverts];
        newEditedAdverts[index] = !editedAdverts[index];
        setEditedAdverts(newEditedAdverts);
    }

    const handleEditAdvert = () => {
        getUsersAdverts(user).then(res => {
            let newAdverts = [...students];
            newAdverts = res;
            setStudents(newAdverts);
            let edited_adverts = [];
            for(let i = 0; i < res.length; i++){
                edited_adverts.push(false);
            }
            setEditedAdverts(edited_adverts);
        });
    }

    const handleEditGroupButton = (index) => {
        const newEditedGroups = [...editedGroups];
        newEditedGroups[index] = !editedGroups[index];
        setEditedGroups(newEditedGroups);
    }

    const handleEditGroup = () => {
        getUsersGroups(user).then(res => {
            let newGroups = [...groups];
            newGroups = res;
            setGroups(newGroups);
            let edited_groups = [];
            for(let i = 0; i < res.length; i++){
                edited_groups.push(false);
            }
            setEditedGroups(edited_groups);
        });
    }

    return (
        <>
        {user &&
        <div className='main-container'>
            <div className='sub-container'>
                <div className=' flex flex-row mt-4'>
                    <img className = "card-photo" alt = "Loading" src={user.photoURL}/>
                    <div className='flex flex-col w-full'>
                        <div className='text-2xl'>{user.displayName}</div>
                        <div className='text-xl'>{user.email}</div>
                    </div>
                </div>
                <div className='flex flex-row m-auto mt-8'>
                    {mode && 
                    <div className='w-full'>
                        <button onClick = {() => setMode(false)} className='btn-red-half border-r-0 rounded-l-lg'>My adverts</button>
                        <button onClick = {() => setMode(true)} className='btn-red-half-active rounded-r-lg'>My groups</button>
                    </div>
                    }
                    {!mode && 
                    <div className='w-full'>
                        <button onClick = {() => setMode(false)} className='btn-red-half-active border-r-0 rounded-l-lg'>My adverts</button>
                        <button onClick = {() => setMode(true)} className='btn-red-half rounded-r-lg'>My groups</button>
                    </div>
                    }
                </div>
            </div>
            { !mode && students.map((student, index) => 
            <>
                <PersonCardView key = {index} uid = {student.uid} fullname = {student.content.fullname} 
                    email={student.content.email} description = {student.content.description} courses = {student.content.courses} 
                    tags = {student.content.tags} text = {"is looking for these groups"} image={student.content.image} />
                <div className='m-auto w-4/5 flex flex-row'>
                    <div className='w-1/2 py-2 text-center text-white-100 bg-black-900 rounded-l-xl active:ring-2 active:ring-black-200' onClick={() => handleEditAdvertButton(index)}>Edit</div>
                    <div className='w-1/2 py-2 text-center text-red-500 bg-black-900 rounded-r-xl active:ring-2 active:ring-black-200' onClick={() => handleDeleteAdvert(student.uid)}>Delete</div>
                </div>
                {editedAdverts[index] &&
                    <div className="m-auto w-4/5">
                        <AdvertEdit advert={student} callback={handleEditAdvert}/>
                    </div>
                }
            </>    
            )}
            { mode && groups.map((group, index) =>
            <>
                <GroupCardView key={index} uid = {group.uid} groupName = {group.content.groupName} 
                description = {group.content.description} members = {group.content.members} 
                course = {group.content.course} image={group.content.image} email = {group.content.email}/>
                <div className='m-auto w-4/5 flex flex-row'>
                    <div className='w-1/2 py-2 text-center text-white-100 bg-black-900 rounded-l-xl active:ring-2 active:ring-black-200' onClick={() => handleEditGroupButton(index)}>Edit</div>
                    <div className='w-1/2 py-2 text-center text-red-500 bg-black-900 rounded-r-xl active:ring-2 active:ring-black-200' onClick={() => handleDeleteGroup(group.uid)}>Delete</div>
                </div>
                {editedGroups[index] &&
                    <div className="m-auto w-4/5">
                        <GroupEdit group={group} callback={handleEditGroup}/>
                    </div>
                }
            </> 
            )}
        </div>
        }
        { !user && 
            <div className='main-container'>
                U need to log in !
            </div>
        }
        </>
    );
}

export default Account;