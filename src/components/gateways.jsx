import React, {Component} from 'react';
import Table from "./Table/table";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

class Gateways extends Component {
    state={
        gateways:[]
    };

    async componentDidMount(){
        let data = [];
        try{
            data = await axios.get("https://localhost:5001/api/gateways");
        } catch(error){
            toast.error("Unexpected Error");
            return;
        }
        this.setState({gateways:data.data});
        };

    mapToViewModel=(gateway)=>{
        return {
            _id: gateway.serialNumberId,
            name: gateway.name,
            ipAddress: gateway.ipAddress,
            devicesList: gateway.devicesList.length,
        }};

    handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:5001/api/gateways/${id}`,id)
            }
        catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("This gateway has already been deleted");
            }
        }
        this.props.history.push("/");
    };
    render() {
        let labels=[
            {path: "_id", label:"ID Serial Number",content: gateway=><Link to={`/gateways/${gateway._id}`}>{gateway._id}</Link>},
            {path:"name", label:"Name"},
            {path:"ipAddress", label:"IP Address"},
            {path:"devicesList", label:"Devices Connected"},
            {path:"delete", label:"Delete", content:(gateway)=> <button className="btn btn-sm btn-danger" onClick={()=>this.handleDelete(gateway._id)}>Delete</button>}
        ];
        let gatewaysList= this.state.gateways.map(gateway=>this.mapToViewModel(gateway));
        if (gatewaysList.length===0)
            return (
                <React.Fragment>
                    <h1>There is no register of Gateways</h1>
                    <Link to="/gateways/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Gateway </Link>
                </React.Fragment>
                    );

        return (
            <div >
                <Link to="/gateways/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Gateway </Link>
                <Table columns={labels} data={gatewaysList} />
            </div>
        );
    }
}

export default Gateways;