import classNames from "classnames/bind";
import styles from "./FinishPay.module.scss";
import Footer from "~/components/Layout/components/Footer";
import { getAllCouponService, getDetailOrderService, createPaymentService } from '../../Services'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineTag } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function FinishPay() {
    const [coupon, setCoupon] = useState([])
    const [selectCash, setSelectCash] = useState(true)
    const [selectPayPal, setSelectPayPal] = useState(false)
    const [userOrder, setUserOrder] = useState({})
    const [checkedCoupon, setCheckedCoupon] = useState(false)
    const [displayCoupon, setDisplayCoupon] = useState(false)
    const [idCoupon, setIdCoupon] = useState({})
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const idOrder = urlParams.get('idOrder')
    const isShipping = urlParams.get('isShipping')
    const [idPrice, setIdPrice] = useState('')
    const [idShipping, setIdShipping] = useState('')
    const navigate = useNavigate()
    const handleSelectCash = () => {
        setSelectCash(true)
        setSelectPayPal(false)
    }
    const handleSelectPayPal = () => {
        setSelectPayPal(true)
        setSelectCash(false)
    }
    const handleAddCoupon = async () => {
        setDisplayCoupon(!displayCoupon)
        if (isShipping === 'true') {
            let method = 'ship'
            const res = await getAllCouponService(method)
         
            if (res.data.status === 'success') {
                setCoupon(res.data.data)
                setIdShipping(res.data.data[0]._id)
                setIdPrice(res.data.data[1]._id)
            }

        }
        else {
            let method = 'store'
            const res = await getAllCouponService(method)

            if (res.data.status === 'success') {
          
                setCoupon(res.data.data)
                setIdPrice(res.data.data[0]._id)

            }

        }
    }
    const getDetailOder = async (idOrder) => {
        const res = await getDetailOrderService(idOrder)
        setUserOrder(res.data.data)
    }
    const handleCheckCoupon = async (idCoupon) => {
        setCheckedCoupon(!checkedCoupon)
        setIdCoupon(idCoupon)

    }


    const handleCheckout = async () => {

        if (selectCash) {
            let paymentMethod = 'thanh toan khi nhan hang'
            const res = await createPaymentService(idOrder, paymentMethod, idPrice, idShipping, isShipping)
            if (res.data.status === 'success') {
                toast.success('Thanh toán thành công')
            }
            else {
                toast.error('Thanh toán thất bại')
            }
        }
        else {
            let paymentMethod = 'thanh toan bang paypal'
            const res = await createPaymentService(idOrder, paymentMethod, idPrice, idShipping, isShipping)
            if (res.data.status === 'success') {
                toast.success('Thanh toán thành công')
                setTimeout(() => {
                    navigate('/')
                }, 500);
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
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userOrder.shippingPrice)}</p>
                            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userOrder.totalPrice)}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('promotion')}>
                    <div className={cx('promotion-wrapper')}>
                        <p>Khuyến mãi</p>
                        <div className={cx('select-promotion')} onClick={handleAddCoupon}>
                            <AiOutlineTag /> Chọn hoặc nhập mã khuyến mãi
                        </div>
                    </div>
                    <div className={cx('coupon-container')}>
                        {coupon.map((item, index) => {
                            return (
                                displayCoupon && (
                                    <div className={cx('coupon-wrapper', checkedCoupon ? 'active-select' : '')} style={coupon.length > 1 ? { marginBottom: '10px' } : { marginBottom: '0px' }} key={index} onClick={() => handleCheckCoupon(item._id)}>
                                        <img className={cx('coupon-img')} src={item.image} alt="" />
                                        <div className={cx('info-coupon')}>
                                            <div className={cx('coupon-name')}>{item.name}</div>
                                            <div className={cx('coupon-description')}>{item.description}</div>
                                            <div className={cx('coupon-date')}>
                                                <div className={cx('coupon-start')}>Bắt đầu từ {item.dateStart}</div>

                                            </div>
                                        </div>
                                        <div className={cx('use-coupon')} >{checkedCoupon ? <FaCheck className={cx('coupon-check')} /> : ''}</div>
                                    </div>
                                )
                            )
                        })}
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
                    <div className={cx('total-container')}> <p className={cx('total-title')}>Tổng tiền: </p><p className={cx('price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userOrder.totalPrice)}</p></div>
                    <div className={cx('total-action')}><button className={cx('btn-checkout')} onClick={handleCheckout}>THANH TOÁN NGAY</button></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FinishPay; 