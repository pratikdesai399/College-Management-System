import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function Teacher(){
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
            <h1>TEACHER</h1>
            <button onClick={logout}>LOGOUT</button>
        </div>
    )
}