import { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts, getProductByCategory, getProductByQuery } from '../../services/ProductsServices'
import ProductCard from '../../admin/productManagement/productCard/ProductCard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Product from '../../models/Product'
import { Col, Container, Row } from 'react-bootstrap'
import Category from './Category'
import './Home.css'
import { useAppDispatch } from '../../features/store'
import { cartAdded } from '../../features/cart/cartSlice'
import { useWindowDimensions } from '../../hooks/useWindowDimensionsHook'

const Home = () => {
    const { height, width } = useWindowDimensions();
    const [chosenCtg, setChosenCtg] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [buttonId, setButtonId] = useState<string | undefined>('')
    const [search] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    const fetchProducts = async () => {
        const { products } = await getAllProducts()
        setProducts(products)
    }

    const fetchProductsByCategory = async (chosenCtg: string) => {
        let { products } = await getProductByCategory(chosenCtg)
        setProducts(products)
    }

    const fetchProductsByQuery = async (keyword: string) => {
        let { products } = await getProductByQuery(keyword)
        setProducts(products)
    }

    useEffect(() => {
        if (chosenCtg !== '') {
            fetchProductsByCategory(chosenCtg)

        }

    }, [chosenCtg])

    useEffect(() => {
        if (search.toString()) {
            fetchProductsByQuery(search.toString().trim())
        } else {
            setChosenCtg('')
            fetchProducts()
        }
    }, [search])

    const gotoDetail = (id: any) => {
        navigate(`/products/${id}`)
    }

    const handleAdd = (product: Product) => {
        const { id, title, desc, price, stock, image } = product
        setIsLoading(true)
        try {
            dispatch(
                cartAdded(id, title, desc, price, stock, image)
            )
            alert('succesfully added to cart')
        } catch (error) {
            alert('error in adding to cart')
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Container fluid='true' style={{ margin: '10px' }}>
            <Row>
                <Col xs={4} sm={2} className='categories'>
                    <h3 >Category</h3>

                    {<Category setChosenCtg={setChosenCtg} />}
                </Col>
                <Col >
                    <div className='listed-products'>
                        <h3>Selected Category: {chosenCtg ? chosenCtg : 'All'}</h3>
                        <Row lg={4} sm={1} md={2} className='public-product-list'>
                            {products.map(product => (
                                <ProductCard handleCardClick={gotoDetail} key={product.id} variant='outline-secondary' product={product} handleButtonClick={handleAdd} buttonText='Add to cart'
                                    isLoading={isLoading}
                                    buttonId={buttonId} />
                            ))}
                        </Row>
                    </div>

                </Col>
            </Row>
        </Container>
    )


}

export default Home