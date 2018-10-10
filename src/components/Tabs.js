import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'active': 0
    }
    this.activeTab = this.activeTab.bind(this)
  }
  
  activeTab (index) {
    this.setState(()=>({
        'active': index
    }))
  }

  render() {
    const { links } = this.props
    const { active } = this.state;

    const navItem = links.map((link, index) => {
            const stat = (active === index) ? 'active': ''
            return(
                <NavItem key={index}>
                    <NavLink tag={Link} to={link.url} className={stat} onClick={() => { this.activeTab(index) }}>
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
