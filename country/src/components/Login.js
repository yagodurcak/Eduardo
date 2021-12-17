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


    const [datas, setdatas] = useState([]);
    const [data, setdata] = useState({});
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [wrongPassword, setwrongPassword] = useState(false)
    const [wrongEmail, setwrongEmail] = useState(false)
    const [notExist, setnotExist] = useState(false)
    


    const iniciarSesion = (e) => {
        e.preventDefault();


        const headers = {
            'Content-Type': 'application/json'
        }

        const data = {
            email: email,
            password: password
        }

        // if (condition) {
            
        // }

        axios.post('https://back2.tinpad.com.pe/public/api/login', data, {headers})
             .then(response => {
                 if(response.data.token) {
                     localStorage.setItem('Authorization', response.data.token)
										 localStorage.setItem('user', JSON.stringify(response.data.user))
										 
  
                 }


                 setdata(response.data.user)
                 console.log(response.data);
                 window.location.href="./Home";
                 
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
             })
    }


    // const iniciarSesions = (e) => {
    //     e.preventDefault();
        
    //     // const bodyParameters = {
    //     //     email : "renato33@gmail.com",
    //     //    password : "12345678"        };

    //     // const Json = JSON.stringify(bodyParameters)
    //     // console.log(Json);
        
    //    const Hola= axios( 
    //       'https://back2.tinpad.com.pe/public/api/project/1').then(res => {console.log(res);}).catch(err=> {console.log(err);})
      
      
    //       console.log(Hola);

    // }


    return (
     
            <div className="Containers">
                    <div>
                        <ContainersImg>
                        <Icono src={imagen} alt="" />
                        { wrongPassword ? <h2 className="bg-red-500 text-white py-3 px-5">Contraseña incorrecta</h2> : null}
                        { wrongEmail ? <h2 className="bg-red-500 text-white py-3 px-5">Usuario incorrecto</h2> : null}
                        { notExist ? <h2 className="bg-red-500 text-white py-3 px-5">Error al intentar inciar sesion</h2> : null}
                        
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
    