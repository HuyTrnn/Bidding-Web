import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setUsers(data.users)
                setLoading(false)
            })
        }
        fetchProducts()
    }, [])

    // State to store user name
    const [details, setDetails] = useState({ username: "", password: ""})

    const navigate = useNavigate();

    // Get to save user into localStore and Send data to ProductPage
    const handleSubmit = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (details.username == user.username &&
                details.password == user.password) {
                navigate('/mainpage');
                window.localStorage.setItem('usernameLogged', user.username);
                alert("Đăng nhập thành công");
            }
        })
        showErrorToast();
    };

    function toast({title = "", message = "", type = "info", duration = 3000}) {
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

    function showErrorToast() {
        toast({
            title: 'Đăng nhập thất bại',
            message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
            type: 'error',
            duration: 3000
        })
    }

    return (
        <div>
            <div id="toast"></div>
            <label className="home__title">Chào mừng bạn đến với trang web Đấu giá sản phẩm online</label>
            <div className="home__container">
                <form className="home__form" onSubmit={handleSubmit}>
                    <label className="home__label-login">Đăng nhập tài khoản</label>
                    <label className="home__label" htmlFor="username">Vui lòng nhập tên tài khoản</label>
                    <input
                        type="text"
                        name="username"
                        className="home__input"
                        onChange={e => setDetails({ ...details, username: e.target.value })}
                        value={details.username}
                        required
                        minLength={5}
                        placeholder="Username ..."
                    />

                    <label className="home__label home__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        className="home__input"
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        value={details.password}
                        required
                        minLength={6}
                        placeholder="Password ..."
                    />
                    <button className="btn">ĐĂNG NHẬP</button>
                </form>
            </div>
            <div className="home__direct">
                <div>
                    <label className="home__question">Nếu bạn chưa có tài khoản trước đây?</label>
                    <a
                        className="home__register"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/register';
                        }}
                    >
                        Đăng ký ngay</a>
                </div>

            </div>
            <div className="home__copyright">
                <label>© Bản quyền thuộc Nhóm 3 - 2022</label>
            </div>
        </div>


    );
};

export default Home;