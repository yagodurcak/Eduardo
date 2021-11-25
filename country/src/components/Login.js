import "./Login.css"

import Button from "@mui/material/Container"
import React from 'react';
import imagen from "../IMG/Groupicono.png"
import styled from '@emotion/styled';

const Containers= styled.div`
 /* background-color: red; */
 display: grid;
 justify-content: center;
 align-items: center;
`
const Icono = styled.img`
    height: 200px;
    width: 220px;
    margin: 10px 10px;
    
`

const Input = styled.input`
    height: 70px;
    width: 500px;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 10px;
    padding-left: 10px;
    color: white;
    font-size: 20px;
    text-align: center;   

`


function Login() {
    return (
     
            <Containers>
                <Containers>
                    <Icono src={imagen} alt="" />
                </Containers>
                <form action="" className="mt-10">
                    <div className="inputContainer">
                        <i class="fa fa-user fa-2x icon"> </i>                       
                        <input type="text" placeholder="USERNAME"  className="mt-5 placeholder-white Field"/>
                    </div>
                    <div className="inputContainer">
                        <i class="fa fa-lock fa-2x icon"> </i>                       
                        <input type="text" placeholder="PASSWORD"  className="mt-5 placeholder-white Field"/>
                    </div>
                    <button className="boton">LOGIN</button>
                    <div className="grid justify-items-end mt-5">
                        <a href=""><h3 className="text-white forgot">Forgot password? </h3></a>
                    </div>
        
                </form>
                
            </Containers>

      
    )
}

export default Login
    