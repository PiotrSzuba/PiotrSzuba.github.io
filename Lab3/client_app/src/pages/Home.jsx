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
        "TypeScript", "Ruby", "Beer",

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

    const amount = [1,2,3,4];

    const [students, setStudents] = useState(amount);

    const studentsList = students.map((student) => 
        <PersonCardView key={student.id} name = {generateName()} description = {generateDescription()} groups = {generateRandomArray(groups)} tags = {generateRandomArray(tagsList)}/>
    );

    return (
        <div className="container ">
            <div>
                <button className = 'button'>Filter results</button>
            </div>
            <div>
                {studentsList}
            </div>
        </div>
    );
}

export default Home;