import React from 'react';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Tabs extends React.Component {
  
    render() {
    const { links, resetPaginationAndSearch } = this.props

    const navItem = links.map((link, index) => {
            return(
                <NavItem key={index}>
                    <NavLink 
                        tag={RRNavLink} 
                        activeClassName="active" 
                        to={link.url} 
                        onClick={()=>{
                            resetPaginationAndSearch && resetPaginationAndSearch()
                        }}
                    >
                        {link.text}{link.notif > 0 && <Badge color="danger ml-2">{link.notif}</Badge>}
                    </NavLink>
                </NavItem>
            )
        })

    return (
      <div>
        <Nav tabs>
            {navItem}
            {
                this.props.children
            }
        </Nav>
      </div>
    );
  }
}

export default Tabs
