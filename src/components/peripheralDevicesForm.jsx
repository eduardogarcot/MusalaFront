import React from 'react';
import Joi from 'joi-browser';
import Form from "./Forms/form";
import axios from "axios";
import {toast} from "react-toastify";
import * as myConstants from "./Services/http";

class PeripheralDevicesForm extends Form {
    state = {
        data: {
            _id:"",
            vendor:"",
            createdDate:"",
            onlineStatus:"",
            serialNumberId:""
        },
        errors:{},
        gateways:[]
    };

    schema= {
        _id: Joi.number()
            .required()
            .label("Device Id"),
        vendor: Joi.string()
            .required()
            .label("Vendor"),
        createdDate: Joi.date()
            .required()
            .label("Crated Date"),
        onlineStatus: Joi.boolean()
            .label("Is Online"),
        serialNumberId: Joi.number()
            .required()
            .label("Gateway ID")
    };

    async componentDidMount(){
        const pdID = this.props.match.params.id;
        let endpoint = myConstants.ENDPOINTS + "gateways";
        let gatewaysList = await axios.get(endpoint);
        const list = gatewaysList.data.filter((gateway)=>gateway.devicesList.length<10);
        if (pdID === "new") {
            this.setState({gateways:list});
            return;
        }
        endpoint = myConstants.ENDPOINTS+"peripheraldevices/"+pdID.toString();
        let data = {};
        try {
            data = await axios.get(endpoint)
        }catch(error){
            if (error.response && error.response.status === 404)
            {
                toast.error("This Peripheral Device is not exist");
                this.props.history.push("/peripheraldevices");
                return;
            }
            this.props.history.push("/peripheraldevices");
            return;
        }
        this.setState({data:this.mapToViewModel(data.data),gateways:list})
    };

    mapToViewModel=(pd)=>{
        return {
            _id: pd.deviceId,
            vendor: pd.vendor,
            createdDate: pd.createdDate,
            onlineStatus: pd.onlineStatus,
            serialNumberId:pd.serialNumberId
        }};
    
    mapToPDModel=(pd)=>{
        return {
            deviceId: pd._id,
            vendor: pd.vendor,
            createdDate: pd.createdDate,
            onlineStatus: pd.onlineStatus,
            serialNumberId:pd.serialNumberId
        }};

    doSubmit = async ()=>{
        const {id}=this.props.match.params;
        const data =this.mapToPDModel(this.state.data);
        let endpoint = myConstants.ENDPOINTS + "peripheraldevices";
        if (id==="new"){
            try {
                await axios.post(endpoint,data)
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Error: Invalid Gateway ID, Created Date or this Peripheral Device has already exist");
                    return;
                }
                return;
            }
            this.props.history.push("/peripheraldevices");
            return;
        }
        try{
            await axios.put(`${endpoint}/${id}`,data)
        }
        catch(error){
            if (error.response && error.response.status === 400) {
                toast.error("Error: Invalid Gateway ID or Created Date");
                return;
            }
            if (error.response && error.response.status === 404) {
                toast.error("The Peripheral Device is not stored in the database");
                this.props.history.push("/peripheraldevices");
                return;
            }
            return;
        }
        this.props.history.push("/peripheraldevices");
    };

    getGatewaysID = () =>{
        const {gateways} = this.state;
        return gateways.map(gateway => {
            if (gateway.devicesList.length < 10)
                return {_id: "gateway"+gateway.serialNumberId, value: gateway.serialNumberId, label: gateway.serialNumberId}
        });
    }

    render() {
        const idPD=this.props.match.params.id;
        return (
            <div>
                <h1> Peripheral Device Form</h1>
                <form>
                    {idPD === "new" && this.renderInput("_id", "Device Id", "number")}
                    {this.renderInput("vendor", "Vendor")}
                    {this.renderInput("createdDate", "Created Date(YYYY/MM/DD)")}
                    {this.renderListBox("onlineStatus", "is Online", [{_id:1, value:true, label:"Yes"}, {_id:2, value:false, label:"No"}])}
                    {this.renderListBox("serialNumberId", "Gateway ID", this.getGatewaysID())}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
export default PeripheralDevicesForm