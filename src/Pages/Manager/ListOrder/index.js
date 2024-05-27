import { useContext, useEffect,  useState } from "react";
import { useSelector } from "react-redux";



import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingSpinner from "../../../Components/Loading";

import "./Order.scss";
import CartContext from "../../../Context/CartContext";

const OrderManager = () => {
    const selector = useSelector((state) => state.order);
    const [busy, setBusy] = useState(false);
    const { setIsModalOpen, setCart, setIsAdmin} = useContext(CartContext);
    const [fetchOrders, setFetchOrders] = useState();

    const handleOpenViewDetail = (cart) => {
        setCart(cart);
        setIsAdmin(true); 
        setIsModalOpen(true)        
    }

    useEffect(() => {
        setFetchOrders(selector);
    }, [selector]);

    console.log({fetchOrders});

    const listOrder = fetchOrders?.map((order, index) => {
        console.log({order});
        return (
            <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}
                </td>
                <td>{order.address  }
                </td>
                <td>
                {order.note}
                </td>
                <td className="actions">
                    <button
                        onClick={(e) => handleOpenViewDetail(order.cart)}
                        className="theme-btn__black"
                    >   
                       View
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <main className="order-manager">
                <section>
                    <Breadcrumb
                        breadcrumb="Coffee Shop"
                        list={[{ title: "Admin", path: "/admin" }]}
                    />
                </section>
                <section>
                    {busy || !fetchOrders ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="container">
                            <div className="order-manager-wrapper">
                                <div className="list-orders">
                                    <h3 className="order-title">
                                        List Of Orders
                                    </h3>
                                    <div className="order-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Note</th>
                                                    <th>View Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fetchOrders && listOrder}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default OrderManager;
