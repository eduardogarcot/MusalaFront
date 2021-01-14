import React from 'react';
import Joi from 'joi-browser';
import Form from "./form";

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

    componentDidMount(){
        const pdID = this.props.match.params.id;
        if (pdID === "new") return;

        const peripheralDevice = {_id:10, vendor:"Felipe", createdDate:"10.8.91.145", onlineStatus:true, serialNumberId:1};
        this.setState({data:this.mapToViewModel(peripheralDevice)})
    };

    mapToViewModel=(movie)=>{
      return {
          _id:movie._id,
          vendor:movie.vendor,
          createdDate:movie.createdDate,
          onlineStatus:movie.onlineStatus,
          serialNumberId:movie.serialNumberId
      };
    };

    doSubmit = ()=>{
        this.props.history.push("/peripheraldevices")
    };
    render() {
        return (
            <div>
                <h1> Peripheral Device Form</h1>
                <form>

                    {this.renderInput("_id", "Device Id", "number")}
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