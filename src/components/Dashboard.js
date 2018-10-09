import React, { Component } from 'react';
import Banner from './Banner';
import Area from './Area.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: [
                {
                    amt:2400,
                    name:"Page A",
                    pv:2400,
                    uv:4000
                },
                {
                    amt:2210,
                    name:"Page B",
                    pv:1398,
                    uv:3000
                },
                {
                    amt:2290,
                    name:"Page C",
                    pv:9800,
                    uv:2000
                },
                {
                    amt:2000,
                    name:"Page D",
                    pv:3908,
                    uv:2780
                },
                {
                    amt:2181,
                    name:"Page E",
                    pv:4800,
                    uv:1890
                },
                {
                    amt:2400,
                    name:"Page F",
                    pv:2400,
                    uv:4000
                }
            ]
        }
        this.repopulate = this.repopulate.bind(this)
    }

    repopulate () {
        const { items } = this.state

        const newArray = items.map(items => {
            return {
                ...items,
                pv: this.random(10000, 2000),
                uv: this.random(10000, 2000)
            }
        })

        this.setState({
            items: newArray
        })
    }

    random (num, base = 1) {
        return Math.floor(Math.random() * num) + base
    }
    
    render() {
        return (
            <div>
                <Banner 
                    header="Dashboard"
                    contents="Sample charts. See http://recharts.org/" 
                />
                <Area data={this.state.items} repopulate={this.repopulate}/>
            </div>
        );
    }
}

export default Dashboard;