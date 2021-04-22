
import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';




function Register(){
    
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordeReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");

    const [role, setRole] = useState("");

    let history = useHistory();


    axios.defaults.withCredentials = true;

    const register =()=>{
        axios.post('http://localhost:5000/register', {username : usernameReg, password: passwordeReg, role: roleReg})
        .then((response)=>{
            console.log(response);
            
        })
    }

    const goBack = ()=>{
        history.push('/main')
    }


    

    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
            //console.log(response);
            if(response.data.loggedIn === true){
                setRole(response.data.user[0].roles);
            }
        })
    }, [])


    


    
        return(
            <div>
                {!role && (
                    <h1>YOU ARE NOT AUTHORIZED TO ACCESS THIS PAGE</h1>
                )}
                {role == 'admin' && (
                    <>
                    <div className="App">
            <header className="App-header">
            <div>
                <div className='registration'>
                <h1>REGISTRATION</h1>
                <label>USERNAME : </label>
                <input type='text' onChange={(e)=>
                setUsernameReg(e.target.value)} /><br></br>
                <label>PASSWORD : </label>
                <input type='text' 
                    onChange={(e)=>
                        setPasswordReg(e.target.value)}/><br></br>
                <label>ROLE : </label>
                <input onChange={(e)=> setRoleReg(e.target.value)}/><br></br>
                <button onClick={register}>REGISTER</button>
            </div>

            </div><br></br>
            <button onClick={goBack}>GO BACK</button>
            </header>
    </div>
    
                    </>
                )}

                

            </div>
            

            
           
            
        );
    }


export default Register;
