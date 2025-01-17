// Card/index.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import CartContext from '../../Context/CartContext';

import iconCart from "../../Assets/svg/iconCart.svg";
import iconHeart from "../../Assets/svg/iconHeart.svg";
import "./Card.scss";

const Card = ({
    title,
    img,
    newBadge = false,
    desc,
    price,
    idProduct,
    path = "/",
}) => {
    const { addToCart, cart, setIsAdmin } = useContext(CartContext); // Sử dụng CartContext

    const handleAddToCart = () => {
        const product = { title, img, price, idProduct, quantity: 1 };
        addToCart(product);
        setIsAdmin(false);
    };

    return (
        <>
            <div
                className={desc ? "card has-description" : "card"}
                data-id={idProduct}
            >
                <div className="card-img">
                    {newBadge ? (
                        <div className="card-badges">
                            <span>New</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    <Link to={path}>
                        <Image
                            cloudName="ok-but-first-coffee"
                            publicId={img}
                            crop="scale"
                            className="product-img"
                        />
                    </Link>

                    <div className="card-wishlist">
                        <button>
                            <img src={iconHeart} alt="icon-heart" />
                        </button>
                    </div>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        <Link to={path}>{title}</Link>
                    </h4>
                    <div className="card-desc">
                        <p>{desc}</p>
                    </div>
                    <div className="card-price">
                        <span>${price}</span>
                        <div className="add-to-cart">
                            <button onClick={handleAddToCart}>
                                <img src={iconCart} alt="icon-cart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
