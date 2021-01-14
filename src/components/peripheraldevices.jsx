import React, {Component} from 'react';
import Table from "./table";
import {Link} from "react-router-dom";

class PeripheralDevices extends Component {
    render() {
        let labels=[
            {path: "_id", label:"Device Id", content:pd=><Link to={`/peripheraldevices/${pd._id}`}>{pd._id}</Link>},
            {path:"vendor", label:"Vendor"},
            {path:"createdDate", label:"Created Date"},
            {path:"onlineStatus", label:"Is Online", content:gateway=>{
                if (gateway.onlineStatus) return <p>Yes</p>;
                    return <p>No</p>
                }},
            {path:"serialNumberId", label:"Gateway ID"}
        ];
        let peripheralDevices= [
            {_id:10, vendor:"Felipe", createdDate:"10.8.91.145", onlineStatus:true, serialNumberId:1},
            {_id:20, vendor:"Carlos", createdDate:"10.8.200.132", onlineStatus:false, serialNumberId:1},
            {_id:30, vendor:"Antonio", createdDate:"10.8.10.56", onlineStatus:false, serialNumberId:2},
            {_id:40, vendor:"Eduardo", createdDate:"10.8.56.15", onlineStatus:true, serialNumberId:1},
        ];
        return (
            <div>
                <Link to="/peripheraldevices/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Peripheral Device </Link>
                <Table columns={labels} data={peripheralDevices} />
            </div>
        );
    }
}

export default PeripheralDevices;