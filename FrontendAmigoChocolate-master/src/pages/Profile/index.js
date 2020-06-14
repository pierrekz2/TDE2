import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './style.css'


export default function Profile() {
    const [name, getName] = useState('');
    const [email, getEmail] = useState('');
    const [birthday, getBirthday] = useState('');

    const UserId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('users', {
            headers: {
                id: UserId
            }
        }).then(response => {
            getName(response.data.name);
            getEmail(response.data.email);
            getBirthday(response.data.birthday);

        })

    }, [])

    return (
        <div className="container">
            <img src={logo} alt="logo" />
            <div className="content">
                <Link to="/home"><FiArrowLeft size="16" /> Voltar</Link>
                <h1>Perfil do usuario</h1>
                <form>
                    <strong>Nome:</strong>
                    <label>{name}</label>
                    <strong>E-mail:</strong>
                    <label>{email}</label>
                    <strong>Data de Nascimento:</strong>
                    <label>{birthday}</label>
                </form>
            </div>
        </div>
    )
}