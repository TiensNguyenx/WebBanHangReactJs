import classNames from "classnames/bind";
import styles from "./FinishPay.module.scss";
import Footer from "~/components/Layout/components/Footer";
import {
    getAllCouponService, getDetailOrderService, createPaymentService,
    deleteAllProductService, checkedCouponService
} from '../../Services'
import { UserContext } from "~/context/UserContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineTag, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function FinishPay() {
    const [coupons, setCoupons] = useState([])
    const { resetLength } = useContext(UserContext)
    const [selectCash, setSelectCash] = useState(true)
    const [selectPayPal, setSelectPayPal] = useState(false)
    const [userOrder, setUserOrder] = useState({})
    const [couponShip, setCouponShip] = useState('')
    const [renderPriceShip, setRenderPriceShip] = useState(false)
    const [displayCoupon, setDisplayCoupon] = useState(false)
    const [idCouponsPrice, setIdCouponsPrice] = useState([])
    const [idCouponsShip, setIdCouponsShip] = useState([])
    const [idCoupons, setIdCoupons] = useState([])
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const idOrder = urlParams.get('idOrder')
    const idCart = urlParams.get('idCart')
    const isShipping = urlParams.get('isShipping')
    const [arrayCouponShip, setArrayCouponShip] = useState([])
    const [arrayCouponPrice, setArrayCouponPrice] = useState([])
    const [priceAfterCoupon, setPriceAfterCoupon] = useState('')
    const [renderAfterCoupon, setRenderAfterCoupon] = useState(false)
    const [loadingApi, setLoadingApi] = useState(false)
    const navigate = useNavigate()
    const handleSelectCash = () => {
        setSelectCash(true)
        setSelectPayPal(false)
    }
    const handleSelectPayPal = () => {
        setSelectPayPal(true)
        setSelectCash(false)
    }
    const handleRenderCoupon = async () => {
        setDisplayCoupon(!displayCoupon);
        let method;
        if (isShipping === 'true') {
            method = 'ship';
        } else {
            method = 'store';
        }

        const res = await getAllCouponService(method);

        if (res.data.status === 'success') {
            setCoupons(res.data.data);

            // Lọc và đặt vào mảng tương ứng
            const shipCoupons = res.data.data.filter((item) => item.methodDiscount === 'ship');
            const priceCoupons = res.data.data.filter((item) => item.methodDiscount !== 'ship');

            setArrayCouponShip(shipCoupons);
            setArrayCouponPrice(priceCoupons);
        }
    };




    const getDetailOder = async (idOrder) => {
        const res = await getDetailOrderService(idOrder)
        setUserOrder(res.data.data)
    }

    const handleCheckCouponShip = async (idCoupon) => {
        setIdCouponsShip((prevCoupons) => {
            const couponExists = prevCoupons.includes(idCoupon);
            if (couponExists) {
                return [];
            } else {

                return [idCoupon];
            }
        });

    };

    const handleCheckCouponPrice = async (idCoupon) => {
        setIdCouponsPrice((prevCoupons) => {
            const couponExists = prevCoupons.includes(idCoupon);
            if (couponExists) {
                return [];
            } else {

                return [idCoupon];
            }
        });
    }
    useEffect(() => {
        console.log(idCouponsPrice);
        updatePriceAfterSelectCoupon();
        setIdCoupons([...idCouponsPrice, ...idCouponsShip]);
    }, [idCouponsPrice, idCouponsShip]);


    const updatePriceAfterSelectCoupon = async () => {
        console.log([...idCouponsPrice, ...idCouponsShip])
        const res = await checkedCouponService(idOrder, [...idCouponsPrice, ...idCouponsShip])
        console.log(res)
        setCouponShip(res.data.data.valueShippingCoupon)
        setRenderPriceShip(true)
        setPriceAfterCoupon(res.data.data.total_price)
        setRenderAfterCoupon(true)
    }
    const handleCheckout = async () => {
        setLoadingApi(true);
        if (selectCash) {
            let paymentMethod = 'thanh toan khi nhan hang'
            const res = await createPaymentService(idOrder, paymentMethod, idCoupons, isShipping)
            console.log(res)
            if (res.data.status === 'success') {
                localStorage.setItem('idPayment', res.data.data._id)
                toast.success('Thanh toán thành công')
                await deleteAllProductService(idCart)
                resetLength()
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
            else {
                toast.error('Thanh toán thất bại')
            }
        }
        else {
            let paymentMethod = 'thanh toan bang paypal'
            const res = await createPaymentService(idOrder, paymentMethod, idCoupons, isShipping)
            console.log(res)
            if (res.data.status === 'success') {
                localStorage.setItem('idPayment', res.data.data._id)
                toast.success('Thanh toán thành công')
                await deleteAllProductService(idCart)
                resetLength()
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
            else {
                toast.error('Thanh toán thất bại')
            }
        }
    }
    useEffect(() => {
        getDetailOder(idOrder)
    }, [])
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('user-info')} >
                    <div className={cx('title')} >Thông tin đặt hàng</div>
                    <div className={cx('list-info')}>
                        <div className={cx('list-col1')}>
                            <p>• Khách hàng:</p>
                            <p>• Số điện thoại:</p>
                            <p>• Email</p>
                            <p>• Địa chỉ:</p>
                            <p>• Tạm tính:</p>
                            <p>• Phí vận chuyển:</p>
                            <p>• Tổng tiền:</p>
                        </div>
                        <div className={cx('list-col2')}>
                            <p>{userOrder.name}</p>
                            <p>{userOrder.phone}</p>
                            <p>{userOrder.email}</p>
                            <p>{userOrder.addressUser}</p>
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userOrder.itemsPrice)}</p>
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(idCouponsShip.length > 0 ? 0 : userOrder.shippingPrice)}</p>
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceAfterCoupon ? priceAfterCoupon : userOrder.totalPrice)}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('promotion')}>
                    <div className={cx('promotion-wrapper')}>
                        <p>Khuyến mãi</p>
                        <div className={cx('select-promotion')} onClick={handleRenderCoupon}>
                            <AiOutlineTag /> Chọn hoặc nhập mã khuyến mãi
                        </div>
                    </div>
                    <div className={cx('coupon-container')}>
                        <div>
                            {displayCoupon && <h3>Mã giảm giá</h3>}
                            {arrayCouponPrice.length > 0 &&
                                (

                                    arrayCouponPrice.map((item, index) => {
                                        return (

                                            displayCoupon && (
                                                <div className={cx('coupon-wrapper', idCouponsPrice.includes(item._id) ? 'active-select' : '')}

                                                    style={arrayCouponPrice.length > 1 ? { marginBottom: '10px' } : { marginBottom: '0px' }} key={index} onClick={() => handleCheckCouponPrice(item._id)}>

                                                    <img className={cx('coupon-img')} src={item.image} alt="" />

                                                    <div className={cx('info-coupon')}>
                                                        <div className={cx('coupon-name')}>{item.name}</div>
                                                        <div className={cx('coupon-description')}>{item.description}</div>
                                                        <div className={cx('coupon-date')}>
                                                            <div className={cx('coupon-start')}>Bắt đầu từ {item.dateStart}</div>

                                                        </div>
                                                    </div>
                                                    <div className={cx('use-coupon')} >{idCouponsPrice.includes(item._id) ? <FaCheck className={cx('coupon-check')} /> : ''}</div>
                                                </div>
                                            )
                                        )
                                    })

                                )
                            }
                        </div>
                        <div>{displayCoupon && <h3>Mã giảm giá vận chuyển</h3>}
                            {arrayCouponShip.length > 0 && (

                                arrayCouponShip.map((item, index) => {
                                    return (
                                        displayCoupon && (
                                            <div className={cx('coupon-wrapper', idCouponsShip.includes(item._id) ? 'active-select' : '')}
                                                style={arrayCouponShip.length > 1 ? { marginBottom: '10px' } : { marginBottom: '0px' }} key={index} onClick={() => handleCheckCouponShip(item._id, item.methodDiscount)}>
                                                <img className={cx('coupon-img')} src={item.image} alt="" />
                                                <div className={cx('info-coupon')}>
                                                    <div className={cx('coupon-name')}>{item.name}</div>
                                                    <div className={cx('coupon-description')}>{item.description}</div>
                                                    <div className={cx('coupon-date')}>

                                                        <div className={cx('coupon-start')}>Bắt đầu từ {item.dateStart}</div>

                                                    </div>
                                                </div>
                                                <div className={cx('use-coupon')} >{idCouponsShip.includes(item._id) ? <FaCheck className={cx('coupon-check')} /> : ''}</div>
                                            </div>
                                        )
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>

                <div className={cx('pay-method')}>
                    <div className={cx('pay-method-title')}>Chọn hình thức thanh toán</div>
                    <div className={cx('pay-method-item', selectCash ? 'active-select' : '')} onClick={handleSelectCash}>
                        {selectCash && <FaCheck className={cx('checked-icon')} />}
                        <img className={cx('pay-method-cash')} src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/cashondelivery1.jpg" alt="" />
                        Thanh toán bằng tiền mặt khi nhận hàng</div>
                    <div className={cx('pay-method-item', selectPayPal ? 'active-select' : '')} onClick={handleSelectPayPal} style={{ padding: '20px 5px' }}>
                        {selectPayPal && <FaCheck className={cx('checked-icon')} />}
                        <img className={cx('pay-method-paypal')} src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png" alt="" />
                        Thanh toán bằng Paypal</div>
                </div>
                <div className={cx('total-price')}>
                    <div className={cx('total-container')}> <p className={cx('total-title')}>Tổng tiền: </p><p className={cx('price')}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceAfterCoupon ? priceAfterCoupon : userOrder.totalPrice)}</p></div>
                    <div className={cx('total-action')}>
                        <button className={cx('btn-checkout')} onClick={handleCheckout}>
                            {loadingApi && <AiOutlineLoading3Quarters icon="spinner" className={cx('spinner')} />}
                            &nbsp; THANH TOÁN NGAY
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default FinishPay; 