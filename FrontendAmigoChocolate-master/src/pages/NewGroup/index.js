import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import './style.css'
import { useHistory } from 'react-router-dom';

export default function NewGroup() {
    const userId = localStorage.getItem('userId');

    const [name, setName] = useState('');
    const [minimumValue, setMinumumValue] = useState();
    const [maximunValue, setMaximumValue] = useState();
    const [drawDate, setDrawDate] = useState();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name, minimumValue, maximunValue, drawDate
        }

        try {
            await api.post('groups', data, {
                headers: {
                    id: userId,
                }
            });
            history.push('/home')
        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro tente novamente');
        }
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" />
            <div className="content">
                <h1>Crie um grupo e convide <br />seus amigos.</h1>
                <form onSubmit={handleSubmit}>
                    <label>Nome do Grupo: *</label>
                    <input placeholder="Nome do Grupo: *"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label>Valor minimo do presente: *</label>
                    <input placeholder="Valor Min: *"
                        type="number"
                        id="minimumValue"
                        value={minimumValue}
                        onChange={e => setMinumumValue(e.target.value)} />
                    <label>Valor maximo do presente: *</label>
                    <input placeholder="Valor Max: *"
                        type="number"
                        id="maximunValue"
                        value={maximunValue}
                        onChange={e => setMaximumValue(e.target.value)} />
                    <label>Data do sorteio: *</label>
                    <input type="date"
                        placeholder="Data do sorteio: *"
                        value={drawDate}
                        onChange={e => setDrawDate(e.target.value)} />
                    <button className="btn" type="submit">Criar Grupo</button>
                    <Link to="/home"><FiArrowLeft size="16" /> Voltar ao inicio</Link>
                </form>
            </div>
        </div>
    )
}