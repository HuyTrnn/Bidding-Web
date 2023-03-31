import React, { useEffect, useState, useContext,  } from 'react'
import EditButton from "./EditButton"
import TimeEnd from './TimeEnd'
import TimeStart from './TimeStart'
import { Link } from "react-router-dom"
import BiddedProduct from "./BiddedProduct"
import AddProduct from "./AddProduct"

const Products = ({ socket }) => {


    
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState(0)
    const [users, setUser] = useState([])
    const [fee, setFee] = useState()
    const [loading,setLoading] = useState(false)
    const [biddedItem, setBiddedItem] = useState()

    const [status, setStatus] = useState(true)

    const [products, setProducts] = useState([])
    const [bidtime, setBidtime] = useState()
    const [is_bidded, setIsBidded] = useState(false)

    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);
    const currentHours = currentTime.getHours(); // lấy ra gio
    const currentMinute = currentTime.getMinutes(); // lấy ra phút

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setUser(data.users)
                setLoading(false)
            })
        }
        fetchProducts()
        getBiddedProduct()
        setStatus(false)
    },[])
    
    useEffect(() => {
        {
            socket.on('bidProductResponse', data => {
                setFee(data)
                window.location.href = window.location.href
            })

            users.map((user, index) => {
                if (user.username == window.localStorage.getItem('usernameLogged')) {
                    setUserName(user.username)
                    setBalance(user.balence)
                }
            })
            // Kiểm tra sản phẩm đang đấu giá
            products.map((product, index) => {
                if (Number(product.start) == currentTime.getMinutes() && Number(product.hour) == Number(currentHours)) {
                    var timeCount = (product.end - product.start) * 60;
                    
                    if(status == false){
                        setBiddedItem(product);
                    }
                    const x = setInterval(() => {
                        timeCount--;
                        if (timeCount == 0) {
                            if (product.last_bidder != undefined) {
                                alert('Chúc mừng người chiến thắng của sản phẩm ' + product.name + ' là ' + product.last_bidder)
                                socket.on('bidProductResponse', data => {
                                    setIsBidded(true);
                                    window.location.href = window.location.href
                                })
                                window.location.href = window.location.href
                                
                            }
                            else {
                                alert('Sản phẩm ' + product.name + ' đã kết thúc thời gian đấu giá mà không tìm được người chiến thắng!')
                                socket.emit("bidProduct", { is_bidded: true })
                                const newOwner = product.last_bidder;
                                socket.emit("setOwner", { owner: newOwner });
                                window.location.href = window.location.href
                            }
                        }

                        if (timeCount < 0) {
                            setIsBidded(false)
                            clearInterval(x)
                        }
                    }, 1000)

                }
                
            })
        }
    })

    
console.log(status);

    function getBiddedProduct() {
        if (setIsBidded == false ) {
            console.log('đúng');
        }
    }
   

    return (
        <div>
            <div className="product__container">
                <label className="user-login">
                    <div className="user-login-info">
                        Xin chào, <div className="user-login-name">{username}</div>
                        <p className="user-login-name"></p>
                        - Số dư hiện tại: <div className="user-login-balence">{userBalance}</div>
                        <p className="user-login-balence"></p>
                        $
                    </div>
                </label>
                <label className='product__title'>Sản phẩm đang đấu giá</label>
                <div className='product__table-container'>
                    <table>
                        <thead>
                            <tr style={{ backgroundColor: '#d6f5d6' }}>
                                <th>Chủ sở hữu</th>
                                <th>Tên sản phẩm</th>
                                <th>Thời gian mở phiên đấu giá</th>
                                <th>Thời gian đấu giá còn lại</th>
                                <th>Giá sản phẩm</th>
                                <th>Người đấu giá cuối</th>
                                <th>Đấu giá</th>
                            </tr>
                        </thead>
                        <tbody className="product__body-data">
                            {status ? <tr className="product__body-data--empty">Danh sách trống...</tr> : 
                                <tr className="product__row-data" >
                                    <td style={{ color: "#6600cc", fontWeight: 600, fontSize: 16 }}>{biddedItem.owner}</td>
                                    <td style={{ textAlign: "left", lineHeight: 1.5 }}>{biddedItem.name}</td>
                                    <td>{biddedItem.date} {biddedItem.hour}<TimeStart product={biddedItem} /></td>
                                    <td>--</td>
                                    <td style={{ color: "red", fontWeight: 600 }}>{biddedItem.price} $</td>
                                    <td style={{ background: "#ffe6e6" }}>{biddedItem.last_bidder || "None"}</td>
                                    <td >{<EditButton socket={socket} product={biddedItem} />}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                        
                    <Link to="/products/add" className='btn products__cta' product={products}>Thêm sản phẩm</Link>

                    <BiddedProduct status={loading}/>
                </div>
            </div>
        </div>
    )
}

export default Products


{/* <tr className="product__row-data" >
                                    <td style={{ color: "#6600cc", fontWeight: 600, fontSize: 16 }}>{biddedItem.owner}</td>
                                    <td style={{ textAlign: "left", lineHeight: 1.5 }}>{biddedItem.name}</td>
                                    <td>{biddedItem.date} {biddedItem.hour}<TimeStart product={biddedItem} /></td>
                                    <td>--</td>
                                    <td style={{ color: "red", fontWeight: 600 }}>{biddedItem.price} $</td>
                                    <td style={{ background: "#ffe6e6" }}>{biddedItem.last_bidder || "None"}</td>
                                    <td >{<EditButton socket={socket} product={biddedItem} />}</td>
                                </tr> */}