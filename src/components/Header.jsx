import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Container, 
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarItem,
  NavbarEnd,
  NavbarLink,
  Title } from 'bloomer'

const AppFooter = props => {
  return (
    <header>
      <Container>
        <Navbar>
          <NavbarBrand>
            <NavbarItem>
              <Link to="/"><Title isSize="2">{ process.env.REACT_APP_TITLE }</Title></Link>
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarStart>              
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem>
                <Link to="/about">About</Link>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>        
      </Container>
    </header>
  )
}

export default AppFooter