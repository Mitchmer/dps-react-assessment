import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavBar extends Component {
  activeItem = (navPath) => {
    return navPath === this.props.location.pathname;
  }

  render() {
    return (
      <div>
        <Menu pointing>
          <Link to='/'>
            <Menu.Item name='home' active={this.activeItem('/')} />
          </Link>
          <Link to='/beers'>
            <Menu.Item name='beers' />
          </Link>
          <Link to='/breweries'>
            <Menu.Item name='breweries' />
          </Link>
          <Menu.Menu position='right'>
            <Link to='/'>
              <Menu.Item name='DPS Assessment' />
            </Link>
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}

export default withRouter(NavBar);
