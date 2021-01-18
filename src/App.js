import './App.css';
import React, {Component} from "react";
import Navbar from "./components/navbar";
import {Route,Switch,Redirect} from "react-router-dom";
import PeripheralDevices from "./components/peripheraldevices";
import Gateways from "./components/gateways";
import NotFound from "./components/notFound";
import GatewayForm from "./components/gatewayForm";
import PeripheralDevicesForm from "./components/peripheralDevicesForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    data: []
  };

  render() {
    return (
        <React.Fragment>
          <ToastContainer/>
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
