import { useEffect, useState } from "react"
import TimeStart from "./TimeStart";


function BiddedProduct() {

    const [users, setUser] = useState([])
    const [loading,setLoading] = useState(false)

    const [products, setProducts] = useState([])



    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setUser(data.users)
                setLoading(false)
            })
        }
        fetchProducts()
        
    },[])

    return (
    <div>
        <label className='product__title'>Danh sách sản phẩm đã đấu giá</label>
                    <table className='product__table-bidded'>
                        <thead>
                            <tr style={{ backgroundColor: '#d6f5d6' }}>
                                <th>Chủ sở hữu ban đầu</th>
                                <th>Tên sản phẩm</th>
                                <th>Thời gian mở phiên</th>
                                <th>Thời gian đấu giá còn lại</th>
                                <th>Giá sản phẩm</th>
                                <th>Chủ sở hữu cuối</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td>Loading...</td></tr> : products.map((product, index) => (
                                <tr  key={index}>
                                    <td style={{ color: "#6600cc", fontWeight: 600, fontSize: 16 }}>{product.owner}</td>
                                    <td style={{ textAlign: "left", lineHeight: 1.5 }}>{product.name}</td>
                                    <td>{product.date} {product.hour}<TimeStart product={product} /></td>
                                    <td>--</td>
                                    <td style={{ color: "red", fontWeight: 600 }}>{product.price} $</td>
                                    <td style={{ background: "#ffe6e6", fontWeight: 600 }}>{product.last_bidder || "None"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    </div>
    )
}

export default BiddedProduct;