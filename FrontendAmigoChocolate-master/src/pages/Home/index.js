import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../services/auth'
import logo from '../../assets/logo.png';
import { FiUser, FiUsers, FiLogOut, FiSearch, FiPlus } from 'react-icons/fi';
import './styles.css'
import api from '../../services/api';


export default function Home() {
    const [groups, setGroups] = useState([]);
    const userId = localStorage.getItem('userId')
    const history = useHistory();
    async function handleLogout() {
        logout();
        history.push('/')
    }
    useEffect(() => {
        api.get('groups', {
            headers: {
                id: userId
            }
        }).then(response => {
            setGroups(response.data);
        })
    }, [userId])

    async function Group(groupId){
        localStorage.setItem('groupId',groupId)
        history.push(`group/${groupId}`)
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" />

            <div className="content">
                <button className="btn" onClick={() => history.push('/wishlist')}>Lista de Desejo</button>
                <button className="perfil-user" onClick={() => history.push('/profile')}><FiUser size={30} color="#fff" /></button>
                <button className="search-group" onClick={() => history.push('/groups')}><FiSearch size={30} color="#fff" /></button>
                <button onClick={handleLogout} className="log-out"><FiLogOut size={30} color="#fff" /></button>
                <div className="group-container">
                    <ul>
                        {
                            groups.map(group => (
                                <li key={group._id}>
                                    <div onClick={() => Group(group._id)}>
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
                <Link className="btn" to="/groups/new"><FiPlus size={40} color="#FFF" />Criar Grupo</Link>
            </div>
        </div>
    )
}