import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
class SidebarItemLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            boole : true
        }
    }
    render() {
        const { boole } = this.state;
        const { menu , didNavigate, notif } = this.props 
        return (
            <li>
                <NavLink to={menu.url} activeClassName="active" onClick={didNavigate}>
                    <i className='fa'
                        title={menu.title}>
                        {menu.src}
                        {boole && <div>
                        {notif && 
                        <div style={{
                                position : 'absolute',
                                borderRadius : '50%',
                                backgroundColor : 'red',
                                height : '10px',
                                width : '10px',
                                right : '20%',
                                bottom : '20%'
                        }}/>
                        }</div>
                        }                        
                    </i>
                    <span className="nav-text">
                        {menu.title}
                    </span>
                </NavLink>
            </li>
        );
    }
}

export default SidebarItemLink;