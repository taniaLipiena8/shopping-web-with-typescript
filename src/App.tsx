import Login from "./admin/login/Login";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "./layout-template/Layout/Layout";
import UserContextProvider from "./context/UserContext";
import { PrivateRoute } from "./PrivateRoute";
import ProductsList from "./admin/productManagement/productsList/ProductsList";
import AddProduct from "./admin/productManagement/addProduct/AddProduct";
import Home from "./public-user/home/Home";
import { useEffect } from "react";
import ProductDetail from "./public-user/productDetail/ProductDetail";
import ListCart from "./public-user/cart/listCart/ListCart";
function App() {
  const username = localStorage.getItem('username')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {

    if (username && pathname.toLowerCase().includes('/login')) {
      navigate('/admin/products')
    }

    if (pathname === '/') {
      navigate('/products')
    }
  }, [username, navigate, pathname])

  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />

            <Route path="admin/*" >
              <Route path="products" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
              <Route path="add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
              <Route path="*" element={<Navigate to={'/admin/products'} replace />} />

            </Route>

            <Route path="products/*">
              <Route index element={<Home />} />
              <Route path=":id" element={<ProductDetail />} />

            </Route>

            <Route path="cart/*">
              <Route index element={<ListCart />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to={'/products'} replace />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
