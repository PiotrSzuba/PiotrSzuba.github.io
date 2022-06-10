import React, { useState, useEffect } from 'react';
import PersonCardView from '../components/personCardView';
import '../styles/index.css'
import { getAllAdverts } from '../firebase/advert';

const Home = () => {

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState(false);
    const [filterName, setFilterName] = useState("Show filters");
    const [courseFilter,setCourseFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");

    useEffect(() => {
        getAllAdverts().then(res => {
            setFilteredStudents(res);
            setStudents(res);
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
                if(filteredStudents[i].content.description.toLocaleLowerCase().includes(descFilter.toLocaleLowerCase())){
                    outputArray.push(filteredStudents[i]);
                }
            }
            setFilteredStudents(outputArray);
        }
        outputArray = [];
        if(courseFilter.length){
            for(let i = 0; i < filteredStudents.length; i++){
                for(let j = 0; j < filteredStudents[i].content.courses.length; j++){
                    if(filteredStudents[i].content.courses[j].toLocaleLowerCase().includes(courseFilter.toLocaleLowerCase())){
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
                for(let j = 0; j < filteredStudents[i].content.tags.length; j++){
                    if(filteredStudents[i].content.tags[j].toLocaleLowerCase().includes(tagsFilter.toLocaleLowerCase())){
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
            <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> Adverts</div>
                <button className="btn-red-full mt-4" onClick={() => filterpanel()}>{filterName}</button>
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
                <PersonCardView key = {index} uid = {student.uid} fullname = {student.content.fullname} 
                    email={student.content.email} description = {student.content.description} courses = {student.content.courses} 
                    tags = {student.content.tags} text = {"is looking for these groups"} image={student.content.image} />
              )}
            </div>
        </div>
    );
}

export default Home;