import "./Login.css"

import React, {useEffect, useState} from 'react';

import {Redirect} from 'react-router-dom';
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



    const [data, setdata] = useState({});
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [wrongPassword, setwrongPassword] = useState(false)
    const [wrongEmail, setwrongEmail] = useState(false)
    const [notExist, setnotExist] = useState(false)
    const [redirect, setRedirect] = useState(false);
    


    const iniciarSesion = (e) => {
        e.preventDefault();


        const headers = {
            'Content-Type': 'application/json'
        }

        const data = {
            email: email,
            password: password
        }

        if (email.trim() === "" || password.trim() === "" ) {
            setnotExist(true);
            return
        } else {

            setnotExist(false);

        axios.post('https://back2.tinpad.com.pe/public/api/login', data, {headers})
             .then(response => {
                 if(response.data.token) {
                     localStorage.setItem('Authorization', response.data.token)
										 localStorage.setItem('user', JSON.stringify(response.data.user)) 
                                         setRedirect(true)
                 }
                 setdata(response.data.user)
                 console.log(response.data);
                 
             })
             .catch(err => {
                if(err.response) {
                    if(err.response.status === 401) {
                        console.log('danger', 'Contraseña inválida', 8)
                        setwrongPassword(true)
                    }
                    else if(err.response.status === 404){
                        console.log('warning', `El usuario ${data.email} no existe`)
                        setwrongEmail(true)
                    }
                    else {
                        console.log('warning', 'Hubo un error al intentar inciar sesion')
                        setnotExist(true)
                    }
                }
             })}
    }

    if (redirect) {
        return <Redirect to="/Home"/>;
    }


    return (
     
            <div className="Containers">
                    <div>
                        <ContainersImg>
                        <Icono src={imagen} alt="" />
                        { wrongPassword ? <h2 className="bg-red-500 text-white py-3 px-5">Contraseña incorrecta</h2> : null}
                        { wrongEmail ? <h2 className="bg-red-500 text-white py-3 px-5">Usuario incorrecto</h2> : null}
                        { notExist ? <h2 className="bg-red-500 text-white py-3 px-5">Complete todos los datos</h2> : null}
                        
                        </ContainersImg>
                                        
                                        <form action="" className="mt-1" onSubmit={iniciarSesion}>
                        <div className="inputContainer">
                            <i class="fa fa-user fa-2x icon"> </i>
                            <input type="text" placeholder="USERNAME"  className="mt-5 placeholder-white Field" name="email" onChange={e=> setemail(e.target.value)} value={email}/>
                        </div>
                        <div className="inputContainer">
                            <i class="fa fa-lock fa-2x icon"> </i>
                            <input type= "password" placeholder="PASSWORD"  className="mt-5 placeholder-white Field" name="password" onChange={e=> setpassword(e.target.value)}  value={password}/>
                        </div>
                        <button className="boton" type="submit">LOGIN</button>
                        <div className="ForgotContainer">
                            <a href="" >
                                <h3 className="forgot">Forgot password? </h3>
                                </a>
                        </div>
                                
                                        </form>
      
                        
                    </div>
                    
                    { data ? (<h3 className="forgot">{data.name} </h3>): null}
                
            </div>

      
    )
}

export default Login
    