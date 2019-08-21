import React from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const BootstrapNavLink = (props) => {
  const { route, title } = props;
  return (
    <Link href={route}>
      <a className='nav-link port-navbar-link'>{title}</a>
    </Link>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
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
                <BootstrapNavLink route='/portfolio' title='Portfolio' />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/blogs' title='Blog' />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BootstrapNavLink route='/cv' title='CV' />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}