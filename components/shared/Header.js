import React from 'react';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import auth0Client from '../../services/auth0'

const BootstrapNavLink = (props) => {
  const { route, title } = props;
  const className = props.className || "";
  return (
    <ActiveLink route={route} classActiveName='active'>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  )
}

const LoginBtn = () => {
  return (
    <span onClick={auth0Client.login} className="nav-link port-navbar-link clickable">Login</span>
  )
}

const LogoutBtn = () => {
  return (
    <span onClick={auth0Client.logout} className="nav-link port-navbar-link clickable">Logout</span>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isBlogMenuOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleBlogMenu = () => {
    this.setState({
      isBlogMenuOpen: !this.state.isBlogMenuOpen
    });
  }

  renderBlogMenu() {
    const { isSiteOwner } = this.props;
    if (isSiteOwner) {
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.isBlogMenuOpen} toggle={this.toggleBlogMenu}>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BootstrapNavLink className="port-dropdown-item"
                route="/blogs"
                title="Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BootstrapNavLink className="port-dropdown-item"
                route="/blogs/new"
                title="Create a Blog" />
            </DropdownItem>
            <DropdownItem>
              <BootstrapNavLink className="port-dropdown-item"
                route="/blogs/dashboard"
                title="Blogs Dashboard" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    } else {
      return (
        <NavItem className="port-navbar-item">
          <BootstrapNavLink route='/blogs' title='Blog' />
        </NavItem>
      )
    }
  }

  render() {
    const { isAuthenticated, className } = this.props
    return (
      <div>
        <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">PhungNV</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/' title='Home' />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/about' title='About' />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/portfolios' title='Portfolio' />
              </NavItem>
              {this.renderBlogMenu()}
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/cv' title='CV' />
              </NavItem>
              {
                !isAuthenticated ?
                  <NavItem className="port-navbar-item">
                    <LoginBtn />
                  </NavItem>
                  :
                  <NavItem className="port-navbar-item">
                    <LogoutBtn />
                  </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}