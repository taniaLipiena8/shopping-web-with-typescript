import { useEffect, useState } from "react"
import { deleteProduct, getAllProducts } from "../../../services/ProductsServices"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Product from "../../../models/Product";
import './ProductsList.css'
import { Container, Row } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";


const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [buttonId, setButtonId] = useState<string | undefined>('')
    const navigate = useNavigate()
  

    const fetchProducts = async () => {
        const { products } = await getAllProducts()
        setProducts(products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (product: Product) => {
        let { id } = product
        setIsLoading(true)
        setButtonId(id)
        try {
            let resp = await deleteProduct(id)
            console.log(resp);
            alert('Product deleted successfully')
            
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
            setButtonId('')
        }
    }

    const handleCardClick = (id: any) => {
        navigate('/admin/products')
    }


    return (
        <>
            <Container fluid='true' className="product-list">
                <div className="AddButton">
                    <Button variant="primary" className="add-button" onClick={() => navigate('/admin/add')}>
                        + Add New Product
                    </Button>
                </div>
                <Row lg={5} className="justify-content-center">
                    {products.map(product => (
                        <ProductCard handleCardClick={handleCardClick} key={product.id} variant="outline-danger" product={product} handleButtonClick={handleDelete} buttonText="Delete"
                            isLoading={isLoading}
                            buttonId={buttonId} />
                    ))}

                </Row>
            </Container>
        </>

    )
}

export default ProductsList