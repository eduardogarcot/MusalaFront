import React, {Component} from 'react';
import Table from "./table";

class PeripheralDevices extends Component {
    render() {
        let labels=[
            {path: "_id", label:"Device Id"},
            {path:"vendor", label:"vendor"},
            {path:"createdDate", label:"Created Date"},
            {path:"onlineStatus", label:"Is Online", content:gateway=>{
                if (gateway.onlineStatus) return <p>Yes</p>;
                    return <p>No</p>
                }},
            {path:"serialNumberId", label:"Gateway ID"}
        ];
        let gateways= [
            {_id:10, vendor:"Felipe", createdDate:"10.8.91.145", onlineStatus:true, serialNumberId:1},
            {_id:20, vendor:"Carlos", createdDate:"10.8.200.132", onlineStatus:false, serialNumberId:1},
            {_id:30, vendor:"Antonio", createdDate:"10.8.10.56", onlineStatus:false, serialNumberId:2},
            {_id:40, vendor:"Eduardo", createdDate:"10.8.56.15", onlineStatus:true, serialNumberId:1},
        ];
        return (
            <div>
                <Table columns={labels} data={gateways} />
            </div>
        );
    }
}

export default PeripheralDevices;