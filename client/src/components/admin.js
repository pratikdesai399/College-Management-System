import axios from 'axios';
import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Admin(){
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
            <h1>ADMIN</h1>
            <button onClick={logout}>LOGOUT</button>

        </div>
    )
}