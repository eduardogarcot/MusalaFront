import React from 'react';
import Joi from 'joi-browser';
import Form from "./Forms/form";
import axios from "axios";

class PeripheralDevicesForm extends Form {
    state = {
        data: {
            _id:"",
            vendor:"",
            createdDate:"",
            onlineStatus:"",
            serialNumberId:""
        },
        errors:{}
    };

    async componentDidMount(){
        const pdID = this.props.match.params.id;
        if (pdID === "new") return;
        const headers = {
            "Content-Type": "application/json"
        };
        const endpoint = "https://localhost:5001/api/peripheraldevices/"+pdID.toString();
        const {data} = await axios.get(endpoint,{headers})
            .catch(err=>console.log(err)) ;
        this.setState({data:this.mapToViewModel(data)})
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
    
    schema= {
        _id: Joi.number()
            .required()
            .label("Device Id"),
        vendor: Joi.string()
            .required()
            .label("Vendor"),
        createdDate: Joi.string()
            .required()
            .label("Crated Date"),
        onlineStatus: Joi.boolean()
            .label("Is Online"),
        serialNumberId: Joi.number()
            .required()
            .label("Gateway ID")
    };

    doSubmit = async ()=>{
        const {id}=this.props.match.params;
        const data =this.mapToPDModel(this.state.data);
        const headersPost = {"Content-Type": "application/json", "Access-Control-Request-Method":"OPTIONS"};
        const headersPut = {"Content-Type": "application/json", "Access-Control-Request-Method":"OPTIONS"};
        if (id==="new"){ await axios.post("https://localhost:5001/api/peripheraldevices",data)
            .catch(err=>console.log(err));
        return;}
        await axios.put(`https://localhost:5001/api/peripheraldevices/${id}`,data)
            .catch(err=>console.log(err));
        this.props.history.push("/");
    };

    render() {
        const idPD=this.props.match.params.id;
        return (
            <div>
                <h1> Peripheral Device Form</h1>
                <form>
                    {idPD === "new" && this.renderInput("_id", "Device Id", "number")}
                    {this.renderInput("vendor", "Vendor")}
                    {this.renderInput("createdDate", "Created Date")}
                    {this.renderListBox("onlineStatus", "is Online", [{_id:1, value:true, label:"Yes"}, {_id:2, value:false, label:"No"}])}
                    {this.renderInput("serialNumberId", "Gateway ID", "number")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
export default PeripheralDevicesForm