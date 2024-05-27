import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { fetchAllProducts } from "./redux/slice/products";
import { fetchAllMerch } from "./redux/slice/merch";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AuthContext from "./Context/AuthProvider";
import { CartProvider } from "./Context/CartContext"; 
import CartModal from "./Components/CartModal/CartModal"; 

import Account from "./Pages/Account";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import LoadingSpinner from "./Components/Loading";
import NotFound from "./Pages/NotFound";
import Admin from "./Pages/Admin";
import CoffeeShopManager from "./Pages/Manager/CoffeeShop";
import MerchShopManager from "./Pages/Manager/MerchShop";
import OrderManager from "./Pages/Manager/ListOrder";

import Collection from "./Pages/Collection";
import CoffeeShop from "./Pages/CoffeeShop";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import CoffeeClub from "./Pages/CoffeeClub";
import Policies from "./Pages/Policies";
import BlogCoffee from "./Pages/Blogs/BlogCoffee";
import MerchShop from "./Pages/MerchShop";

import Modal from 'react-modal';
import { fetchAllOrders } from "./redux/slice/orders";

Modal.setAppElement('#root');

function App() {
    const { auth, isBusy } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Quản lý trạng thái hiển thị modal giỏ hàng

    const role = auth?.user?.role === "admin";

    const ProtectedRoute = ({ check, path, children }) => {
        return check ? children : <Navigate to={path} replace />;
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchAllMerch());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleCartIconClick = () => {
        setIsCartModalOpen(true); // Mở modal giỏ hàng khi nhấn vào icon giỏ hàng
    };

    const handleCloseCartModal = () => {
        setIsCartModalOpen(false); // Đóng modal giỏ hàng
    };

    return (
        <div className="App">
            {isBusy ? (
                <LoadingSpinner />
            ) : (
                <CartProvider>
                    <Router>
                        <Header onCartIconClick={handleCartIconClick} /> {/* Truyền sự kiện cho Header */}
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route
                                path="/account"
                                element={
                                    <ProtectedRoute
                                        check={auth.loggedIn}
                                        path={"/login"}
                                    >
                                        <ProtectedRoute
                                            check={!role}
                                            path={"/admin"}
                                        >
                                            <Account />
                                        </ProtectedRoute>
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route
                                path="/login"
                                element={
                                    <ProtectedRoute
                                        check={!auth.loggedIn}
                                        path="/account"
                                    >
                                        <Login />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route
                                path="/register"
                                element={
                                    <ProtectedRoute
                                        check={!auth.loggedIn}
                                        path="/account"
                                    >
                                        <Login />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route path="/admin">
                                <Route
                                    path="coffee-shop"
                                    element={
                                        <ProtectedRoute check={role} path="/">
                                            <CoffeeShopManager />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    path="merch-shop"
                                    element={
                                        <ProtectedRoute check={role} path="/">
                                            <MerchShopManager />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    path="order"
                                    element={
                                        <ProtectedRoute check={role} path="/">
                                            <OrderManager />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    index
                                    element={
                                        <ProtectedRoute check={role} path="/">
                                            <Admin />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                            </Route>
                            <Route path="/products">
                                <Route
                                    path="coffee-club-subscription"
                                    element={<CoffeeClub />}
                                ></Route>
                                <Route index element={<Collection />}></Route>
                            </Route>
                            <Route path="/collections">
                                <Route
                                    path="coffee-shop"
                                    element={<CoffeeShop />}
                                ></Route>
                                <Route
                                    path="merch-shop"
                                    element={<MerchShop />}
                                ></Route>
                                <Route index element={<Collection />}></Route>
                            </Route>
                            <Route path="/pages">
                                <Route
                                    path="about-us"
                                    element={<AboutUs />}
                                ></Route>
                                <Route
                                    path="contact-us"
                                    element={<ContactUs />}
                                ></Route>
                                <Route
                                    path="policies"
                                    element={<Policies title={"Policies"} />}
                                ></Route>
                                <Route
                                    path="terms-conditions"
                                    element={
                                        <Policies title={"Terms Conditions"} />
                                    }
                                ></Route>
                            </Route>
                            <Route path="/blogs">
                                <Route
                                    path="coffee-101"
                                    element={<BlogCoffee />}
                                ></Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </Router>
                    <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} /> {/* Truyền trạng thái và sự kiện đóng modal */}
                </CartProvider>
            )}
        </div>
    );
}

export default App;
