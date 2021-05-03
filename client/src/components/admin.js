import axios from 'axios';
import React from 'react';
import NAVBAR from './Navbar';
import {useHistory, Link} from 'react-router-dom';
import SIDENAV from './Sidenav';
import {Col, Button, Container, Row} from 'react-bootstrap';



export default function Admin(){
    

    return(
        <div>
        <NAVBAR />
        <Container fluid>
            <div className="mr-auto mt-3 col-md-3">
                <Link to="/register"><Button>REGISTER STUDENT</Button></Link>
            </div>
            <div className="mr-auto mt-3 col-md-3">
                <Link to="/users"><Button>LIST ALL USERS</Button></Link>
            </div>
        </Container>
        </div>
        
    )
}