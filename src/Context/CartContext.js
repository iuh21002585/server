import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const addToCart = (product) => {
        setCart((prevCart) => {
            var flag = false;
            prevCart?.map((item) => {
                if(item.title === product.title) {
                    item.quantity += 1;
                    flag = true;
                    
                }
            })
            console.log("Product added to cart:", product); 
            if(!flag) {
                
                return  [...prevCart, product];
            }else {
                return [...prevCart];
            }
        });
        setAddedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if(isAdmin) {
            setCart([]);
        }
    };

    const clearCart = () => {
        setCart([]);
        setIsModalOpen(false);
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCart(updatedCart);
        }else if(updatedCart[index].quantity === 1) {
            updatedCart.splice(index, 1);
            setCart(updatedCart);
        }
    };

    return (
        <CartContext.Provider value={{ isAdmin, setIsAdmin, cart, setCart, addToCart, isModalOpen, setIsModalOpen,closeModal, addedProduct, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
