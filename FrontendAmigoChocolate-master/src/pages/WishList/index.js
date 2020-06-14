import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle, FiTrash } from 'react-icons/fi';
import logo from '../../assets/logo.png';

import api from '../../services/api';

import './style.css'
export default function WishList() {
    const [wishlist, setWishList] = useState([]);
    const UserId = localStorage.getItem('userId');
    const history = useHistory();
    useEffect(() => {
        api.get('wishlist', {
            headers: {
                id: UserId,
            }
        }).then(response => {
            setWishList(response.data);
        })
    }, [UserId])

    async function handleDelete(id, user) {
        try {
            await api.delete(`wishlist/${id}`, {
                headers: {
                    id: user,
                    user: UserId
                }
            });

            setWishList(wishlist.filter(wish => wish._id !== id));

        } catch (err) {
            alert('Erro ao deletar, tente novamente!')
        }
    }
    return (
        <div className="container">
            <img src={logo} alt="logo" />
            <div className="content">
                <Link to="/home"><FiArrowLeft size="16" /> Voltar para home</Link>
                <h1>Lista de desejo</h1>
                <div className="wishilist-content">
                    <ul>
                        {
                            wishlist.map(wish => (
                                <li key={wish._id}>
                                    <div>
                                        <h3>Desejo:</h3>
                                        <p>{wish.name}</p>
                                        <h3>Descrição:</h3>
                                        <p>{wish.description}</p>
                                        <button type="button" className="trash" onClick={() => handleDelete(wish._id, wish.user)}>
                                            <FiTrash size="16" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        <li>
                            <div>
                                <button onClick={() => history.push('/wish/new')}>
                                    <FiPlusCircle size="30" />
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}