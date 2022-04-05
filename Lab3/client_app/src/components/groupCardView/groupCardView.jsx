import React from 'react';
import './groupCardView.scss';

const GroupCardView = (props) => {

    const studentsList = props.members.map((student) => 
        <div key={student.id} >{student}</div>
    );

    return(
        <div className='card-container'>
            <div className='card-title'>{props.groupName} is looking for members for {props.course}</div>
            <div className='card-description'>
                {props.description}
            </div>
            <div className='card-divider'></div>
            <div className='card-groups'>
                {studentsList}
            </div>
        </div>
    );
}

export default GroupCardView;