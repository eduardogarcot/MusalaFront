import React, {Component} from 'react';
import Table from "./Table/table";
import {Link} from "react-router-dom";
import axios from "axios";
import * as myConstants from "./Services/http";
import {toast} from "react-toastify";

class PeripheralDevices extends Component {
    state={
        peripheralDevices:[]
    };

    async componentDidMount(){
        const endpoint = myConstants.ENDPOINTS + "peripheraldevices";
        let data = await axios.get(endpoint);
        this.setState({peripheralDevices:data.data});
    };

    mapToViewModel=(pd)=>{
        return {
            _id: pd.deviceId,
            vendor: pd.vendor,
            createdDate: pd.createdDate,
            onlineStatus: pd.onlineStatus,
            serialNumberId:pd.serialNumberId
        }};

    handleDelete = async (id) => {
        let endpoint = myConstants.ENDPOINTS +"peripheraldevices";
        try {
            await axios.delete(`${endpoint}/${id}`,id)
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("This peripheral device has already been deleted");
            }
        }
        window.location.reload(false);
    };

    render() {
        let labels=[
            {path: "_id", label:"Device Id", content:pd=><Link to={`/peripheraldevices/${pd._id}`}>{pd._id}</Link>},
            {path:"vendor", label:"Vendor"},
            {path:"createdDate", label:"Created Date(YYYY/MM/DD)"},
            {path:"onlineStatus", label:"Is Online", content:gateway=>{
                if (gateway.onlineStatus) return <p>Yes</p>;
                    return <p>No</p>
                }},
            {path:"serialNumberId", label:"Gateway ID"},
            {path:"delete", label:"Delete", content:(peripheralDevice)=> <button className="btn btn-sm btn-danger" onClick={()=>this.handleDelete(peripheralDevice._id)}>Delete</button>}
        ];
        let peripheralDevicesList= this.state.peripheralDevices.map(pd=>this.mapToViewModel(pd));
        if (peripheralDevicesList.length===0)
            return <React.Fragment>
                <h1>There is no register of Peripheral Devices</h1>
                <Link to="/peripheraldevices/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Peripheral Device </Link>
            </React.Fragment>;
        return (
            <div>
                <Link to="/peripheraldevices/new" className="btn btn-primary" style={{marginBottom:20, marginTop:20}}> New Peripheral Device </Link>
                <Table columns={labels} data={peripheralDevicesList} />
            </div>
        );
    }
}

export default PeripheralDevices;