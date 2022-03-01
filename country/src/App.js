import "./App.css"

import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Archivos from "./pages/archivos/Archivos";
import Calculos from "./pages/gastos/Calculos";
import Calendar from "./pages/calendar/Calendar";
import CondoProvider from "../src/context/Condocontext"
import Configuracion from "./pages/gastos/Configuracion";
import DetalleTramite from "./pages/tramites/DetalleTramite";
import Energia from "./pages/gastos/Energia";
import Espacio from "./pages/espacio/Espacio";
import GastosComunes from "./pages/gastos/GastosComunes";
import GastosPrueba from "./pages/gastos/GastosPrueba";
import Historial from "./pages/gastos/Historial";
import HistorialAgua from "./pages/gastos/HistorialAgua";
import Home from "./pages/home/Home";
import Invitados from "./pages/invitados/Invitados";
import Login from "./components/Login"
import Modal from 'react-modal';
import Noticias from "./pages/noticias/noticias";
import Personal from "./pages/personal/Personal";
import Personal2 from "./pages/personal/Personal2";
import PersonalProvider from "../src/context/PersonalContext"
import Proveedores from "./pages/invitados/Proveedores";
import Prueba from "./pages/gastos/Prueba";
import Quejas from "./pages/quejas/Quejas";
import Seguridad from "./pages/seguridad/Seguridad";
import Sidebar from "./components/sidebar/Sidebar";
import Telefonos from "./pages/telefonos/Telefonos";
import Topbar from "./components/topbar/Topbar";
import TotalCondoProvider from "../src/context/TotalCondContext"
import Tramites from "./pages/tramites/Tramites";
import UserProvider from "../src/context/UserContext"
import Users from "./pages/users/Users"
import Visita from "./pages/visita/Visita";

Modal.setAppElement('#root');

function App() {
  return (
    <UserProvider>
      <TotalCondoProvider>
      <CondoProvider>
      <PersonalProvider>

    <Router>
      <Switch>
          <Route exact path="/">
          <Login/>
          </Route>


      <div className="container">
        <Sidebar/>
        <Switch>
        <div  className="topbarContainer" >
          <Topbar/>      
          <Route  path="/Home">
            <Home />
          </Route>
          <Route path="/Users">
          <Users/>
          </Route>
          <Route path="/Personal">
          <Personal/>
          </Route>
          <Route path="/Personal2">
          <Personal2/>
          </Route>
          <Route path="/Espacio">
          <Espacio/>
          </Route>
          <Route path="/Visita">
          <Visita/>
          </Route>
          <Route path="/Noticias">
          <Noticias/>
          </Route>
          <Route path="/Tramites">
          <Tramites/>
          </Route>
          <Route path="/Quejas">
          <Quejas/>
          </Route>
          <Route path="/Seguridad">
          <Seguridad/>
          </Route>
    
          <Route path="/Archivos">
          <Archivos/>
          </Route>
          <Route path="/Telefonos">
          <Telefonos/>
          </Route>
          <Route path="/Tramites/:id">
          <DetalleTramite/>
          </Route>
          <Route path="/GastosComunes">
          <GastosComunes/>
          </Route>
          <Route path="/Calculos">
          <Calculos/>
          </Route>
          <Route path="/Calendario">
          <Calendar/>
          </Route>
          <Route path="/Energia">
          <Energia/>
          </Route>
          <Route path="/Prueba">
          <Prueba/>
          </Route>
          <Route path="/Configuracion">
          <Configuracion/>
          </Route>
          <Route path="/Historial">
          <Historial/>
          </Route>
          <Route path="/Invitados">
          <Invitados/>
          </Route>
          <Route path="/HistorialAgua">
          <HistorialAgua/>
          </Route>
          <Route path="/GastosPrueba">
          <GastosPrueba/>
          </Route>
          <Route path="/Proveedores">
          <Proveedores/>
          </Route>
          </div>
        </Switch>
  
      </div>

      </Switch>
    </Router>
    </PersonalProvider>
    </CondoProvider>
    </TotalCondoProvider>
    </UserProvider>
  );
}

export default App;
