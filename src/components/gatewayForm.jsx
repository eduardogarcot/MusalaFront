import React from 'react';
import Joi from "joi-browser";
import Form from "./Forms/form";
import axios from "axios";

class GatewayForm extends Form {
    state = {
        data: {
            _id:"",
            name:"",
            ipAddress:"",
            devicesList:"",
        },
        errors:{}
    };
    schema= {
        _id: Joi.number()
            .required()
            .min(1)
            .label("ID Serial Number"),
        name: Joi.string()
            .required()
            .label("Name"),
        ipAddress: Joi.string()
            .required()
            .label("Crated Date"),
        devicesList: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Devices Connected")
    };

    async componentDidMount(){
        const gatewayID = this.props.match.params.id;
        if (gatewayID === "new") return;

        const headers = {
            "Content-Type": "application/json"
        };
        const endpoint = "https://localhost:5001/api/gateways/"+gatewayID.toString();
        const {data} = await axios.get(endpoint,{headers})
            .catch(err=>console.log(err)) ;
        this.setState({data:this.mapToViewModel(data)})
    };

    mapToViewModel=(gateway)=>{
        return {
            _id: gateway.serialNumberId,
            name: gateway.name,
            ipAddress: gateway.ipAddress,
            devicesList: gateway.devicesList.length,
        }};

    doSubmit = ()=>{
        this.props.history.push("/gateways")
    };
    render() {
        return (
            <div>
                <h1> Gateways Form</h1>
                <form>
                    {this.renderInput("_id", "ID Serial Number", "number")}
                    {this.renderInput("name", "Name")}
                    {this.renderInput("ipAddress", "IP Address")}
                    {this.renderInput("devicesList", "ConnectedDevices", "number")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
export default GatewayForm;