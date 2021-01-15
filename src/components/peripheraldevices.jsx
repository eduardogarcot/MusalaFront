import React, {Component} from 'react';
import Table from "./Table/table";
import {Link} from "react-router-dom";
import axios from "axios";

class PeripheralDevices extends Component {
    state={
        peripheralDevices:[]
    };

    async componentDidMount(){
        const headers = {
            "Content-Type": "application/json"
        };
        const {data} = await axios.get("https://localhost:5001/api/peripheraldevices",{headers})
            .catch(err=>console.log(err)) ;
        this.setState({peripheralDevices:data});
    };

    mapToViewModel=(pd)=>{
        return {
            _id: pd.deviceId,
            vendor: pd.vendor,
            createdDate: pd.createdDate,
            onlineStatus: pd.onlineStatus,
            serialNumberId:pd.serialNumberId
        }};

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
        let peripheralDevicesList= this.state.peripheralDevices.map(pd=>this.mapToViewModel(pd));
        return (
            <div>
                <Link to="/peripheraldevices/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Peripheral Device </Link>
                <Table columns={labels} data={peripheralDevicesList} />
            </div>
        );
    }
}

export default PeripheralDevices;