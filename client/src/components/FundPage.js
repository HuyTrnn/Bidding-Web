import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const FundPage = ({ socket, products }) => {
    const [userName, setUserName] = useState();
    const [userBalance, setuserBalance] = useState(0)
    const [balance, setBalance] = useState(0)
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api")
                .then(res => res.json())
                .then(data => {
                    setUser(data.users)
                    setLoading(false)
                })
                .catch(console.error);
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        {
            users.map((user, index) => {
                if (user.username == window.localStorage.getItem('usernameLogged')) {
                    setUserName(user.username)
                    setuserBalance(user.balence)
                }
            })
        }
    })



    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "ti-check-box",
                info: "ti-info",
                warning: "ti-close",
                error: "ti-close"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="ti-close"></i>
                      </div>
                  `;
            main.appendChild(toast);
        }
    }

    function showSuccessToast() {
        toast({
            title: 'Nạp tiền thành công!',
            message: `Bạn đã nạp tiền thàng công với số tiền là `,
            type: 'success',
            duration: 3000
        })
    }

    const handleClickRefresh = (e) => {
        e.preventDefault();
        window.location.href = window.location.href
    };
    const handleClickButtonFund = (e) => {
        e.preventDefault();
        fund();
        const userLastBidder = window.localStorage.getItem("usernameLogged")
        socket.emit("fund", {username: userLastBidder, balence: balance})
        window.confirm("Chúc mừng bạn đã nạp tiền thành công vào tài khoản")
        window.location.href = window.location.href
    };

    const fund = () => {
        setBalance(Number(prev => prev + balance));
    }

    return (
        <div>
            <div className='fund'>
                <label className='fund__header'>Nạp tiền vào tài khoản</label>
                <div className='fund__container'>
                    <div className='fund__groupbox'>
                        <div className='fund__info'>
                            <div className='fund__person'>
                                <div className='fund__person-avatar'></div>
                                <p className='fund__person-username'>{userName}</p>
                            </div>
                            <div className='fund__balence-info'>
                                <div className='fund__balence-title'>Tổng số dư:</div>
                                <div className='fund__person-balence'>{userBalance} <span>$</span></div>
                                <i className="fund__icon ti-reload" onClick={handleClickRefresh}></i>
                            </div>
                        </div>
                        <div className='fund__item fund__tilte_cash'>Số tiền nạp:</div>
                        <div className='fund__item'>
                            <input type='number'
                                placeholder='Nhập số tiền muốn nạp'
                                onChange={e => setBalance(Number(e.target.value))}
                                className='fund__input-cash'
                            >
                            </input>
                        </div>
                        <div className='fund__item'>
                            <button className="btn" onClick={handleClickButtonFund}>Nạp tiền</button>

                        </div>
                    </div>
                </div>

            </div>
            <div className="home__copyright">
                <label>© Bản quyền thuộc Nhóm 3 - 2022</label>
            </div>
        </div>
    );

}

export default FundPage;