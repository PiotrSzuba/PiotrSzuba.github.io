import React, { useState, useContext, useEffect } from 'react';
import PersonCardView from '../components/personCardView';
import axios from 'axios';
import { userContext } from './../contexts/usersContext';

const Home = () => {

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/home.json').then(response => {
            const resGroups = response.data;
            let localList = JSON.parse(localStorage.getItem("studentsList"));
            if(localList === null || resGroups.length > localList.length){
                setFilteredStudents(resGroups);
                setStudents(resGroups);
                localStorage.setItem("studentsList", JSON.stringify(resGroups));
                return;
            }
            setFilteredStudents(localList);
            setStudents(localList);
        });
      }, []);

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
                for(let j = 0; j < filteredStudents[i].courses.length; j++){
                    if(filteredStudents[i].courses[j].toLocaleLowerCase().includes(courseFilter.toLocaleLowerCase())){
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

    document.title = "Lab4 - Home";

    return (
        <div className="main-container">
            <div className="sub-container">
                <button className="btn-red-full mt-8" onClick={() => filterpanel()}>{filterName}</button>
                {filter && 
                    <div>
                        <input value={courseFilter} onChange={(event) => handleCourseFilter(event)} type="text" className="input" placeholder="Course name"></input>
                        <input value={descFilter} onChange={(event) => handleDescFilter(event)} type="text" className="input" placeholder="Description"></input>
                        <input value={tagsFilter} onChange={(event) => handleTagsFilter(event)} type="text" className="input" placeholder="Tags"></input>
                        <button className="btn-red-full my-1" onClick={() => filterContent()}>Filter</button>
                        <button className="btn-red-full my-1" onClick={() => clearFilterContent()}>Clear</button>
                    </div>
                }
            </div>
            <div>

              { filteredStudents.map((student, index) => 
                <PersonCardView key = {index} id = {index} fullname = {student.fullname} 
                    email={student.email} description = {student.description} courses = {student.courses} 
                    tags = {student.tags} text = {"is looking for these groups"} image={student.image}/>
              )}
            </div>
        </div>
    );
}

export default Home;