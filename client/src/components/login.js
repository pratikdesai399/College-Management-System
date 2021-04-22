
import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';



function Login(){
    
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordeReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");

    const [usernameLog, setUsernameLog] = useState("");
    const [passwordeLog, setPasswordLog] = useState("");
    const [roleLog, setRoleLog] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    let history = useHistory();

    axios.defaults.withCredentials = true;

    // const register =()=>{
    //     axios.post('http://localhost:5000/register', {username : usernameReg, password: passwordeReg, role: roleReg})
    //     .then((response)=>{
    //         console.log(response);
    //     })
    // }

    const login=()=>{
        axios.post('http://localhost:5000/login', {username : usernameLog, password: passwordeLog, role: roleLog})
        .then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message);
                
                
            }else{
                setLoginStatus(response.data[0].username)
                history.push('/main');
            }
            
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/login")
        .then((response)=>{
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].username);
            }
            
        })
    }, [])


    


    
        return(
            <div className="App">
            <header className="App-header">
            <div>
                {/* <div className='registration'>
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
            </div> */}



            {/* //LOGIN */}
            <div className='login'>
            <h1>LOGIN</h1>
                <label>USERNAME : </label>
                <input type='text' onChange={(e)=>
                setUsernameLog(e.target.value)} /><br></br>
                <label>PASSWORD : </label>
                <input type='password' onChange={(e)=>
                setPasswordLog(e.target.value)}/><br></br>
                <label>ROLE : </label>
                <input onChange={(e)=> setRoleLog(e.target.value)}/><br></br>
                <button onClick={login}>LOGIN</button>

            </div>

            <h1>{loginStatus}</h1>

            </div>
            </header>
    </div>
            
           
            
        );
    }


export default Login;
