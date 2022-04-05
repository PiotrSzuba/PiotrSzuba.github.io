import React from 'react';
import { NavLink } from "react-router-dom";
import './groupCardView.scss';

const GroupCardView = (props) => {

    const studentsList = props.members.map((student) => 
        <div key={student.id} >{student}</div>
    );

    const href = "/MessageGroupPage/" + props.id;

    return(
        <div className='card-container'>
            <NavLink className = 'navlink-stripper' to = {href}>
                <div className='card-title'>{props.groupName} is looking for members for {props.course}</div>
                <div className='card-description'>
                    {props.description}
                </div>
                <div className='card-divider'></div>
                <div className='card-groups'>
                    {studentsList}
            </div>
            </NavLink>
        </div>
    );
}

export default GroupCardView;