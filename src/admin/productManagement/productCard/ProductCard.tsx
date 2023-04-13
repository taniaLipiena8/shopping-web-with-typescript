import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Product from '../../../models/Product';
import './ProductCard.css'
import LoadingSpin from '../../../reusable-components/spinner/LoadingSpin';

interface ProductCardProps {
    handleCardClick: (id: any) => void
    variant: string
    product: Product
    handleButtonClick: (product: Product) => void
    buttonText: string
    isLoading: boolean
    buttonId: string|undefined
}

const ProductCard = ({ handleCardClick, variant, product, handleButtonClick, buttonText, isLoading, buttonId }: ProductCardProps) => {
    
    return (
        <Card className='product-card' key={product.id} >
            <Card.Img className='card-image' variant="top" src={product.image} onClick={() => handleCardClick(product.id)} />
            <Card.Body>
                <div className='card-text' onClick={() => handleCardClick(product.id)}>
                    <Card.Text className='product-title' >
                        {product.title}
                    </Card.Text>
                    <Card.Title className='product-price' style={{ fontWeight: 'bold' }}>${product.price}</Card.Title>
                    <Card.Text className='product-brand'>
                        {product.brand}
                    </Card.Text>
                </div>
                <div className='div-button'>
                    <Button className='card-btn' variant={variant} onClick={() => handleButtonClick(product)}>{isLoading &&buttonId === product.id? <LoadingSpin/> : buttonText }</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard