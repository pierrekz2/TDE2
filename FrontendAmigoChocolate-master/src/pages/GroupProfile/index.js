import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';
import { FiArrowLeft, FiUsers, FiUser } from 'react-icons/fi';
import api from '../../services/api';

export default function GroupProfile() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [drawdate, setDrawdate] = useState();
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [memberss, setMembers] = useState([]);

    const groupId = localStorage.getItem('groupId');
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        api.get(`group/${groupId}`).then(response => {
            setName(response.data.name)
            setDrawdate(response.data.drawDate)
            setMinValue(response.data.minimumValue)
            setMaxValue(response.data.maximunValue)
            setMembers(response.data.members)
        })
    }, [groupId])

    async function handleAddToGroup(e){
        e.preventDefault();
        const members = [{
            participants:userId
        }]
        try {
            await api.put(`addtogroups/${groupId}`,members)
            history.push('/home');
        }catch(err){
            alert('impossivel entrar no grupo...')
        }
    }
    return (
        <div className='container'>
            <img src={logo} alt="logo" />
            <div className='content'>
                <Link to="/home"><FiArrowLeft size="16" /> Voltar ao inicio</Link>
                <div className='group-profile'>
                    <h1>{name}</h1>
                    <p>Sorteio dia: {drawdate}</p>
                    <p>Valor minimo: {minValue}</p>
                    <p>Valor Maximo: {maxValue}</p>
                </div>
                <strong>Membros: </strong>
                <ul className='memberss'>
                    {
                        memberss.map(member => (
                            <li>
                                <p><FiUser size='20' />{member.participants} </p>
                            </li>
                        ))
                    }
                </ul>
                <button className='btn' onClick={handleAddToGroup}>Entrar no grupo</button>
            </div>
        </div>
    )
}