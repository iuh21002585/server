import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import './CheckoutForm.scss';
import citiesData from './Data'; // Import dữ liệu thành phố từ file Data.js
import { createOrder } from '../../redux/slice/orders';
import { useDispatch } from 'react-redux';
import CartContext from '../../Context/CartContext';

const CheckoutForm = ({ isOpen, onRequestClose }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const { cart, clearCart } = useContext(CartContext);
    const dispatch = useDispatch();

    const handleOrder = () => {
        const orderData = {
            orderName: name,
            orderPhone: phone,
            orderEmail: email,
            orderAddress: address,
            orderNote: note,
            orderCart: cart,
        };

        

        // kiểm tra ràng buộc dữ liệu
        if (!orderData.orderName || !orderData.orderPhone || !orderData.orderEmail || !orderData.orderAddress) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        // kiểm tra ràng buộc dữ liệu cho name không được là số và kí tự đặc biệt
        const validateName = (name) => {
            const nameRegex = /^\D+$/; // Chỉ cho phép chữ cái và khoảng trắng
            return nameRegex.test(name);
        };
        if (!validateName(orderData.orderName)) {
            alert('Tên không hợp lệ');
            return;
        }


        const validatePhone = (phone) => {
            const phoneRegex = /^0[0-9]{9}$/; // Chỉ cho phép các chữ số
            return phoneRegex.test(phone);
        };
        // kiểu tra ràng buộc dữ liệu cho số điện thoại không được có chữ cái hoặc ký tự đặc biệt
        if (!validatePhone(orderData.orderPhone)) {
            alert('Số điện thoại không hợp lệ');
            return;
        }


        // kiểm tra ràng buộc dữ liệu cho email
        if (!orderData.orderEmail.includes('@')) {
            alert('Email không hợp lệ');
            return;
        }
        // kiểm tra ràng buộc dữ liệu cho địa chỉ
        if (orderData.orderAddress.length < 10) {
            alert('Địa chỉ không hợp lệ');
            return;
        }

        dispatch(createOrder(orderData))
        .then((res) => {
            if (res.payload) {
                console.log('Upload success');
            } else console.log('Upload fail');
        })
        .catch((err) => console.log(err))
        .finally();

        onRequestClose();
        clearCart();
        clearData();
    }

    const clearData = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setNote('');
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedWard('');

        setDistricts([]);
        setWards([]);
    }

    useEffect(() => {
        setCities(citiesData);
    }, []);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setSelectedDistrict('');
        setSelectedWard('');
        
        const selectedCityData = cities.find(city => city.Id === cityId);
        setDistricts(selectedCityData ? selectedCityData.Districts : []);
        setWards([]);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard('');

        const selectedDistrictData = districts.find(district => district.Id === districtId);
        setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Checkout Form"
            className="checkout-modal"
            overlayClassName="checkout-overlay"
        >
            <div className="checkout-form">
                <h2>Thông tin đặt hàng</h2>
                <div className="form-group">
                    <label>Họ và Tên</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="text"  onChange={(e)=>setPhone(e.target.value)}  value={phone}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-group">
                    <label>Chọn Thành phố</label>
                    <select value={selectedCity} onChange={handleCityChange}>
                        <option value="">Chọn tỉnh thành</option>
                        {cities.map((city) => (
                            <option key={city.Id} value={city.Id}>{city.Name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Chọn Quận/Huyện</label>
                    <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedCity}>
                        <option value="">Chọn quận huyện</option>
                        {districts.map((district) => (
                            <option key={district.Id} value={district.Id}>{district.Name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Chọn Phường/Xã</label>
                    <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                        <option value="">Chọn phường xã</option>
                        {wards.map((ward) => (
                            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Số nhà, tên đường</label>
                    <input type="text" onChange={(e)=>setAddress(cities.find(city => city.Id === selectedCity)?.Name  + ", " + districts.find(district => district.Id === selectedDistrict)?.Name + ", " +wards.find(ward => ward.Id === selectedWard)?.Name + ", "  + e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Yêu cầu khác</label>
                    <input type="text" onChange={(e)=>setNote(e.target.value)} value={note}/>
                </div>
                <div className="form-group">
                    <button onClick={handleOrder}>Đặt hàng</button>
                </div>
            </div>
        </Modal>
    );
};

export default CheckoutForm;
