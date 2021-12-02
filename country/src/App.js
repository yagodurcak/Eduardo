import "./App.css"

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./components/Login"
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Users from "./pages/users/Users"
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
          <Route path="/Visitas">
          <Visitas/>
          </Route>
    
          </div>
        </Switch>
  
      </div>

      </Switch>
    </Router>
  );
}

export default App;
