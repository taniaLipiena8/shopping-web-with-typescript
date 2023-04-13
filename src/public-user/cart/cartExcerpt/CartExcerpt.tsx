import { FaTrash } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import { Cart } from "../../../models/interfaces/CartInterfaces";
import "./CartExcerpt.css";

interface CartExcerptProps {
  cart: Cart;
  handleDelete: (id: any) => void;
  handleIncrease: (id: any) => void;
  handleDecreased: (id: any) => void;
}

const CartExcerpt = ({cart, handleDelete, handleIncrease,handleDecreased,}: CartExcerptProps) => {
  return (
    <div className="cartExcerpt">
      <Card className="cartCard">
        <Card.Img className="cart-image" src={cart.image} />
        <Card.Body className="card-body">
          <h5 className="card-title">{cart.title}</h5>
          <p className="card-text">{cart.desc}</p>
          <p className="card-text">${cart.price}</p>

          <div className="cart-buttons">
            <Button variant="danger" className="trash" onClick={() => handleDelete(cart.id)}>
              <FaTrash />
            </Button>
            <span>
              <Button variant="primary" disabled={cart.quantity === 1 ? true : false} onClick={() => handleDecreased(cart.id)}>
                -
              </Button>
              <span className="cart-amount">{cart.quantity}</span>
              <Button variant="primary" disabled={cart.quantity === cart.stock ? true : false} onClick={() => handleIncrease(cart.id)}>
                +
              </Button>
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartExcerpt;
