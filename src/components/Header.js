import React from 'react'
import {Container, Navbar} from 'react-bootstrap';
import "../css/header.css"

function Header() {
  return (
    <Navbar className='header mb-5' expand="lg" variant="light" bg="light">
      <Container>
      <Navbar.Brand href="#" className='mx-auto'><img src='assets/skygoal-Logo 2.png' width={80} /></Navbar.Brand>
      </Container>
      
   
  </Navbar>
  )
}

export default Header