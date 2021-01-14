import React, {Component} from 'react';

class GatewayForm extends Component {
    render() {
        const {match} = this.props;
        return (
            <div>
                <p>Gateways Form {match.params.id}</p>
            </div>
        );
    }
}
export default GatewayForm;