import React from 'react';
import { NavLink } from "react-router-dom";
import {VscBookmark} from 'react-icons/vsc';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';

const GroupCardView = (props) => {

    const studentsList = props.members.map((student,index) => 
        <div key={index}>
            {student.fullname}: 
            {student.tags.map( (tag,index) => " " + tag + ",")}
        </div>
    );

    const href = "/MessageGroupPage/" + props.id;

    const getBase64 = (url) => {
        return axios.get(url, {responseType: 'arraybuffer'})
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
    }

    const [bookmark, setBookmark] = useState(props.bookmark);
    const [image, setImage] = useState(props.image);

    useEffect(async () => {
        if(!props.image.length)
        {   
            console.log("wchodzi");
            const res = await getBase64('https://picsum.photos/200/300');
            setImage("data:image/png;base64, " + res);
            let tempList = JSON.parse(localStorage.getItem("groupsList"));
            if(res.length)
            {
                tempList[props.id] = {id: props.id + 1,groupName: props.groupName,
                                    description: props.description,members: props.members,
                                    course: props.course,image: "data:image/png;base64, " + res};
                localStorage.setItem("groupsList", JSON.stringify(tempList));
            }
        }
      }, []);

    return(
        <div className='m-auto w-4/5'>
            <div onClick = {() => setBookmark(!bookmark)} className="cursor-pointer flex flex-row-reverse">
                { !bookmark &&
                <div className="relative top-8 right-1 text-white-600">
                    <VscBookmark />
                </div>
                }
                { bookmark &&
                <div className="relative top-8 right-1 text-red-500">
                    <VscBookmark />
                </div>
                }
            </div>
            <div className='card-container'>
                <NavLink className = 'navlink-stripper' to = {href}>
                    <div className="card-photo-title-container">
                        <img className = "card-photo" alt = "No content" src={image}/>
                        <div className="flex flex-col sm:mt-8">
                        <div className='card-title'>{props.groupName} is looking for members for {props.course}</div>
                        </div>
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-description'>
                        {props.description}
                    </div>
                    <div className='card-divider'></div>
                    <div className='card-groups'>
                    {studentsList}
                </div>
                </NavLink>
            </div>
        </div>
    );
}

export default GroupCardView;