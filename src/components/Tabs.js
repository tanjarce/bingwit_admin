import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Tabs extends React.Component {
  
    render() {
    const { links } = this.props

    const navItem = links.map((link, index) => {
            return(
                <NavItem key={index}>
                    <NavLink tag={RRNavLink} activeClassName="active" to={link.url} >
                        {link.text}
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
