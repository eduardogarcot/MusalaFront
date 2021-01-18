import React from 'react';
import Joi from "joi-browser";
import Form from "./Forms/form";
import axios from "axios";
import {toast} from "react-toastify";

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
        devicesList: Joi.array().items(Joi.string().allow(null).allow(''))
            .label("Connected Devices"),
        ipAddress: Joi.string()
            .required()
            .label("Ip Address")
    };

    async componentDidMount(){
        const gatewayID = this.props.match.params.id;
        if (gatewayID === "new") {
            let tempGateway = {...this.state.data};
            tempGateway.devicesList = [];
            this.setState({data: tempGateway});
            return;
        }
        const endpoint = "https://localhost:5001/api/gateways/"+gatewayID.toString();
        let data = {};
        try {
            data = await axios.get(endpoint)
        } catch(error){
            if (error.response && error.response.status === 404)
            {
                toast.error("This gateway is not exist");
                this.props.history.push("/gateways");
                return;
            }
            toast.error("Unexpected Error");
            this.props.history.push("/gateways");
            return;
        }
        this.setState({data:this.mapToViewModel({data})})
    };

    mapToViewModel=(gateway)=>{
        return {
            _id: gateway.serialNumberId,
            name: gateway.name,
            ipAddress: gateway.ipAddress,
            devicesList: gateway.devicesList,
        }};

    mapToGatewayModel=(gateway)=>{
        return {
            serialNumberId: gateway._id,
            name: gateway.name,
            ipAddress: gateway.ipAddress,
            devicesList: gateway.devicesList,
        }};

    doSubmit = async ()=>{
        const {id}=this.props.match.params;
        const data =this.mapToGatewayModel(this.state.data);
        if (id==="new"){
            try {
                await axios.post("https://localhost:5001/api/gateways",data)
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Invalid IP Address, invalid Name, or this gateways has already exist");
                    return;
                }
                toast.error("Unexpected Error");
                return;
            }
            this.props.history.push("/");
            return;
        }
        try{
            await axios.put(`https://localhost:5001/api/gateways/${id}`,data)
        }
        catch(error){
            if (error.response && error.response.status === 400) {
                toast.error("Invalid IP Address");
                return;
            }
            if (error.response && error.response.status === 404) {
                toast.error("The Gateway is not stored in the database");
                this.props.history.push("/gateways");
                return;
            }
            toast.error("Unexpected Error");
            this.props.history.push("/gateways");
        }
        this.props.history.push("/gateways");
    };

    render() {
        const idSelect=this.props.match.params.id;
        return (
            <div>
                <h1> Gateways Form</h1>
                <form>
                    {idSelect === "new" && this.renderInput("_id", "ID Serial Number", "number")}
                    {this.renderInput("name", "Name")}
                    {this.renderInput("ipAddress", "IP Address")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default GatewayForm;