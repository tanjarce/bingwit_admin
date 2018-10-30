import React, { Component, Fragment } from 'react'
import { Container, Form, InputGroupAddon, InputGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import * as Help from '../../toastify/helpers'


import * as API from '../../services/API'
import moment from 'moment'



class ViewFeedback extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            area: {},
            users: [],
            areaInput: ''
        }
        this.goBack = this.goBack.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getAreaAndUsers = this.getAreaAndUsers.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    handleChange (e) {
        const value = e.target.value
        this.setState((prevState)=>({
            areaInput: value 
        }))
    }
    handleSubmit (e) {
        e.preventDefault()
        const { areaInput } = this.state

        if(areaInput.trim() !== ''){
            const id = this.props.match.params.id
            API.updateArea(id, areaInput)
                .then(res => {
                    if(res.success){
                        this.getAreaAndUsers()
                        Help.toastPop({message: 'Changes Saved!', type: 'success'})
                        this.toggleEdit()
                    }
                }).catch(err => console.log(err))
        }
    }

    toggleEdit () {
        // console.log('edit')
        this.setState((prevState)=> ({
            edit: !prevState.edit
        }), ()=>{
            console.log(this.state.edit)
        })
    }

    goBack (){
        this.props.history.goBack()
    }

    getAreaAndUsers(){
        const id = this.props.match.params.id

        API.getAreasAndUsers(id)
            .then(res => {
                if(res.success){
                    console.log(res)
                    this.setState(()=>({
                        area: {
                            area_address: res.area.area_address,
                            createdAt: res.area.createdAt
                        },
                        users: res.area.user || [],
                        areaInput: res.area.area_address
                    }), ()=> {
                        console.log(this.state)
                    })
                }
            }).catch(err => console.log(err))
    }
    
    componentDidMount(){
       this.getAreaAndUsers()
    }
    render(){
        const { edit, area: { area_address, createdAt }, users, areaInput } = this.state
        // console.log(this.state)
        const userList = (users.length) 
            ? users.map(user => 
                (<li key={user.id}>
                    <Link to={`/mnguser/${user.id}`} >
                        {user.full_name}
                    </Link>
                </li>))
            : <li><a>No users in this area.</a></li>

        return(
            <Fragment>
                <button onClick={this.goBack} >back</button>
                <div>
                    {
                        (edit)
                        ?(  <React.Fragment>
                                <Form onSubmit={this.handleSubmit}>
                                    <InputGroup>
                                        <Input 
                                            name="areaInput"
                                            onChange={this.handleChange}    
                                            defaultValue={areaInput}
                                        />
                                        <InputGroupAddon addonType="append"><Button color="primary">Add Area</Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button type="button" color="secondary" onClick={this.toggleEdit}>Cancel</Button></InputGroupAddon>
                                    </InputGroup>
                                </Form>
                                {/* <button onClick={this.toggleEdit}>Save</button> */}
                            </React.Fragment>
                        )
                        :(  <React.Fragment>
                                <h4>{area_address}</h4>
                                <button onClick={this.toggleEdit}>edit</button>
                            </React.Fragment>
                        )
                    }

                </div>    
                <p>Created: {moment(createdAt).format('MMMM D, YYYY')}</p>
                <h6>Users in this Area:</h6>
                <ul>
                    {userList}
                </ul>
            </Fragment>
        )
    }
}

export default ViewFeedback 