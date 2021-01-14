import React, {Component} from 'react';
import Table from "./table";
import {Link} from "react-router-dom";

class Gateways extends Component {

    render() {
        let labels=[
            {path: "_id", label:"ID Serial Number",content: gateway=><Link to={`/gateways/${gateway._id}`}>{gateway._id}</Link>},
            {path:"name", label:"Name"},
            {path:"ipaddress", label:"IP Address"},
            {path:"peripheralDevices", label:"Devices Connected"}
        ];
        let gateways= [
            {_id:1, name:"Felipe", ipaddress:"10.8.91.145", peripheralDevices:5},
            {_id:2, name:"Carlos", ipaddress:"10.8.200.132", peripheralDevices:2},
            {_id:3, name:"Antonio", ipaddress:"10.8.10.56", peripheralDevices:2},
            {_id:4, name:"Eduardo", ipaddress:"10.8.56.15", peripheralDevices:3},
        ]
        return (
            <div >
                <Link to="/gateways/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Gateway </Link>
                <Table columns={labels} data={gateways} />
            </div>
        );
    }
}

export default Gateways;