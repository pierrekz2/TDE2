import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';
import { FiArrowLeft,FiUsers,FiUser } from 'react-icons/fi';
import api from '../../services/api';

export default function Group() {
    const history = useHistory();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        api.get('allgroups').then(response => {
            setGroups(response.data)
        })
    }, [])

    async function GroupIn(groupId){
        localStorage.setItem('groupId',groupId)
        history.push(`group/${groupId}`)
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" />
            <div className="content">
                <Link to="/home"><FiArrowLeft size="16" /> Voltar ao inicio</Link>
                <div className="group-container">
                    <ul>
                        {
                            groups.map(group => (
                                <li key={group._id}>
                                    <div onClick={() => GroupIn(group._id)}>
                                        <h1><FiUsers size={40} color="#000" /></h1>
                                        <h3>{group.name}</h3>
                                        <strong>{`sorteio em ${group.drawDate}`}</strong>
                                        <p><FiUser size={16} color="#000" />10 / 20</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}