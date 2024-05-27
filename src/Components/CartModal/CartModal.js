import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import CartContext from '../../Context/CartContext';
import './CartModal.scss';
import CheckoutForm from '../Order/CheckoutForm';
import { Image } from 'cloudinary-react';

const CartModal = () => {
    const { isAdmin,isModalOpen, closeModal, cart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);


    const handleBuyClick = () => {
        setIsCheckoutOpen(true);
        
        closeModal();
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
        closeModal();
        
    };


    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Product Added to Cart"
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <h2>Product Added to Cart</h2>
                    <div className="modal-product">
                           
                            <div className="product-info">
                                <h3>Name Product</h3>
                                <h3>Price</h3>
                                <h3>
                                    Quantity
                                </h3>
                            </div>
                        </div>
                    {cart.map((product, index) => (
                        <div className="modal-product" key={index}>
                            <Image
                                cloudName="ok-but-first-coffee"
                                publicId={product.img}
                                crop="scale"
                                className="product-img"
                            />
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                                <div className="quantity-controls">
                                    {!isAdmin && <button onClick={() => decreaseQuantity(index)}>-</button>}
                                    <span>{product.quantity}</span> 
                                    {!isAdmin && <button onClick={() => increaseQuantity(index)}>+</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Hiển thị tổng tiền */}
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    {!isAdmin && <div className="button-group">
                        <button onClick={clearCart}>Empty Cart</button>
                        <button onClick={closeModal}>Close</button>
                        <button onClick={handleBuyClick}>Buy</button>
                    </div>}
                    
                </div>
            </Modal>

            <CheckoutForm isOpen={isCheckoutOpen} onRequestClose={handleCloseCheckout} />
        </>
    );
};

export default CartModal;
