import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../contexts/usersContext';
import axios from 'axios';
import GroupCardView from '../components/groupCardView';
import PersonCardView from '../components/personCardView';

const Bookmark = () => {

    const [mode,setMode] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);

    let parsedUser = JSON.parse(localStorage.getItem("loggedInUser"));
 
    useEffect(() => {
        axios.get('http://localhost:3000/groups.json').then(response => {
            const resGroups = response.data;
            let localList = JSON.parse(localStorage.getItem("groupsList"));
            if(localList === null || resGroups.length > localList.length){
                setGroups(filterGroups(resGroups));
                localStorage.setItem("groupsList", JSON.stringify(filterGroups(resGroups)));
                return;
            }
            setGroups(filterGroups(localList));
        });
        axios.get('http://localhost:3000/home.json').then(response => {
            const resStudents = response.data;
            let localList = JSON.parse(localStorage.getItem("studentsList"));
            if(localList === null || resStudents.length > localList.length){
    
                setStudents(filterStudents(resStudents));
                localStorage.setItem("studentsList", JSON.stringify(resStudents));
                return;
            }
            setStudents(filterStudents(localList));
        });
    }, []);

    const filterGroups = (groups) => {
        let localList = [];
        for(let i = 0; i < parsedUser.groupsBookmark.length; i++){
            for(let j = 0; j < groups.length; j++){
                if(groups[j].id == parsedUser.groupsBookmark[i]){
                    localList.push(groups[j]);
                    break;
                }
            }
        }
        return localList;
    }

    const filterStudents = (adverts) => {
        let localList = [];
        for(let i = 0; i < parsedUser.advertsBookmark.length; i++){
            for(let j = 0; j < adverts.length; j++){
                if(adverts[j].id == parsedUser.advertsBookmark[i]){
                    localList.push(adverts[j]);
                    break;
                }
            }
        }
        return localList;
    }


    return (
        <div className="main-container">
            <div className="sub-container">
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
                <PersonCardView key = {index} id = {index} fullname = {student.fullname} 
                description = {student.description} courses = {student.courses} tags = {student.tags} 
                text = {"is looking for these groups"} bookmark = {true} image={student.image}/>
            )}
            { mode && groups.map((group, index) => 
                <GroupCardView key={index} id = {index} groupName = {group.groupName} 
                description = {group.description} members = {group.members} 
                course = {group.course} bookmark = {true} image={group.image}/>
            )}
        </div>
    );
}

export default Bookmark;