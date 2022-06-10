import React, { useState, useEffect } from 'react';
import GroupCardView from '../components/groupCardView';
import { getAllGroups } from '../firebase/group';

const Groups = () => {
    const [groupsList, setGroupList] = useState([]);
    const [filteredGroupsList, setFilteredGroupList] = useState([]);
    const [groupNameFilter, setGroupNameFilter] = useState("");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");

    useEffect(() => {
        getAllGroups().then(res => {
            setFilteredGroupList(res);
            setGroupList(res);
        });
      }, []);

    const handleGroupNameFilter = (event) =>{
        setGroupNameFilter(event.target.value);
    }

    const handleDescFilter = (event) =>{
        setDescFilter(event.target.value);
    }

    const handleCourseFilter = (event) =>{
        setCourseFilter(event.target.value);
    }

    const filterpanel = () => {
        if(filter){
            setFilter(false);
            setFilterName("Show filters");
            return;
        }
        setFilter(true);
        setFilterName("Hide filters");
    }

    const filterContent = () => {
        let outputArray = [];
        setFilteredGroupList(groupsList);

        if(groupNameFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                if(filteredGroupsList[i].content.groupName.toLocaleLowerCase().includes(groupNameFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }
        
        outputArray = [];
        if(descFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                if(filteredGroupsList[i].content.description.toLocaleLowerCase().includes(descFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }

        outputArray = [];
        if(courseFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                if(filteredGroupsList[i].content.course.toLocaleLowerCase().includes(courseFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }
    }

    const clearFilterContent = () => {
        setFilteredGroupList(groupsList);
        setGroupNameFilter("");
        setCourseFilter("");
        setDescFilter("");
    }

    document.title = "Lab4 - Groups";
    
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> Groups</div>
                <button className="btn-red-full mt-4" onClick={() => filterpanel()}>{filterName}</button>
                {filter && 
                    <div>
                        <input value={courseFilter} onChange={(event) => handleCourseFilter(event)} type="text" className="input" placeholder="Course name"></input>
                        <input value={groupNameFilter} onChange={(event) => handleGroupNameFilter(event)} type="text" className="input" placeholder="Group name"></input>
                        <input value={descFilter} onChange={(event) => handleDescFilter(event)} type="text" className="input" placeholder="Description"></input>
                        <button className="btn-red-full my-1" onClick={() => filterContent()}>Filter</button>
                        <button className="btn-red-full my-1" onClick={() => clearFilterContent()}>Clear</button>
                    </div>
                }
            </div>
            <div>
            { filteredGroupsList.map((group, index) => 
                <GroupCardView key={index} uid = {group.uid} groupName = {group.content.groupName} description = {group.content.description} 
                members = {group.content.members} course = {group.content.course} image={group.content.image} email = {group.content.email}/>
            )}
            </div>
        </div>
    );
}

export default Groups;