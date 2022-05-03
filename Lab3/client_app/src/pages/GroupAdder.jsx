import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { userContext } from './../contexts/usersContext';

export default class GroupAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [],visible: false,errorMessage: "",groupName: "",desc: "",membersString: "",membersList: "",members: [],course: ""};
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleMembersChange = this.handleMembersChange.bind(this);
        this.handleCoursesChange = this.handleCoursesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveData = this.saveData.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.sendError = this.sendError.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    static contextType = userContext;

    componentDidMount() {
        axios.get('http://localhost:3000/users.json').then(response => {
            const persons = response.data;
            this.setState({users: persons});
        });
    }
    
    componentDidUpdate() {

    }

    handleNameChange(event) {
        this.setState({groupName: event.target.value});
    }

    handleDescChange(event) {
        this.setState({desc: event.target.value});
    }

    handleMembersChange(event) {
        this.setState({membersString: event.target.value});
        this.setState({membersList: event.target.value.split(";")}); 
    }

    handleCoursesChange(event) {
        this.setState({course: event.target.value});
    }

    getUsers(){
        let finalMembers = [];
        const temp = JSON.parse(this.context[0]);
        finalMembers.push({fullname: temp.fullname, email: temp.email, tags: temp.tags});

        for(let  i = 0; i < this.state.membersList.length; i++){
            for(let j = 0; j < this.state.users.length; j++){
                if(temp.email !== this.state.users[j].email && this.state.membersList[i].replace( /\s/g, '') === this.state.users[j].email){
                    finalMembers.push({fullname: this.state.users[j].fullname, email: this.state.users[j].email, tags: this.state.users[j].tags});
                    break;
                }
            }
        }

        return finalMembers;
    }

    saveData(){
        let tempList = JSON.parse(localStorage.getItem("groupsList"));
        let newId = tempList.length + 1;
        tempList.push({id: newId, groupName: this.state.groupName, description: this.state.desc, members: this.getUsers(), course: this.state.course});
        localStorage.setItem("groupsList", JSON.stringify(tempList));
    }

    sendError(){
        this.setState({visible: true});
        setTimeout(() => {
            this.setState({visible: false});
          }, 2000);
    }

    validateInput(){
        if(this.state.groupName.length === 0){
            this.setState({errorMessage: "Fullname field cannot be emptyty"});
            this.sendError();
            return false;
        }
        if(this.state.desc.length === 0){
            this.setState({errorMessage: "Description field cannot be empty"});
            this.sendError();
            return false;
        }
        for(let  i = 0; i < this.state.membersList.length; i++){
            let found = false;
            for(let j = 0; j < this.state.users.length; j++){
                if(this.state.membersList[i].replace( /\s/g, '') === this.state.users[j].email){
                    found = true;
                    break;
                }
            }
            if(!found){
                this.setState({errorMessage: "Email: \"" + this.state.membersList[i] + "\" is not in database"});
                this.sendError();
                return false;
            }
        }
        if(this.state.course.length === 0){
            this.setState({errorMessage: "Course field cannot be empty"});
            this.sendError();
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        const temp = this.context[0];
        if(!temp){
            this.setState({errorMessage: "You need to log in !"});
            this.sendError();
            return;
        }
        if(!this.validateInput()){
            return;
        }
        this.saveData();
        this.setState({errorMessage: "Sukcess !"});
        this.sendError();
        this.setState({groupName: "",desc: "",membersString: "",membersList: "",members: [],course: ""});
    }


    render() {
        document.title = "Lab4 - GroupAdder";
        return (
            <div className="main-container">
                <div className="sub-container">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Group name" type="text" className="input" value={this.state.groupName} onChange={this.handleNameChange} />
                        <input placeholder="Description" type="text" className="input" value={this.state.desc} onChange={this.handleDescChange} />
                        <input placeholder="Emails of members seperate with ; example: email1;email2" type="text" className="input" value={this.state.membersString} onChange={this.handleMembersChange} />
                        <input placeholder="Course" type="text" className="input" value={this.state.course} onChange={this.handleCoursesChange} />
                        <input className="btn-red-full mt-1" type="submit" value="Submit" />
                    </form>
                    {this.state.visible && 
                        <div className='message error'>
                            {this.state.errorMessage}
                        </div>
                    }
                </div>
            </div>
        );
    }
}