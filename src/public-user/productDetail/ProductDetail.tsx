import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/ProductsServices'
import Button from 'react-bootstrap/Button';
import Product from '../../models/Product';
import { Card } from 'react-bootstrap';
import './ProductDetail.css'
import Star from './StarRating';

const ProductDetail = () => {
    const initProduct: Product = {
        title: '',
        desc: '',
        price: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        image: ''
    }
    const { id } = useParams()
    const [chosenProduct, setChosenProduct] = useState<Product>(initProduct)
    const [rating, setRating] = useState(0)

    const fetchProductById = useCallback(async () => {
        let product = await getProductById(id)
        setChosenProduct(product)
        setRating(Number(product.rating))
    }, [id])

    useEffect(() => {
        fetchProductById()
    }, [fetchProductById])

    return (
        <div className="detail-container">
            <Card className='detail-card' >
                <Card.Img className='detail-img' src={chosenProduct.image} />
                <Card.Body>

                    <h1 className="title">{chosenProduct.title}</h1>
                    <p className="price">${chosenProduct.price}</p>
                    <div>
                        <Star number={rating} key={chosenProduct.id} />
                        <span className='rating'> {chosenProduct.rating} </span>
                        <span className='divider'>|</span>
                        <span className='stock'> Stock: {chosenProduct.stock}</span>

                    </div>

                    <div className='tags-contain'>
                        <span>Tags</span>
                        <br></br>
                        <div className='tags'>{chosenProduct.brand} </div>
                        <div className='tags'> {chosenProduct.category}</div>
                    </div>
                    <div>
                        <span>Product Description</span>
                        <br></br>
                        <p>{chosenProduct.desc}</p>
                    </div>


                    <div className='div-button'>
                        <Button className='add-btn' variant='primary' >Add to cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>

    )
}

export default ProductDetail