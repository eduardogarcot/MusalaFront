import React, {Component} from 'react';
import Table from "./table";

class Gateways extends Component {

    render() {
        let labels=[
            {path: "_id", label:"ID Serial Number"},
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
            <div>
                <Table columns={labels} data={gateways} />
            </div>
        );
    }
}

export default Gateways;