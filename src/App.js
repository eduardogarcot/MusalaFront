import './App.css';
import React, {Component} from "react"
import axios from "axios";
import Navbar from "./components/navbar";
import {Route,Switch,Redirect} from "react-router-dom";
import PeripheralDevices from "./components/peripheraldevices";
import Gateways from "./components/gateways";
import NotFound from "./components/notFound";

class App extends Component {
  state={
    data:[]
  };


  componentDidMount(){
    const promise = axios.get("http://10.8.91.90:10641/api/listitems/");
    console.log(promise);
  }
  render(){
    return (
        <React.Fragment>
            <Navbar/>
            <main className="container">
              <Switch>
                <Route path="/gateways" component={Gateways}/>
                <Route path="/peripheraldevices" component={PeripheralDevices}/>
                <Route path="/not-found" component={NotFound}/>
                <Redirect exact from="/" to="gateways" component={Gateways}/>
                <Redirect to="/not-found"/>
              </Switch>
            </main>
          </React.Fragment>)
  };

  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
