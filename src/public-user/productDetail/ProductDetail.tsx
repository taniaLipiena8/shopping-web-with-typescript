import React, { useState, useEffect,} from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/ProductsServices";
import Button from "react-bootstrap/Button";
import Product from "../../models/Product";
import { Card } from "react-bootstrap";
import "./ProductDetail.css";
import Star from "./StarRating";
import { useAppDispatch } from "../../features/store";
import { cartAdded } from "../../features/cart/cartSlice";
import { Loading } from "../../reusable-components/LoadingSpin";

const ProductDetail = () => {
  const initProduct: Product = {
    title: "",
    desc: "",
    price: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    image: "",
  };
  const { id } = useParams();
  const [chosenProduct, setChosenProduct] = useState<Product>(initProduct);
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const fetchProductById =async () => {
      setPageLoading(true);
      let product = await getProductById(id);
      setChosenProduct(product);
      setRating(Number(product.rating));
      setPageLoading(false);
    }

    fetchProductById()
  }, [id]);

  const handleAdd = (product: Product) => {
    const { id, title, desc, price, stock, image } = product;
    try {
      dispatch(cartAdded(id, title, desc, price, stock, image));
      alert("Product successfully added to cart");
    } catch (error) {
      alert("Failed in adding product to cart");
    }
  };

  return (
    <div className="detail-container">
      {pageLoading ? (
        <>
          <div className="loading">
            <h3>Please wait...</h3>
            <Loading />
          </div>
        </>
      ) : (
        <Card className="detail-card">
          <Card.Img className="detail-img" src={chosenProduct.image} />
          <Card.Body>
            <h1 className="title">{chosenProduct.title}</h1>
            <p className="price">${chosenProduct.price}</p>
            <div>
              <Star number={rating} key={chosenProduct.id} />
              <span className="rating"> {chosenProduct.rating} </span>
              <span className="divider">|</span>
              <span className="stock"> Stock: {chosenProduct.stock}</span>
            </div>

            <div className="tags-contain">
              <div className="tags">{chosenProduct.brand} </div>
              <div className="tags"> {chosenProduct.category}</div>
            </div>
            <div>
              <span>Product Description</span>
              <br></br>
              <p>{chosenProduct.desc}</p>
            </div>

            <div className="div-button">
              <Button
                className="add-btn"
                variant="primary"
                onClick={() => handleAdd(chosenProduct)}
              >
                Add to cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProductDetail;
