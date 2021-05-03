import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../components/admin';
import Student from '../components/student';
import Teacher from '../components/teacher';
import NAVBAR from './Navbar';
import { Button } from 'react-bootstrap';


export default function USERS(){

    axios.defaults.withCredentials = true;

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

    const listU = () =>{
        axios.get('http://localhost:5000/listUsers')
    .then((response)=>{
        //console.log(response.data);
        response.data.map((item, index)=>{
            console.log(item);
        })
        

    })
    }


    return (
        <div>
            {role != 'admin' && (
                <h1>YOU ARE NOT AUTHORISED TO ACCESS THIS PAGE</h1>
            )}
            {role == 'admin' && (
                <div>
                    <NAVBAR />
                    <diV className="container">
                        <Button onClick={listU}>LIST</Button>
                        <table className="table table-dark table-striped mt-3">
                            <tr>
                                <td>ID</td>
                                <td>NAME</td>
                                <td>USERNAME</td>
                                <td>ROLE</td>
                            </tr>
                        </table>
                    </diV>
                    
                    
                </div>
                
                
            )}
            
            
        </div>
    )
}