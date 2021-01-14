import './App.css';
import React, {Component} from "react"
import axios from "axios";
import Navbar from "./components/navbar";
import {Route,Switch,Redirect} from "react-router-dom";
import PeripheralDevices from "./components/peripheraldevices";
import Gateways from "./components/gateways";
import NotFound from "./components/notFound";
import GatewayForm from "./components/gatewayForm";
import PeripheralDevicesForm from "./components/peripheralDevicesForm";


class App extends Component {
  state = {
    data: []
  };


  componentDidMount() {
    //const promise = axios.get("http://10.8.91.90:10641/api/listitems/");
    //console.log(promise);
  }

  render() {
    return (
        <React.Fragment>
          <Navbar/>
          <main className="container">
            <Switch>
              <Route path="/gateways/:id" component={GatewayForm}/>
              <Route path="/peripheraldevices/:id" component={PeripheralDevicesForm}/>
              <Route path="/gateways" component={Gateways}/>
              <Route path="/peripheraldevices" component={PeripheralDevices}/>
              <Route path="/not-found" component={NotFound}/>
              <Redirect exact from="/" to="gateways" component={Gateways}/>
              <Redirect to="/not-found"/>
            </Switch>
          </main>
        </React.Fragment>)
  };
}

export default App;
