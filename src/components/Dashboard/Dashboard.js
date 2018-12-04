import React, { Component, Fragment } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Route, Switch, withRouter } from 'react-router-dom'

import Banner from '../Banner';
import DashUser from './DashUser'
import DashTopList from './DashTopList'
import DashTransaction from './DashTransaction'
import DashExpandView from './DashExpandView'
import * as API from '../../services/API'

import moment from 'moment'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateToplist: {
                start: moment().startOf('month').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD')
            },
            areaOptions: []
        }
        this.expand = this.expand.bind(this)
        this.setDate = this.setDate.bind(this)
    }

    componentDidMount(){
        this.getAllArea()
    }

    getAllArea(data){
        const search = {
            offset: 0,
            limit: '',
            searchQ: data            
        }

        API.getAllAreas(search)
            .then((res) => {
                if(res.success){
                    // console.log(res.area.rows)
                    const areaOptions = res.area.rows.map((area)=>{
                        return ({
                            value: area.id,
                            label: area.area_address
                        })
                    })
                    this.setState(()=>({
                        areaOptions
                    }))
                }
            })
    }

    setDate (start, end) {
        this.setState(()=>({
            dateToplist: {
                start,
                end
            }
        }))
    }

    expand(type){
        const { location: { pathname } } = this.props
        this.props.history.push(`${pathname}/${type}_expand`)
    }
    
    render() {
        const { dateToplist, areaOptions } = this.state
        // console.log(moment().format('WW'))
        return (
            <div className='bottom-pad'>
                <Banner 
                    header="Dashboard"
                    contents={moment().format('MMMM D, YYYY')} 
                />
                <Container>
                    <Switch>
                        <Route exact path="/dashboard" render={()=>(
                            <Fragment>
                                <DashTransaction areaOptions={areaOptions}/>
                                <DashUser areaOptions={areaOptions}/>
                                <DashTopList expand={this.expand} setDate={this.setDate} dateToplist={dateToplist}/>
                            </Fragment>
                        )}/>
                        <Route exact path="/dashboard/:type" render={ ()=> <DashExpandView dateToplist={dateToplist} /> } />
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(Dashboard);