import React, { useState } from 'react';
import '../styles/index.scss'
import GroupCardView from '../components/groupCardView/groupCardView';

const Groups = () => {

    const names = 
    [
        "Zeus","Hera","Poseidon",
        "Hades","Athena","Appolo",
        "Artemis", "Aphrodite", "Hermes",
        "Ares", "Hephaestus", "Cronus", 
        "Prometheus", "Dionysus", "Demeter",
        "Ceres", "Persephone", "Eros", 
        "Odysseus", "Hercules", "Theseus",
        "Perseus", "Oedipus", "Orestes"
    ];

    const surnames = 
    [
        "Thor", "Freyr", "Odin",
        "Freyja", "Sif", "Hildr",
        "Astrilde", "Signy", "Eir",
        "Idunn", "Skuld", "Gerd",
        "Frigg", "Nerthus", "Yggdrasil",
        "Loki", "Orvar", "Sigurd", 
        "Dagr","Hrungnir", "Austri"
    ];

    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    
    const groups = 
    [
        "Advanced Databases","Advanced Topics in Artificial Intelligence","Information System Modelling and Analysis",
        "System Modelling and Analysis", "Parallel and Distributed Computing", "Software System Development",
        "Modelling and Analysis of Web-based Systems", "Mobile and Multimedia Systems", "Foundations of Knowledge Engineering",
        "Physics of Contemporary Computer Science","Recent Advances in Computer Science","Ethics of New Technologies",
        "Advanced Computer Network", "Advanced Computer Graphics","Digital Image Processing",
        "Multimedia Information Systems", "User Interface Development","Data Warehouses",
        "Research Methodology","Business Modelling and Analysis","Monographic Subject"
    ];

    const tagsList = 
    [
        "C", "C++", "C#",
        "Java", "Python", "F#",
        "PHP", "R", "Dart",
        "Go", "Rust", "JavaScript",
        "TypeScript", "Ruby", "Vue",
        "React","Angular","Beer"

    ];

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const generateName = () => {
        let name = names[getRandomInt(names.length - 1)];
        let surname = surnames[getRandomInt(surnames.length - 1)];

        return name + " " + surname; 
    }

    const generateDescription = () => {
        let max = getRandomInt(description.length);
        return description.substring(max);
    }

    const generateCourse = () =>{
        return groups[getRandomInt(groups.length - 1)];
    }

    const deleteDuplicates = (array) => {
        let seen = {};
        return array.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });     
    }

    const generateRandomArray = (array) => {
        let resultArray = [];
        let numberOfElements = Math.ceil(getRandomInt(array.length - 1)/2);
        for(let i = 0; i < numberOfElements; i++){
            resultArray.push(array[getRandomInt(array.length - 1)]);
        }

        resultArray = deleteDuplicates(resultArray);

        if(!resultArray.length){
            resultArray.push(array[getRandomInt(array.length - 1)]);
        }

        return resultArray;
    }

    const generateMembers = () => {
        let outputArray = [];
        let amountOfPeople = getRandomInt(5);
        if(amountOfPeople == 0){
            amountOfPeople++;
        }
        for(let i = 0; i < amountOfPeople; i++){
            let name = generateName();
            let tags = generateRandomArray(tagsList);
            tags = tags.join(", ");
            outputArray.push(name + ": " + tags);
        }

        return outputArray;
    }

    const groupList = 
    [
        {groupName: generateName(),description: generateDescription(),members: generateMembers(),course: generateCourse()},
        {groupName: generateName(),description: generateDescription(),members: generateMembers(),course: generateCourse()},
    ];

    const getGroupsFromLocal = () => {
        let localList = JSON.parse(localStorage.getItem("groupsList"));
        if(localList == null || localList.length == 0){
            localStorage.setItem("groupsList", JSON.stringify(groupList));

            return groupList;
        }
        //localStorage.setItem("groupsList", JSON.stringify([]));
        return JSON.parse(localStorage.getItem("groupsList")) || [];
    }
    const [groupsList, setGroupList] = useState(getGroupsFromLocal());
    const [filteredGroupsList, setFilteredGroupList] = useState(getGroupsFromLocal());
    const [groupNameFilter, setGroupNameFilter] = useState("");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");

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
                    if(filteredGroupsList[i].members[j].toLocaleLowerCase().includes(tagsFilter.toLocaleLowerCase())){
                        outputArray.push(filteredGroupsList[i]);
                        break;
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

    document.title = "Lab3 - Groups";

    return (
        <div className="container ">
            <div className='filter'>
                <button className='button filter-button' onClick={() => filterpanel()}>{filterName}</button>
                {filter && 
                    <div className='filter-inputs'>
                        <input value={courseFilter} onChange={(event) => handleCourseFilter(event)} type="text" class="title-input" placeholder="Course name"></input>
                        <input value={groupNameFilter} onChange={(event) => handleGroupNameFilter(event)} type="text" class="title-input" placeholder="Group name"></input>
                        <input value={descFilter} onChange={(event) => handleDescFilter(event)} type="text" class="title-input" placeholder="Description"></input>
                        <input value={tagsFilter} onChange={(event) => handleTagsFilter(event)} type="text" class="title-input" placeholder="Tags"></input>
                        <button className='button filter-button' onClick={() => filterContent()}>Filter</button>
                        <button className='button filter-button' onClick={() => clearFilterContent()}>Clear</button>
                    </div>
                }
            </div>
            <div>
            { filteredGroupsList.map((group) => 
                <GroupCardView key={group.id} groupName = {group.groupName} description = {group.description} members = {group.members} course = {group.course}/>)}
            </div>
        </div>
    );
}

export default Groups;