import "./Login.css"

import React, {useEffect, useState} from 'react';

import axios from 'axios';
import imagen from "../IMG/Groupicono.svg"
import styled from '@emotion/styled';

const Icono = styled.img`
    height: 200px;
    width: 220px;
    margin: 40px 10px;
    
`
const ContainersImg= styled.div`
 /* background-color: red; */
 /* margin-bottom: -100px; */
 display: grid;
 justify-content: center;
 align-items: center;
`



function Login() {

    const [login, setLogin] = useState({
        email: "renato@gmail.com",
        password: "12345678"
    });


    const {email, password}= login;




    const Registro = (e) => {
        // setLogin({
        //     ...login,
        //     [e.target.name]: e.target.value
        // })
    }

    // const traerFrase = async () => {
    //     const api = await axios('http://condodeskback.tinpad.com.pe/api/water-expenditure/1');
    //     const frase = await api.json()
    //     console.log(frase);
    // }
    // useEffect(() => {
    //         traerFrase()
    
    // },[]);

    const iniciarSesion = (e) => {
        e.preventDefault();

        // const config = {
        //     headers: { Authorization: `Bearer 1|xqTCimotNZlQG3xLmPeCaBVH9VDtAEIg6yP1Bdz3` }
        // };
        
        const bodyParameters = {
            email:"renato@gmail.com",
            password:"12345678"
        };

        const Json = JSON.stringify(bodyParameters)
        console.log(Json);
        
        axios.post( 
          'http://condodeskback.tinpad.com.pe/api/login',
          Json
        ).then(res => {console.log(res);}).catch(err=> {console.log(err);})
        console.log(Json);
    }


    return (
     
            <div className="Containers">
                    <div>
                        <ContainersImg>
                        <Icono src={imagen} alt="" />
                        </ContainersImg>
                                        
                                        <form action="" className="mt-1" onSubmit={iniciarSesion}>
                        <div className="inputContainer">
                            <i class="fa fa-user fa-2x icon"> </i>
                            <input type="text" placeholder="USERNAME"  className="mt-5 placeholder-white Field" name="email" onChange={e=> this.email = e.target.value} value={email}/>
                        </div>
                        <div className="inputContainer">
                            <i class="fa fa-lock fa-2x icon"> </i>
                            <input type= "password" placeholder="PASSWORD"  className="mt-5 placeholder-white Field" name="password" onChange={e=> this.password = e.target.value}  value={password}/>
                        </div>
                        <button className="boton" type="submit">LOGIN</button>
                        <div className="ForgotContainer">
                            <a href="" >
                                <h3 className="forgot">Forgot password? </h3>
                                </a>
                        </div>
                                
                                        </form>
                    </div>
                
            </div>

      
    )
}

export default Login
    