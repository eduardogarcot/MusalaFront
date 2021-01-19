import React from 'react';
import Joi from "joi-browser";
import Form from "./Forms/form";
import axios from "axios";
import {toast} from "react-toastify";
import * as myConstants from "./Services/http";


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
        let endpoint = myConstants.ENDPOINTS +"gateways/"+gatewayID.toString();
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
            this.props.history.push("/gateways");
            return;
        }
        this.setState({data:this.mapToViewModel(data.data)})
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
        let endpoint = myConstants.ENDPOINTS +"gateways";
        if (id==="new"){
            try {
                await axios.post(endpoint,data)
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Error: Invalid IP Address, or this gateways has already exist");
                    return;
                }
            }
            this.props.history.push("/");
            return;
        }
        try{
            await axios.put(`${endpoint}/${id}`,data)
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