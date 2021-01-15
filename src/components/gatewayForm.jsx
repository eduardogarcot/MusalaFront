import React from 'react';
import Joi from "joi-browser";
import Form from "./Forms/form";

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

    componentDidMount(){
        const gatewayID = this.props.match.params.id;
        if (gatewayID === "new") return;

        const gateway = {_id:10, name:"Felipe", ipAddress:"10.8.91.145", devicesList:5};
        this.setState({data:this.mapToViewModel(gateway)})
    };

    mapToViewModel=(movie)=>{
        return {
            _id:movie._id,
            name:movie.name,
            ipAddress:movie.ipAddress,
            devicesList:movie.devicesList,
        };
    };

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