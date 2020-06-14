import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logo from '../../assets/logo.png'

import './styles.css'

import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name, email, password, birthday
        };

        try{
            const response = await api.post('users', data)
            history.push('/');
            alert(`Olá ${response.data.name} sua conta foi criada com sucesso, faça login para utilizar nosso app`)

        }catch(err){
            alert('Erro no cadastro tente novamente')
        }
        
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" />

            <div className="content">
                <h1>Faça seu cadastro e participe <br /> desta delicia de app.</h1>

                <form onSubmit={handleRegister}>
                    <input
                        id="name"
                        placeholder="Nome:"
                        value={name}
                        onChange={e => setName(e.target.value)}
                         />

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail:" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />

                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha:" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>

                    <input
                        type="date"
                        id="date"
                        placeholder="Data de nascimento:" 
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}/>

                    <button className="btn" type="submit">Cadastrar</button>
                </form>
                <a href="/">
                    <FiArrowLeft size={16} color="#fff" />
                    Já tenho cadastro!
                </a>
            </div>
        </div>
    )
}