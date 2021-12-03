import "./App.css"

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Espacio from "./pages/espacio/Espacio";
import Home from "./pages/home/Home";
import Login from "./components/Login"
import Noticias from "./pages/noticias/noticias";
import Personal from "./pages/personal/Personal";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Users from "./pages/users/Users"
import Visita from "./pages/visita/Visita";
import Visitas from "./pages/visitas/Visitas";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/Login">
          <Login/>
          </Route>

      <div className="container">
        <Sidebar/>
        <Switch>
        <div  className="topbarContainer" >
          <Topbar/> 
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Users">
          <Users/>
          </Route>
          <Route path="/Personal">
          <Personal/>
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
    
          </div>
        </Switch>
  
      </div>

      </Switch>
    </Router>
  );
}

export default App;
