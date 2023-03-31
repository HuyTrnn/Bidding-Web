import React from "react"
import { useEffect, useState, useContext } from 'react'

const ListProduct = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <div className="product__container">
                <label className='product__title'>Danh sách sản phẩm đang đấu giá</label>
                <div className='product__panel'></div>
                <div className='product__table-container'>
                    <div className='product__sort'>
                        <h2 className='product__sort-title'>Sắp xếp theo:</h2>
                        <button className='product__sort-btn'>từ A - Z </button>
                        <button className='product__sort-btn'>từ Z - A</button>
                        <button className='product__sort-btn'>Giá từ thấp - cao</button>
                        <button className='product__sort-btn'>Giá từ cao đến thấp</button>
                    </div>
                    <div className='product__list'>
                        {loading ?
                            <div className='product__item'>
                                <div className='product__item-img'></div>
                                <h3 className='product__item-title'>Loading...</h3>
                                <p className='product__item-price'>Loading...</p>
                            </div> :
                            products.map((product, index) => (
                                <div className='product__item'>
                                    <div className='product__item-img'></div>
                                    <h3 className='product__item-title'>{product.name}</h3>
                                    <p className='product__item-price'>Giá tiền: {product.price} $</p>
                                    <div className='product__item-favorite'>Yêu thích</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProduct;