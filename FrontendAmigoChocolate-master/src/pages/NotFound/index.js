import React from 'react';
import logo from '../../assets/logo.png';

export default function NotFound() {
    return (
        <div className="container">
            <img src={logo} alt="logo" />
            <div className="content">
                <h1>404</h1>
                <label>page not found</label>
            </div>
        </div>
    )
}