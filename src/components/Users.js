import React, { Component } from 'react'
import { Jumbotron, Container, Button, Row, Col } from 'reactstrap'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { InputGroup, Input, InputGroupAddon} from 'reactstrap'
import ReactTable from 'react-table'
import MoreAction from 'react-icons/lib/fa/ellipsis-v';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as API from '../services/API';

import UserModal from '../modals/UserModal';
import UserDeleteModal from '../modals/UserDeleteModal';

// React table ref: https://react-table.js.org/#/story/readme

// const REG_EX_EMAIL = "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
const REG_EX_EMAIL = "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/"

const REG_EX_NO_SPCLCHAR = "^[A-Za-z0-9]+$"

const MIN_CHAR = 4
const MAX_CHAR = 32

const MESSAGE_NO_SPCLCHAR = "must be composed only with letter and numbers"
const MESSAGE_EMAIL = "must be valid"
const MESSAGE_MIN_CHAR = `must be between ${MIN_CHAR} and ${MAX_CHAR} characters`

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userData: {},
            deleteUserData: {},
            modalMode: "CREATE",
            loading: false,
            isDeleteModalOpen: false,
            isUserModalOpen: false,
            query: "",
            userModalTitle: "",
            noDataText: 'No data available.',
            columns: [
                {
                    Header: "Name",
                    headerClassName: 'text-left',
                    accessor: "fullName"
                },
                {
                    Header: "Username",
                    headerClassName: 'text-left',
                    accessor: "username"
                },
                {
                    Header: "Action",
                    width: 65,
                    className: 'text-center',
                    Cell: row => (
                        <UncontrolledButtonDropdown
                            style={{
                                position: "static" // Temporary fix 
                            }}>
                            <DropdownToggle size="sm">
                                <MoreAction/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem header>User actions</DropdownItem>
                                <DropdownItem 
                                    onClick={() => {
                                        this.changeKeyValue("userModalTitle", "Update User")
                                        this.changeKeyValue("userData", row.original) // container user data
                                        this.changeKeyValue("modalMode", "UPDATE")
                                        this.changeKeyValue("isUserModalOpen") // toggle delete modal
                                    }}
                                >
                                    Update
                                </DropdownItem>
                                <DropdownItem 
                                    onClick={() => {
                                        // this.setState({deletUserData: row.original})
                                        this.changeKeyValue("deleteUserData", row.original) // container user data
                                        this.changeKeyValue("isDeleteModalOpen") // toggle delete modal
                                    }}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    )
                }
            ],
            fields: [
                {
                    title: "Basic",
                    inputs: [
                        {
                            name: "username",
                            label: "Username*",
                            type: "text",
                            isRequired: true,
                            validators: {
                                required: {value: true, errorMessage: "Please enter your username"},
                                pattern: {value: REG_EX_NO_SPCLCHAR, errorMessage: `Your username ${MESSAGE_NO_SPCLCHAR}`},
                                minLength: {value: MIN_CHAR, errorMessage: `Your username ${MESSAGE_MIN_CHAR}`},
                                maxLength: {value: MAX_CHAR, errorMessage: `Your username ${MESSAGE_MIN_CHAR}`}
                            }
                        },
                        {
                            name: "emailAddress",
                            label: "Email*",
                            type: "text",
                            isRequired: true,
                            validators: {
                                required: {value: true, errorMessage: "Please enter your email"},
                                pattern: {value: REG_EX_EMAIL, errorMessage: `Your email ${MESSAGE_EMAIL}`},
                                minLength: {value: MIN_CHAR, errorMessage: `Your email ${MESSAGE_MIN_CHAR}`},
                                maxLength: {value: MAX_CHAR, errorMessage: `Your email ${MESSAGE_MIN_CHAR}`}
                            }
                        },
                        {
                            name: "firstName",
                            label: "First Name*",
                            type: "text",
                            isRequired: true,
                            validators: {
                                required: {value: true, errorMessage: "Please enter your first name"},
                                pattern: {value: REG_EX_NO_SPCLCHAR, errorMessage: `Your first name ${MESSAGE_NO_SPCLCHAR}`},
                                minLength: {value: MIN_CHAR, errorMessage: `Your first name ${MESSAGE_MIN_CHAR}`},
                                maxLength: {value: MAX_CHAR, errorMessage: `Your first name ${MESSAGE_MIN_CHAR}`}
                            }
                        },
                        {
                            name: "lastName",
                            label: "Last Name*",
                            type: "text",
                            isRequired: true,
                            validators: {
                                required: {value: true, errorMessage: "Please enter your last name"},
                                pattern: {value: REG_EX_NO_SPCLCHAR, errorMessage: `Your last name ${MESSAGE_NO_SPCLCHAR}`},
                                minLength: {value: MIN_CHAR, errorMessage: `Your last name ${MESSAGE_MIN_CHAR}`},
                                maxLength: {value: MAX_CHAR, errorMessage: `Your last name ${MESSAGE_MIN_CHAR}`}
                            }
                        }
                    ]
                },
                {
                    title: "Security",
                    inputs: [
                        {
                            name: "password",
                            label: "Password",
                            type: "password",
                            isRequired: true,
                            validators: {
                                required: {value: true, errorMessage: "Please enter your password"},
                                minLength: {value: MIN_CHAR, errorMessage: `Your password ${MESSAGE_MIN_CHAR}`},
                                maxLength: {value: MAX_CHAR, errorMessage: `Your password ${MESSAGE_MIN_CHAR}`}
                            }
                        },
                        {
                            name: "confirmPassword",
                            label: "Confirm Password",
                            type: "password",
                            validators: {
                                match:{value:'password', errorMessage: "Passwords doesn't match"}
                            }
                        }
                    ]
                },
                {
                    title: "Contact",
                    inputs: [
                        {
                            name: "contactNumber",
                            label: "Contact Number",
                            type: "text",
                            validators: {
                                number: {value: true, errorMessage: 'Please enter a valid number'},
                                minLength: {value: 11, errorMessage: `Please enter your 11-digit number (e.g 09998887777)`},
                                maxLength: {value: 11, errorMessage: `Please enter your 11-digit number (e.g 09998887777)`}
                            }
                        },
                        {
                            name: "addressLine1",
                            label: "Address Line 1",
                            type: "text",
                        },
                        {
                            name: "addressLine2",
                            label: "Address Line 2",
                            type: "text",
                        },
                        {
                            name: "addressProvince",
                            label: "Province",
                            type: "text",
                        },
                        {
                            name: "addressCity",
                            label: "City",
                            type: "text",
                        }
                    ]
                },
                {
                    title: "Role",
                    inputs: [
                        {
                            name: "roleId",
                            label: "Role",
                            type: "select",
                            isRequired:true,
                            options: [
                                1,
                                2
                            ]
                        }
                    ]
                }
            ]
        }   

        this.responseGetUsers = this.responseGetUsers.bind(this)
        this.selectActionToggled = this.selectActionToggled.bind(this)
        this.toggleLoading = this.toggleLoading.bind(this)
        this.showCreateUserCreateModal = this.showCreateUserCreateModal.bind(this)
        this.fetchUsers = this.fetchUsers.bind(this)
        this.changeKeyValue = this.changeKeyValue.bind(this)

    }
    responseGetUsers (response) {
        this.setState({
            data: response.data.items
        })
    }
    selectActionToggled (user) {
        this.setState({
            userData: user
        })
    }
    toggleLoading (flag) {
        this.setState({loading: flag})
    }
    showCreateUserCreateModal () {
        this.setState((oldState) => ({
            isCreateModalOpen: !oldState.isCreateModalOpen
        }))
    }
    fetchUsers () {
        this.toggleLoading(true)
        API.getAllUsers()
            .then(response => {
                this.toggleLoading(false)
                if (response.errors) return
                this.responseGetUsers(response)
            })
    }
    changeKeyValue (key, value) {
        this.setState((oldState)=>({
            [key]: value || !oldState[key]
        }))
    }
    componentDidMount() {
        this.fetchUsers()
    }
    render() {
        const { data, noDataText, columns, query, loading, userData, fields, userModalTitle, deleteUserData, modalMode } = this.state
        const { isUserModalOpen, isDeleteModalOpen } = this.state // UPDATE CREATE DELETE flags

        let filteredData
        if (query) {
          const match = new RegExp(escapeRegExp(query.trim()), 'i')
          filteredData = data.filter((user) => (match.test(user.fullName) || match.test(user.username)))
        } else {
          filteredData = data
        }
    
        filteredData.sort(sortBy('username'))

        const inputs = fields.reduce((inputs, step) => {
            return {
                ...inputs,
                [step.title]: step.inputs
            }
        }, {})
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">Users</h1>
                        <p className="lead">Create & Manage user permissions and types.</p>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row className="pull-right">   
                        <Col>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Search: </InputGroupAddon>
                                <Input 
                                    name="search"
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        this.setState({query: e.target.value})
                                    }}
                                    placeholder="e.g: John doe"/>
                                <InputGroupAddon addonType="append">
                                    <Button
                                        color="warning"
                                        >   
                                    Search
                                    </Button>
                                    <Button
                                        outline
                                        color="primary"
                                        onClick={
                                            () => {
                                                this.changeKeyValue("userModalTitle", "Create User")
                                                this.changeKeyValue("userData", null)
                                                this.changeKeyValue("modalMode", "CREATE")
                                                this.changeKeyValue("isUserModalOpen")
                                            }
                                        }
                                        >   
                                    + Create User
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    <br/>
                    <ReactTable
                        loading={loading}
                        data={filteredData}
                        noDataText={noDataText}
                        columns={columns}
                        defaultPageSize={10}
                        showPaginationTop={true}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                    />
                </Container>
                <UserModal 
                    size="lg"
                    mode={modalMode}
                    inputs={inputs}
                    modalTitle={userModalTitle}
                    userData={userData}
                    isOpen={isUserModalOpen}
                    onSuccess={this.fetchUsers}
                    toggle={
                        () => {
                            this.changeKeyValue("isUserModalOpen")
                        }
                    }
                />
                <UserDeleteModal
                    size="sm"
                    isOpen={isDeleteModalOpen}
                    userData={deleteUserData}
                    modalTitle="Delete User"
                    modalBody={
                        (
                            <div>
                                <p>Are you sure you want to delete <strong>{deleteUserData.fullName}</strong>?</p>
                                <small className="text-danger">Warning: This action cannot be undone!</small>
                            </div>
                        )
                    }
                    onDeleteUser={this.fetchUsers}
                    toggle={
                        () => {
                            this.changeKeyValue("isDeleteModalOpen")
                        }
                    }
                />
            </div>
        );
    }
}

export default Users;