import React, {Component} from 'react';
import Table from "./table";

class Gateways extends Component {

    render() {
        let items=[
            {key:0, label:"ID Serial Number"},
            {key:1, label:"Name"},
            {key:2, label:"IP Address"},
            {key:3, label:"Devices Connected"}
        ];
        {/**/}

        return (
            <div>
                <Table itemsLabels={items}/>
            </div>
        );
    }
}

export default Gateways;