import "./Sidebar.css";

import {
    Link,
    NavLink,
} from "react-router-dom";
import React , {useState} from 'react';

import adjunto from "../../IMG/sidebar/adjunto.svg"
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
import phone from "../../IMG/sidebar/phone.svg"
import propietario from "../../IMG/users/user1.svg"
import quejas from "../../IMG/QuejasSvg 1quejas.svg"
import right from "../../IMG/sidebar/chevron_right_black_24dp.svg"
import seguridad from "../../IMG/users/seguridad.svg"
import tramites from "../../IMG/Tramites 3tramites.svg"
import users from "../../IMG/Users 2users.svg"
import visitas from "../../IMG/Visitas 3visitas.svg"

function Sidebar() {

    const [submenuUser, setSubMenuUser] = useState(false)
    const [submenuVisitas, setSubMenuVisitas] = useState(false)
    const [submenuInformacion, setsubmenuInformacion] = useState(false)
    const [submenuGastos, setSubmenuGastos] = useState(false)
    const [activeUser, setActiveUser] = useState(false)
    const [activeVisitas, setActiveVisitas] = useState(false)
    const [activeInformacion, setActiveInformacion] = useState(false)
    const [activeGastos, setActiveGastos] = useState(false)

    const abrirSubmenuUser = () => {
        setSubMenuUser(!submenuUser)
        setActiveUser(!activeUser)
    
    }
    const abrirSubmenuVisitas = () => {
        setSubMenuVisitas(!submenuVisitas)
        setActiveVisitas(!activeVisitas)
    }
    const abrirSubmenuVInformacion = () => {
        setsubmenuInformacion(!submenuInformacion)
        setActiveInformacion(!activeInformacion)
    }
    const abrirSubmenuGastos = () => {
        setSubmenuGastos(!submenuGastos)
        setActiveGastos(!activeGastos)
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
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                      
                                {/* <h1 className="title1">Dashboards</h1> */}



                            </NavLink>
                        </li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} onClick={() => abrirSubmenuUser()}>
                        <li className='listahover'>
                        <div className="dropdown" >

                                <div className="logoContainter1" >
                                    <img src={users} alt="" className='logo1' />
                                    <h1 className="title1">Usuarios</h1>
                                </div>

                                { activeUser ? <a href=""><img src={right} alt="" className='chevronright' /></a> :  <a href="" ><img src={down} alt="" className='logo2' /></a>}

                               
                                

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
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/Seguridad" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Seguridad">
                                    <img src={seguridad} alt="" className='logo3' />
                                    <h1 className="title1">Seguridad</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
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
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Espacio" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Espacio" activeClassName="linkactivo">

                                <img src={espacio} alt="" className='logo1' />
                                <h1 className="title1">Espacios</h1>
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Visita" style={{ textDecoration: 'none' }} onClick={() => abrirSubmenuVisitas()}>
                        <li className='listahover'>
              

                                <div className="dropdown">
                                    <div className="logoContainter1" >
                                        <img src={visitas} alt="" className='logo1' />
                                        <h1 className="title1">Visitas</h1>
                                    </div>
                                    { activeVisitas ? <a href=""><img src={right} alt="" className='chevronright' /></a> :  <a href="" ><img src={down} alt="" className='logo2' /></a>}
                                </div>


                    
                        </li>
                    </Link>
                    {submenuVisitas
                    
                    ? (
                    
                    <div>
                        <Link to="/Visita" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                                <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Visita">
                                    <img src={propietario} alt="" className='logo3' />
                                    <h1 className="title1">Reglas</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/2" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/2">
                                    <img src={seguridad} alt="" className='logo3' />
                                    <h1 className="title1">Invitados</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                           

                                </NavLink>
                            </li>
                        </Link>
                    </div>
                    
                    ) 
                    : null}
                    <Link to="/Noticias" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Noticias" activeClassName="linkactivo">

                                <img src={noticias} alt="" className='logo1' />
                                <h1 className="title1">Noticias</h1>
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Archivos" style={{ textDecoration: 'none' }} onClick={() => abrirSubmenuVInformacion()}>
                    <li className='listahover'>
                    <div className="dropdown">
                            <div className="logoContainter1" >
                                <img src={informacion} alt="" className='logo1' />
                                <h1 className="title1">Información útil </h1>
                            </div>
                            { activeInformacion ? <a href=""><img src={right} alt="" className='chevronright' /></a> :  <a href="" ><img src={down} alt="" className='logo2' /></a>}
                            </div>
                    </li>
                        </Link>
                        {submenuInformacion
                    
                    ? (
                    
                    <div>
                        <Link to="/Archivos" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                                <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Archivos">
                                    <img src={adjunto} alt="" className='logo3' />
                                    <h1 className="title1">Archivos</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Telefonos">
                                    <img src={phone} alt="" className='logo3' />
                                    <h1 className="title1">Teléfonos</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                           

                                </NavLink>
                            </li>
                        </Link>
                    </div>
                    
                    ) 
                    : null}
                    <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Tramites" activeClassName="linkactivo">

                                <img src={tramites} alt="" className='logo1' />
                                <h1 className="title1">Trámites</h1>
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/Quejas" style={{ textDecoration: 'none' }}>
                        <li className='listahover'>
                        <NavLink className="logoContainter1" exact to="/Quejas" activeClassName="linkactivo">

                                <img src={quejas} alt="" className='logo1' />
                                <h1 className="title1">Quejas y Reclamos</h1>
                                {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                            </NavLink>
                        </li>
                    </Link>
                    <Link to="/GastosComunes" style={{ textDecoration: 'none' }} onClick={() => abrirSubmenuGastos()}>
                    <li className='listahover'>
                            <div className="dropdown">
                                <div className="logoContainter1">
                                    <img src={gastos} alt="" className='logo1' />
                                    <h1 className="title1">Gastos y pagos</h1>
                                </div>
                                { activeInformacion ? <a href=""><img src={right} alt="" className='chevronright' /></a> :  <a href="" ><img src={down} alt="" className='logo2' /></a>}
                            </div>

                    </li>
                        </Link>
                        {submenuGastos
                    
                    ? (
                    
                    <div>
                        <Link to="/GastosComunes" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                                <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/GastosComunes">
                                    <img src={adjunto} alt="" className='logo3' />
                                    <h1 className="title1">Condominio</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Telefonos">
                                    <img src={phone} alt="" className='logo3' />
                                    <h1 className="title1">Energía</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                           

                                </NavLink>
                            </li>
                        </Link>
                        <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                            <li className='submenu'>
                            <NavLink className="logoContainter1" activeClassName="linkactivo1" to="/Telefonos">
                                    <img src={phone} alt="" className='logo3' />
                                    <h1 className="title1">Agua</h1>
                                    {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                           

                                </NavLink>
                            </li>
                        </Link>
                    </div>
                    
                    ) 
                    : null}
                    <li className='listahover'>
                    <NavLink className="logoContainter1" exact to="/cs" activeClassName="linkactivo">

                            <img src={calendario} alt="" className='logo1' />
                            <h1 className="title1">Calendario</h1>
                            {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}

                        </NavLink>
                    </li>

                </ul>
            </div>


        </div>
    )
}

export default Sidebar
