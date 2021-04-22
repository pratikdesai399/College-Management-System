import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function Student(){
    let history = useHistory();

    const logout = ()=>{
        axios.post('http://localhost:5000/logout')
        .then((response)=>{
            
            if(response){
                console.log(response);
                history.push('/registration');
            }
        })

    }
    return(
        <div>
            <h1>STUDENT</h1>
            <button onClick={logout}>LOGOUT</button>
            
        </div>
    )
}