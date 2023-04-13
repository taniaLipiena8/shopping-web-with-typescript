import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { UserContext, UserContextType } from "../../context/UserContext";
import logo from "../../images/logo_cart.png";
import SearchForm from "../../form-templates/SearchForm/SearchForm";

const Header = () => {
  const location = useLocation();
  const { username } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname.includes("admin") &&
        username && (
          <Navbar expand="lg" variant="light" bg="light" className="admin-nav">
            <Navbar.Text className="hello">Hello, {username}</Navbar.Text>
            <Nav className="logoutNav">
              <Nav.Link className="logout" onClick={onLogOut}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar>
        )}

      {location.pathname !== "/login" &&
        !location.pathname.includes("/admin") && (
          <Navbar bg="light" expand="lg" className="public-navBar">
            <Container className="d-flex justify-content-between">
              <Navbar.Brand
                onClick={() => navigate("/products")}className="logo">
                <img src={logo} alt="" />
              </Navbar.Brand>
              <SearchForm />

              <Nav.Item>
                <Link className="cartBut" to={"/cart"}>
                  Shopping Cart
                </Link>
              </Nav.Item>
            </Container>
          </Navbar>
        )}
    </div>
  );
};

export default Header;
