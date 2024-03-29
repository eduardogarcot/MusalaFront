import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <p className="navbar-brand">Practical Task</p>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/gateways">Gateways <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/peripheraldevices">Peripheral Devices <span
                            className="sr-only">(current)</span></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;