import React from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import {addGroup} from "../firebase/group";
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
        this.getEmails = this.getEmails.bind(this);
        this.sendError = this.sendError.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    static contextType = userContext;

    componentDidMount() {

    }
    
    componentDidUpdate() {

    }

    getBase64(url){
        return axios.get(url, {responseType: 'arraybuffer'})
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
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

    getEmails(){
        return this.state.membersString.split(";");
    }

    async saveData(){
        const res = await this.getBase64('https://picsum.photos/200/300');
        if(res.length){
            addGroup({groupName: this.state.groupName, description: this.state.desc, members: this.getEmails(), 
                course: this.state.course, email:this.context[0].email, image: "data:image/png;base64, " + res});
        }
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
        if(this.state.membersList.length === 0){
            this.setState({errorMessage: "Emails field cannot be empty"});
            this.sendError();
            return false;
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
        const user = this.context[0];
        if(!user){
            this.setState({errorMessage: "You need to log in !"});
            this.sendError();
            return;
        }
        if(!this.validateInput()){
            return;
        }
        this.saveData().then(res => {
            this.setState({errorMessage: "Success !"});
            this.sendError();
            this.setState({groupName: "",desc: "",membersString: "",membersList: "",members: [],course: ""});
        });
    }


    render() {
        document.title = "Lab4 - GroupAdder";
        return (
            <div className="main-container">
                <div className="sub-container">
                    {this.context[0] && <>
                    <div className='text-3xl my-4 font-semibold text-black-300 w-full text-center'> Add new group</div>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Group name" type="text" className="input" value={this.state.groupName} onChange={this.handleNameChange} />
                        <input placeholder="Description" type="text" className="input" value={this.state.desc} onChange={this.handleDescChange} />
                        <input placeholder="Emails of members seperate with ; example: email1;email2" type="text" className="input" value={this.state.membersString} onChange={this.handleMembersChange} />
                        <input placeholder="Course" type="text" className="input" value={this.state.course} onChange={this.handleCoursesChange} />
                        <input className="btn-red-full mt-1" type="submit" value="Submit" />
                    </form>
                    </>}
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