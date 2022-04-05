import React, { useState } from 'react';
import PersonCardView from '../components/personCardView/personCardView';

const Home = () => {

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

    const tagsList = 
    [
        "C", "C++", "C#",
        "Java", "Python", "F#",
        "PHP", "R", "Dart",
        "Go", "Rust", "JavaScript",
        "TypeScript", "Ruby", "Vue",
        "React","Angular","Beer"

    ];

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

    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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

    const studentList = 
    [
        {name: generateName(),email: "email",description: generateDescription(),groups: generateRandomArray(groups),tags: generateRandomArray(tagsList)},
        {name: generateName(),email: "email",description: generateDescription(),groups: generateRandomArray(groups),tags: generateRandomArray(tagsList)},
    ];

    const getStudentsFromLocal = () => {
        let localList = JSON.parse(localStorage.getItem("studentsList"));

        if(localList == null || localList.length == 0){
            localStorage.setItem("studentsList", JSON.stringify(studentList));

            return studentList;
        }
        //localStorage.setItem("studentsList", JSON.stringify([]));
        return JSON.parse(localStorage.getItem("studentsList")) || [];
    }

    const [students, setStudents] = useState(getStudentsFromLocal());
    const [filteredStudents, setFilteredStudents] = useState(getStudentsFromLocal());
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");

    const filterpanel = () => {
        if(filter){
            setFilter(false);
            setFilterName("Show filters");
            return;
        }
        setFilter(true);
        setFilterName("Hide filters");
    }

    const handleCourseFilter = (event) =>{
        setCourseFilter(event.target.value);
    }

    const handleDescFilter = (event) =>{
        setDescFilter(event.target.value);
    }

    const handleTagsFilter = (event) =>{
        setTagsFilter(event.target.value);
    }

    const filterContent = () => {
        let outputArray = [];
        setFilteredStudents(students);

        if(descFilter.length){
            for(let i = 0; i < filteredStudents.length; i++){
                if(filteredStudents[i].description.toLocaleLowerCase().includes(descFilter.toLocaleLowerCase())){
                    outputArray.push(filteredStudents[i]);
                }
            }
            setFilteredStudents(outputArray);
        }
        outputArray = [];
        if(courseFilter.length){
            for(let i = 0; i < filteredStudents.length; i++){
                for(let j = 0; j < filteredStudents[i].groups.length; j++){
                    if(filteredStudents[i].groups[j].toLocaleLowerCase().includes(courseFilter.toLocaleLowerCase())){
                        outputArray.push(filteredStudents[i]);
                        break;
                    }
                }
            }
            setFilteredStudents(outputArray);
        }

        outputArray = [];
        if(tagsFilter.length){
            for(let i = 0; i < filteredStudents.length; i++){
                for(let j = 0; j < filteredStudents[i].tags.length; j++){
                    if(filteredStudents[i].tags[j].toLocaleLowerCase().includes(tagsFilter.toLocaleLowerCase())){
                        outputArray.push(filteredStudents[i]);
                        break;
                    }
                }
            }
            setFilteredStudents(outputArray);
        }
    }

    const clearFilterContent = () => {
        setFilteredStudents(students);
        setCourseFilter("");
        setDescFilter("");
        setTagsFilter("");
    }

    document.title = "Lab3 - Home";

    return (
        <div className="container ">
            <div className='filter'>
                <button className='button filter-button' onClick={() => filterpanel()}>{filterName}</button>
                {filter && 
                    <div className='filter-inputs'>
                        <input value={courseFilter} onChange={(event) => handleCourseFilter(event)} type="text" class="title-input" placeholder="Course name"></input>
                        <input value={descFilter} onChange={(event) => handleDescFilter(event)} type="text" class="title-input" placeholder="Description"></input>
                        <input value={tagsFilter} onChange={(event) => handleTagsFilter(event)} type="text" class="title-input" placeholder="Tags"></input>
                        <button className='button filter-button' onClick={() => filterContent()}>Filter</button>
                        <button className='button filter-button' onClick={() => clearFilterContent()}>Clear</button>
                    </div>
                }
            </div>
            <div>

              { filteredStudents.map((student, index) => 
                <PersonCardView key = {student.id} id = {index} name = {student.name} description = {student.description} groups = {student.groups} tags = {student.tags}/>)}
            </div>
        </div>
    );
}

export default Home;