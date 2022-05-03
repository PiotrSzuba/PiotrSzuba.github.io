import React, { useState, useEffect } from 'react';
import GroupCardView from '../components/groupCardView';
import axios from 'axios';

const Groups = () => {
    const [groupsList, setGroupList] = useState([]);
    const [filteredGroupsList, setFilteredGroupList] = useState([]);
    const [groupNameFilter, setGroupNameFilter] = useState("");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");

    useEffect(() => {
        axios.get('http://localhost:3000/groups.json').then(response => {
            const resGroups = response.data;
            let localList = JSON.parse(localStorage.getItem("groupsList"));
            if(localList === null || resGroups.length > localList.length){
                setFilteredGroupList(resGroups);
                setGroupList(resGroups);
                localStorage.setItem("groupsList", JSON.stringify(resGroups));
                return;
            }
            setFilteredGroupList(localList);
            setGroupList(localList);
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

    const handleTagsFilter = (event) =>{
        setTagsFilter(event.target.value);
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
                if(filteredGroupsList[i].groupName.toLocaleLowerCase().includes(groupNameFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }
        
        outputArray = [];
        if(descFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                if(filteredGroupsList[i].description.toLocaleLowerCase().includes(descFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }

        outputArray = [];
        if(courseFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                if(filteredGroupsList[i].course.toLocaleLowerCase().includes(courseFilter.toLocaleLowerCase())){
                    outputArray.push(filteredGroupsList[i]);
                }
            }
            setFilteredGroupList(outputArray);
        }

        outputArray = [];
        if(tagsFilter.length){
            for(let i = 0; i < filteredGroupsList.length; i++){
                for(let j = 0; j < filteredGroupsList[i].members.length; j++){
                    for(let k = 0; k < filteredGroupsList[i].members[j].tags.length; k++){
                        if(filteredGroupsList[i].members[j].tags[k].toLocaleLowerCase().includes(tagsFilter.toLocaleLowerCase())){
                            outputArray.push(filteredGroupsList[i]);
                            break;
                        }
                    }
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
        setTagsFilter("");
    }

    document.title = "Lab4 - Groups";

    return (
        <div className="main-container">
            <div className="sub-container">
                <button className="btn-red-full mt-8" onClick={() => filterpanel()}>{filterName}</button>
                {filter && 
                    <div>
                        <input value={courseFilter} onChange={(event) => handleCourseFilter(event)} type="text" className="input" placeholder="Course name"></input>
                        <input value={groupNameFilter} onChange={(event) => handleGroupNameFilter(event)} type="text" className="input" placeholder="Group name"></input>
                        <input value={descFilter} onChange={(event) => handleDescFilter(event)} type="text" className="input" placeholder="Description"></input>
                        <input value={tagsFilter} onChange={(event) => handleTagsFilter(event)} type="text" className="input" placeholder="Tags"></input>
                        <button className="btn-red-full my-1" onClick={() => filterContent()}>Filter</button>
                        <button className="btn-red-full my-1" onClick={() => clearFilterContent()}>Clear</button>
                    </div>
                }
            </div>
            <div>
            { filteredGroupsList.map((group, index) => 
                <GroupCardView key={index} id = {index} groupName = {group.groupName} description = {group.description} 
                members = {group.members} course = {group.course} image={group.image}/>
            )}
            </div>
        </div>
    );
}

export default Groups;