import "./App.css"

import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Archivos from "./pages/archivos/Archivos";
import BankAccount from "./pages/gastos/BankAccount";
import Calculos from "./pages/gastos/Calculos";
import Calendar from "./pages/calendar/Calendar";
import CalendarioProvider from "./context/CalendarioContext"
import CondoProvider from "../src/context/Condocontext"
import Configuracion from "./pages/gastos/Configuracion";
import DetalleTramite from "./pages/tramites/DetalleTramite";
import Energia from "./pages/gastos/Energia";
import Espacio from "./pages/espacio/Espacio";
import EspacioProvider from "../src/context/EspacioContext"
import GastosComunes from "./pages/gastos/GastosComunes";
import GastosProvider from "../src/context/GastosContext"
import GastosPrueba from "./pages/gastos/GastosPrueba";
import Historial from "./pages/gastos/Historial";
import HistorialAgua from "./pages/gastos/HistorialAgua";
import Home from "./pages/home/Home";
import Invitados from "./pages/invitados/Invitados";
import InvitadosProvider from "../src/context/InvitadosContext"
import Login from "./components/Login"
import Modal from 'react-modal';
import Noticias from "./pages/noticias/noticias";
import NoticiasProvider from "../src/context/NoticiasContext"
import Personal from "./pages/personal/Personal";
import Personal2 from "./pages/personal/Personal2";
import PersonalProvider from "../src/context/PersonalContext"
import Proveedores from "./pages/invitados/Proveedores";
import ProveedoresProvider from "../src/context/ProveedoresContext"
import Prueba from "./pages/gastos/Prueba";
import Quejas from "./pages/quejas/Quejas";
import QuejasProvider from "../src/context/QuejasContext"
import ReglasProvider from "../src/context/ReglasContext"
import Seguridad from "./pages/seguridad/Seguridad";
import SeguridadProvider from "../src/context/SeguridadContext"
import Sidebar from "./components/sidebar/Sidebar";
import Telefonos from "./pages/telefonos/Telefonos";
import Topbar from "./components/topbar/Topbar";
import TotalCondoProvider from "../src/context/TotalCondContext"
import Tramites from "./pages/tramites/Tramites";
import TramitesProvider from "../src/context/TramitesContext"
import UserProvider from "../src/context/UserContext"
import Users from "./pages/users/Users"
import UsuariosProvider from "../src/context/UsuariosContext"
import UtilInfoProvider from "../src/context/UtilInfoContext"
import Visita from "./pages/visita/Visita";

Modal.setAppElement('#root');

function App() {
  return (
    <UserProvider>
      <TotalCondoProvider>
      <CondoProvider>


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
          <UsuariosProvider>
          <Route path="/Users">
          <Users/>
          </Route>
          </UsuariosProvider>
          <PersonalProvider>
          <Route path="/Personal">
          <Personal/>
          </Route>
          <Route path="/Personal2">
          <Personal2/>
          </Route>
          </PersonalProvider>
          <EspacioProvider>

          <Route path="/Espacio">
          <Espacio/>
          </Route>
          </EspacioProvider>
          <ReglasProvider>
          <Route path="/Visita">
          <Visita/>
          </Route>            
          </ReglasProvider>
          <NoticiasProvider>
          <Route path="/Noticias">
          <Noticias/>
          </Route>
          </NoticiasProvider>
          <QuejasProvider>
          <Route path="/Quejas">
          <Quejas/>
          </Route>
          </QuejasProvider>
          <SeguridadProvider>
          <Route path="/Seguridad">
          <Seguridad/>
          </Route>
          </SeguridadProvider>
          <UtilInfoProvider>
          <Route path="/Archivos">
          <Archivos/>
          </Route>
          <Route path="/Telefonos">
          <Telefonos/>
          </Route>
          </UtilInfoProvider>
          <TramitesProvider>
          <Route path="/Tramites">
          <Tramites/>
          </Route>

          <Route path="/Tramites/:id">
          <DetalleTramite/>
          </Route>
          </TramitesProvider>
          <GastosProvider>
            <Route path="/GastosComunes">
            <GastosComunes/>
            </Route>
          </GastosProvider>
          <Route path="/Calculos">
          <Calculos/>
          </Route>
          <CalendarioProvider>

          <Route path="/Calendario">
          <Calendar/>
          </Route>
          </CalendarioProvider>
       
          <Route path="/Energia">
          <Energia/>
          </Route>
          <Route path="/BankAccount">
          <BankAccount/>
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
          <Route path="/HistorialAgua">
          <HistorialAgua/>
          </Route>
          <Route path="/GastosPrueba">
          <GastosPrueba/>
          </Route>
          <InvitadosProvider>
          <Route path="/Invitados">
          <Invitados/>
          </Route>
          </InvitadosProvider>
          <ProveedoresProvider>
          <Route path="/Proveedores">
          <Proveedores/>
          </Route>
          </ProveedoresProvider>
          </div>
        </Switch>
  
      </div>

      </Switch>
    </Router>

    </CondoProvider>
    </TotalCondoProvider>
    </UserProvider>
  );
}

export default App;
