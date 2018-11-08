import React, { Component } from 'react'
import Banner from '../Banner'
import { Container } from 'reactstrap'
import Tabs from '../Tabs'
import { Route, Redirect, Switch } from 'react-router-dom'
import Feedback from './Feedback'
import Report from './Report'
import ViewFeedback from './ViewFeedback'


class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            pagination: {
                offset: 0,
                limit: 10
            },
            search: ''
        }
        this.resetPaginationAndSearch = this.resetPaginationAndSearch.bind(this) 
        this.updateQuery = this.updateQuery.bind(this) 
    
    }
    resetPaginationAndSearch () {
        this.setState(()=>({
            pagination: {
                offset: 0,
                limit: 10
            },
            searchQ: ''
        }))
    }

    updateQuery(paginationData, searchQData){
        // if there is NO inputed in search box the searchData from parent component will remain
        // else searchData will update and it will pass 0 to offset to search all the data
        this.setState((prevState)=>({
            searchQ: (typeof searchQData !== 'undefined') ? searchQData.trim() : prevState.searchQ,
            pagination: paginationData ? {...paginationData} : (typeof searchQData !== 'undefined')
                ? {...prevState.pagination, offset: 0} : prevState.pagination 
        }))
    }

    render() {
        const { pagination, searchQ } = this.state

        const tabs = [
            {'text': 'Feedback', 'url': '/notif/feedback', 'notif': 0},
            {'text': 'Report', 'url': '/notif/report', 'notif': 0},
        ]
        return (
            <div>
                <Banner 
                    header="Notification"
                    contents="List of feedbacks, Reports of Users." 
                />
                <Container>
                    <Tabs links={tabs} resetPaginationAndSearch={this.resetPaginationAndSearch} />
                    <Switch>
                        <Route exact path="/notif/feedback" render={()=>(
                            <Feedback updateQuery={this.updateQuery} searchQ={searchQ} pagination={pagination} />
                        )} />
                        <Route path="/notif/report" render={()=>(
                            <Report updateQuery={this.updateQuery} searchQ={searchQ} pagination={pagination}/>
                        )} />
                        <Route path="/notif/feedback/view/:id" component={ ViewFeedback } />
                        <Route render={()=>(
                            <Redirect to="/notif/feedback" />
                        )}/>
                    </Switch>
                </Container>
            </div>
        )
  }
}

export default Notification