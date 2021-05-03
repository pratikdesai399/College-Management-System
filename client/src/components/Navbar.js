import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';

export default function NAVBAR(){
    let history = useHistory();

    const logout = ()=>{
        axios.post('http://localhost:5000/logout')
        .then((response)=>{
            
            if(response){
                console.log(response);
                history.push('/login');
            }
        })

    }


    const [role, setRole] = useState("");
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
            //console.log(response);
            if(response.data.loggedIn === true){
                setRole(response.data.user[0].roles);
            }
        })
    }, [])
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">{role}</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
      <Nav.Link eventKey={2} href="#memes">
        <button onClick={logout}>LOG OUT</button>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}

