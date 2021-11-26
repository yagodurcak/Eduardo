import "./Login.css"

import React, {useState} from 'react';

import imagen from "../IMG/Groupicono.png"
import styled from '@emotion/styled';

const Icono = styled.img`
    height: 200px;
    width: 220px;
    margin: 10px 10px;
    
`
const ContainersImg= styled.div`
 /* background-color: red; */
 margin-bottom: -100px;
 display: grid;
 justify-content: center;
 align-items: center;
`



function Login() {

    const [login, setLogin] = useState({
        usuario: "",
        contraseña: ""
    });


    const {usuario, contraseña}= login;




    const Registro = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const iniciarSesion = (e) => {
        e.preventDefault();
        // validacion
        if (usuario.trim() === "" || contraseña.trim() === "") {
            console.log("vacio");
        }else{
            console.log("lleno");
        }

        // pasarlo al action 
    }


    return (
     
            <div className="Containers">
                    <ContainersImg>

                    <Icono src={imagen} alt="" />
                    </ContainersImg>
                
                <form action="" className="mt-1" onSubmit={iniciarSesion}>
                    <div className="inputContainer">
                        <i class="fa fa-user fa-2x icon"> </i>                       
                        <input type="text" placeholder="USERNAME"  className="mt-5 placeholder-white Field" name="usuario" onChange={Registro} value={usuario}/>
                    </div>
                    <div className="inputContainer">
                        <i class="fa fa-lock fa-2x icon"> </i>                       
                        <input type= "password" placeholder="PASSWORD"  className="mt-5 placeholder-white Field" name="contraseña" onChange={Registro} value={contraseña}/>
                    </div>
                    <button className="boton" type="submit">LOGIN</button>
                    <div className="grid justify-items-end mt-5">
                        <a href=""><h3 className="text-white forgot">Forgot password? </h3></a>
                    </div>
        
                </form>
                
            </div>

      
    )
}

export default Login
    