import React from 'react';
import './personCardView.scss';

const PersonCardView = (props) => {

    const studentsGroupsList = props.groups.map((group) =>  
        <li key={group.id}>{group}</li>  
    );

    const studentsTagsList = props.tags.map((tag) => 
        <div key={tag.id} className='card-tag'>{tag}</div>
    );

    return(
        <div className='card-container'>
            <div className='card-title'>{props.name} is looking for these groups</div>
            <div className='card-groups'>
                {studentsGroupsList}
            </div>
            <div className='card-divider'></div>
            <div className='card-description'>
                {props.description}
            </div>
            <div className='card-divider'></div>
            <div className='card-tags'>
                {studentsTagsList}
            </div>
        </div>
    );
}

export default PersonCardView;