import "./Sidebar.css";

import {
    Link,
    NavLink,
} from "react-router-dom";
import React , {useState} from 'react';

import calendario from "../../IMG/CalendarioActividades 1calendario.svg"
import dashnoard from "../../IMG/dashboard.svg"
import down from "../../IMG/down.svg"
import espacio from "../../IMG/Vectorespacios.svg"
import gastos from "../../IMG/Pagos 1gastos.svg"
import imagen from "../../IMG/Profile 1usericon.svg"
import informacion from "../../IMG/Información 2info.svg"
import logo from "../../IMG/logocondominio.svg"
import noticias from "../../IMG/Noticias 2noticias.svg"
import personal from "../../IMG/personal.svg"
import propietario from "../../IMG/users/user1.svg"
import quejas from "../../IMG/QuejasSvg 1quejas.svg"
import seguridad from "../../IMG/users/seguridad.svg"
import tramites from "../../IMG/Tramites 3tramites.svg"
import users from "../../IMG/Users 2users.svg"
import visitas from "../../IMG/Visitas 3visitas.svg"

function Sidebar() {

    const [submenuUser, setSubMenuUser] = useState(false)

    const abrirSubmenuUser = () => {
        setSubMenuUser(!submenuUser)
        console.log(submenuUser);
    }



    return (
        <div className="sidebarContainer">
            <div className="logoContainter">
                <img src={logo} alt="" className='logo' />
                <h1 className="title">NOMBRE DEL CONDOMINIO</h1>
            </div>
            <div className="linea"></div>
            <div className="logoContainter">

                <img src={imagen} alt="" className='logo1' />
                <h1 className="title1">Admin</h1>
            </div>
            <div className="linea"></div>
            <div className='lista'>
                <ul className='lista1'>


                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                            <NavLink className="logoContainter1" exact to="/" activeClassName="linkactivo">

   
                                <img src={dashnoard} alt="" className='logo1' />
                                <h1 className="title1">Dashboards</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>
                      
                                {/* <h1 className="title1">Dashboards</h1> */}



                            </NavLink>
                        </li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} onClick={() => abrirSubmenuUser()}>
                        <li className='listahover'>
                        <div className="logoContainter1" >

                                <img src={users} alt="" className='logo1' />
                                <h1 className="title1">Usuarios</h1>

                                <a href="" ><img src={down} alt="" className='logo2' /></a>

                            </div>
                        </li>
                    </Link>
                    {submenuUser 
                    
                    ? (
                    
                    <div>
                        <Link to="/Users" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                                <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Users">
                                    <img src={propietario} alt="" className='logo3' />
                                    <h1 className="title1">Propietarios</h1>
                                    <a href=""><img src={down} alt="" className='logo2' /></a>
                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/Seguridad" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Seguridad">
                                    <img src={seguridad} alt="" className='logo3' />
                                    <h1 className="title1">Seguridad</h1>
                                    <a href=""><img src={down} alt="" className='logo2' /></a>
                                </NavLink>
                            </li>
                        </Link>
                    </div>
                    
                    ) 
                    : null}

                    <Link to="/Personal" style={{ textDecoration: 'none' }}>

                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Personal" activeClassName="linkactivo">

                                <img src={personal} alt="" className='logo1' />
                                <h1 className="title1">Personal</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Espacio" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Espacio" activeClassName="linkactivo">

                                <img src={espacio} alt="" className='logo1' />
                                <h1 className="title1">Espacios</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Visita" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Visita" activeClassName="linkactivo">

                                <img src={visitas} alt="" className='logo1' />
                                <h1 className="title1">Visitas</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Noticias" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Noticias" activeClassName="linkactivo">

                                <img src={noticias} alt="" className='logo1' />
                                <h1 className="title1">Noticias</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <li className='listahover'>
                    <NavLink className="logoContainter1" exact to="/s" activeClassName="linkactivo">

                            <img src={informacion} alt="" className='logo1' />
                            <h1 className="title1">Información útil </h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </NavLink>
                    </li>
                    <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Tramites" activeClassName="linkactivo">

                                <img src={tramites} alt="" className='logo1' />
                                <h1 className="title1">Trámites</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Quejas" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Quejas" activeClassName="linkactivo">

                                <img src={quejas} alt="" className='logo1' />
                                <h1 className="title1">Quejas y Reclamos</h1>
                                <a href=""><img src={down} alt="" className='logo2' /></a>

                            </NavLink>
                        </li>
                    </Link>
                    <li className='listahover'>
                    <NavLink className="logoContainter1" exact to="/a" activeClassName="linkactivo">

                            <img src={gastos} alt="" className='logo1' />
                            <h1 className="title1">Gastos y pagos</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </NavLink>
                    </li>
                    <li className='listahover'>
                    <NavLink className="logoContainter1" exact to="/cs" activeClassName="linkactivo">

                            <img src={calendario} alt="" className='logo1' />
                            <h1 className="title1">Calendario</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </NavLink>
                    </li>

                </ul>
            </div>


        </div>
    )
}

export default Sidebar
