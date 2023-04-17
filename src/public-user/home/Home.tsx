import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductByCategory,
  getProductByQuery,
} from "../../services/ProductsServices";
import ProductCard from "../../reusable-components/productCard/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Product from "../../models/Product";
import { Col, Container, Row } from "react-bootstrap";
import Category from "./Category";
import "./Home.css";
import { useAppDispatch } from "../../features/store";
import { cartAdded } from "../../features/cart/cartSlice";
import { Loading } from "../../reusable-components/LoadingSpin";

const Home = () => {
  const [chosenCtg, setChosenCtg] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonId, setButtonId] = useState<string | undefined>("");
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await getAllProducts();
    setProducts(products);
    setIsLoading(false);
  };

  const fetchProductsByCategory = async (chosenCtg: string) => {
    let products = await getProductByCategory(chosenCtg);

    setProducts(products);
  };

  const fetchProductsByQuery = async (keyword: string) => {
    let products = await getProductByQuery(keyword);
    setProducts(products);
  };

  useEffect(() => {
    if (chosenCtg !== "") {
      fetchProductsByCategory(chosenCtg.replace(" ", "-"));
    }
  }, [chosenCtg]);

  useEffect(() => {
    if (search.toString()) {
      fetchProductsByQuery(search.toString().trim());
    } else {
      fetchProducts();
    }
    setChosenCtg("");
  }, [search]);

  const gotoDetail = (id: any) => {
    navigate(`/products/${id}`);
  };

  const handleAdd = (product: Product) => {
    const { id, title, desc, price, stock, image } = product;

    try {
      dispatch(cartAdded(id, title, desc, price, stock, image));
      alert("Product successfully added to cart");
    } catch (error) {
      alert("Failed in adding product to cart");
    } finally {
    }
  };

  return (
    <>
      <Container
        className="home-container"
        fluid="true"
        style={{ margin: "30px 10px" }}
      >
        {isLoading ? (
          <div className="loading">
          <h3>Please wait...</h3>
          <Loading />
        </div>
        ) : (
          <Row>
            <Col xs={4} sm={3} md={2} className="categories">
              <h3>Category</h3>
              {<Category setChosenCtg={setChosenCtg} />}
            </Col>
            <Col>
              <div className="listed-products">
                <h3>Selected Category: {chosenCtg ? chosenCtg : "All"}</h3>
                <Row xl={4} className="public-product-list">
                  {products.map((product) => (
                    <ProductCard
                      handleCardClick={gotoDetail}
                      key={product.id}
                      variant="outline-secondary"
                      product={product}
                      handleButtonClick={handleAdd}
                      buttonText="Add to cart"
                      isLoading={isLoading}
                      buttonId={buttonId}
                    />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
