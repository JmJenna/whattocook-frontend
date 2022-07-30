import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import {Nav, Navbar, Container} from 'react-bootstrap';
import { GiCook } from "react-icons/gi";
import { Link  } from "react-router-dom";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

 function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
            <Nav className="text-center">               
                <Nav.Item>
                    <Nav.Link href="/myrecipe">My recipe</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to="/" onClick={logout}>
                    Log out {currentUser.first_name || currentUser.username}
                  </Link>
                </Nav.Item>
            </Nav>                      

    );
  }

  function loggedOutNav() {
    return (
              <Nav className="text-center">               
                  <Nav.Item>
                      <Nav.Link href="/login">Log in</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link href="/signup">Sing up</Nav.Link>
                  </Nav.Item>
              </Nav>                      
    );
  }

  return (
        <div>            
        <Navbar collapseOnSelect expand="lg" bg="light" className="fs-5">
        <Container>    
                <Nav className="fs-2">
                  <Navbar.Brand href="/"><GiCook/> WhatToCook</Navbar.Brand>
                </Nav>     
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">  
                {currentUser ? loggedInNav() : loggedOutNav()}              
                </Navbar.Collapse>
        </Container>        
        </Navbar>                
    </div>
  );
}

export default Navigation;
