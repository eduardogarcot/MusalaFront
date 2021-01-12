import React, {Component} from 'react';
import Table from "./table";

class PeripheralDevices extends Component {
    render() {
        let items=[
            {key:0, label:"Device ID"},
            {key:1, label:"Vendor"},
            {key:2, label:"Created Date"},
            {key:3, label:"Is Online"},
            {key:4, label:"Connected to (Gateway ID)"}
        ];
        {/**/}

        return (
            <div>
                <Table itemsLabels={items}/>
            </div>
        );
    }
}

export default PeripheralDevices;