import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../components/admin';
import Student from '../components/student';
import Teacher from '../components/teacher';


export default function Main(){

    

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
        <div>
            {!role &&(
                <h1>YOU ARE NOT LOGGED IN</h1>
            )}
            {role == 'admin' && (
                <Admin role={role} />
            )}
            {role == 'student' && (
                <Student />
            )}
            {role == 'teacher' && (
                <Teacher />
            )}
            
        </div>
    )
}