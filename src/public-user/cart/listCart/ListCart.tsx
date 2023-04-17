import { useAppDispatch, useAppSelector } from "../../../features/store";
import {
  deleteCart,
  cartAdded,
  quantityDecreased,
  quantityIncreased,
  selectAllCarts,
} from "../../../features/cart/cartSlice";
import { Row, Col, Container } from "react-bootstrap";
import "./ListCart.css";
import CartExcerpt from "../cartExcerpt/CartExcerpt";
import { Cart } from "../../../models/interfaces/CartInterfaces";

const ListCart = () => {
  const carts: Cart[] = useAppSelector((selectAllCarts));

  const dispatch = useAppDispatch();

  const handleDelete = (id: any) => {
    dispatch(deleteCart(id));
  };

  const handleIncrease = (id: any) => {
    dispatch(quantityIncreased(id));
  };

  const handleDecreased = (id: any) => {
    dispatch(quantityDecreased(id));
  };

  return (
    <>
      <Container
        fluid="true"
        style={{ margin: "30px" }}
        className="page-container"
      >
        {carts.length > 0 ? (
          <>
            <h1>Shopping Cart</h1>
            <Row className="justify-content-center row-container">
              <Col lg={9} className="cart-details">
                {carts.map((cart) => (
                  <CartExcerpt
                    cart={cart}
                    handleDelete={handleDelete}
                    handleIncrease={handleIncrease}
                    handleDecreased={handleDecreased}
                    key={cart.id}
                  />
                ))}
              </Col>
              <Col lg={3} className="total-sidebar">
                <h4>
                  Total Items:{" "}
                  {carts.reduce((total, cart) => total + cart.quantity, 0)}
                </h4>
                <br></br>
                <div className="list-cart-summary">
                  {carts.map((cart, index) => (
                    <p className="total-summary" key={cart.id}>
                      <span>
                        {index + 1}. {cart.title}
                      </span>
                      <span>X {cart.quantity}</span>
                    </p>
                  ))}
                </div>

                <h5>
                  Total Price: $
                  {carts.reduce(
                    (total, cart) => total + cart.price * cart.quantity,
                    0
                  )}
                </h5>
              </Col>
            </Row>
          </>
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </Container>
    </>
  );
};

export default ListCart;
