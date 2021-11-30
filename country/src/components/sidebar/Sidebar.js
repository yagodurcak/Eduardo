import "./Sidebar.css";

import React from 'react';
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
import quejas from "../../IMG/QuejasSvg 1quejas.svg"
import tramites from "../../IMG/Tramites 3tramites.svg"
import users from "../../IMG/Users 2users.svg"
import visitas from "../../IMG/Visitas 3visitas.svg"

function Sidebar() {
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
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={dashnoard} alt="" className='logo1' />
                            <h1 className="title1">Dashboard</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={users} alt="" className='logo1' />
                            <h1 className="title1">Usuarios</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={personal} alt="" className='logo1' />
                            <h1 className="title1">Personal</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={espacio} alt="" className='logo1' />
                            <h1 className="title1">Espacios</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={visitas} alt="" className='logo1' />
                            <h1 className="title1">Visitas</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={noticias} alt="" className='logo1' />
                            <h1 className="title1">Noticias</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={informacion} alt="" className='logo1' />
                            <h1 className="title1">Información útil </h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={tramites} alt="" className='logo1' />
                            <h1 className="title1">Trámites</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={quejas} alt="" className='logo1' />
                            <h1 className="title1">Quejas y Reclamos</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={gastos} alt="" className='logo1' />
                            <h1 className="title1">Gastos y pagos</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                    <li className='listahover'>
                        <div className="logoContainter1">

                            <img src={calendario} alt="" className='logo1' />
                            <h1 className="title1">Calendario</h1>
                            <a href=""><img src={down} alt="" className='logo2' /></a>

                        </div>
                    </li>
                   
                </ul>
            </div>
            
          
        </div>
    )
}

export default Sidebar
