import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = ({ socket }) => {
    const navigate = useNavigate();

    const [notification, setNotification] = useState('');

    //Listens after a product is added
    useEffect(() => {
        socket.on('addProductResponse', (data) => {
            setNotification(
                `${data.owner} đã đấu giá sản phẩm ${data.name} với giá trị $${Number(
                    data.price
                ).toLocaleString()}`
            );
        });
    }, [socket]);

    useEffect(() => {
        socket.on('setWinner', (data) => {
            setNotification(
                `Tài khoản ${data.owner} đã là người chiến thắng khi đấu giá sản phẩm ${data.name} với số tiền là $${Number(data.price).toLocaleString()}`
            );
        });
    }, [socket]);

    //Listens after a user places a bid
    useEffect(() => {
        socket.on('bidProductResponse', (data) => {
            setNotification(
                `Tài khoản ${data.last_bidder} vừa đấu giá mua sản phẩm ${data.name} là $${Number(data.amount).toLocaleString()}`
            );
        });
    }, [socket]);


    return (
        <nav className="navbar">
            <div className="header">
                <h2 className='header-title' onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/mainpage';
                }}>Đấu giá sản phẩm online</h2>
            </div>

            <div className="div__notification">
                <p className="notification" style={{ color: '#fff', fontSize: 17 }}>{notification}</p>
            </div>
            <div className="navbar__title">Lập trình mạng - Nhóm 3</div>
        </nav>
    );
};

export default Nav;