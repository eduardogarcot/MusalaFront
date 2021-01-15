import React, {Component} from 'react';
import Table from "./Table/table";
import {Link} from "react-router-dom";
import axios from "axios";

class Gateways extends Component {
    state={
        gateways:[]
    };

    async componentDidMount(){
        const headers = {
            "Content-Type": "application/json"
        };
        const {data} = await axios.get("https://localhost:5001/api/gateways",{headers})
            .catch(err=>console.log(err)) ;
        this.setState({gateways:data});
    };

    mapToViewModel=(gateway)=>{
        return {
            _id: gateway.serialNumberId,
            name: gateway.name,
            ipAddress: gateway.ipAddress,
            devicesList: gateway.devicesList.length,
        }};

    render() {
        let labels=[
            {path: "_id", label:"ID Serial Number",content: gateway=><Link to={`/gateways/${gateway._id}`}>{gateway._id}</Link>},
            {path:"name", label:"Name"},
            {path:"ipAddress", label:"IP Address"},
            {path:"devicesList", label:"Devices Connected"}
        ];
        let gatewaysList= this.state.gateways.map(gateway=>this.mapToViewModel(gateway));
        return (
            <div >
                <Link to="/gateways/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Gateway </Link>
                <Table columns={labels} data={gatewaysList} />
            </div>
        );
    }
}

export default Gateways;