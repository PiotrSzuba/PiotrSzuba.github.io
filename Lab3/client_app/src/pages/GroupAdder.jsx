import React, { useState } from 'react';
import '../styles/index.scss'

export default class GroupAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {groupName: "",desc: "",members: "",membersList: "",course: ""};
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleMembersChange = this.handleMembersChange.bind(this);
        this.handleCoursesChange = this.handleCoursesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    
    handleNameChange(event) {
        this.setState({groupName: event.target.value});
    }

    handleDescChange(event) {
        this.setState({desc: event.target.value});
    }

    handleMembersChange(event) {
        this.setState({members: event.target.value});
        this.setState({membersList: event.target.value.split(";")});
        
    }

    handleCoursesChange(event) {
        this.setState({course: event.target.value});
    }

    saveData(){
        let tempList = JSON.parse(localStorage.getItem("groupsList"));
        tempList.push({groupName: this.state.groupName,description: this.state.desc,members: this.state.membersList,course: this.state.course});

        localStorage.setItem("groupsList", JSON.stringify(tempList));
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.saveData();

        this.setState({groupName: "", desc: "", members: "", membersList: "",course: ""});
    }


    render() {
        document.title = "Lab3 - GroupAdder";
        return (
            <div class="container ">
                <div class="adder-container">
                    <div class="filter-inputs">
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="Group name" type="text" class="title-input" value={this.state.groupName} onChange={this.handleNameChange} />
                            <input placeholder="Description" type="text" class="title-input" value={this.state.desc} onChange={this.handleDescChange} />
                            <input placeholder="Members seperate with ; example: member1;member2" type="text" class="title-input" value={this.state.members} onChange={this.handleMembersChange} />
                            <input placeholder="Course" type="text" class="title-input" value={this.state.course} onChange={this.handleCoursesChange} />
                            <div class="submit-container">
                                <input class='submit-button filter-button' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}