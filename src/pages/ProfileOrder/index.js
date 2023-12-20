import classNames from "classnames/bind";
import styles from "./ProfileOrder.module.scss";
import { useEffect, useState } from "react";
import { getAllPaymentService } from "~/Services/PaymentServices";

import ModalFeedBack from "~/components/Layout/components/ModalFeedBack";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function ProfileOrder() {
    const [detailPayment, setDetailPayment] = useState([])
    const [getLength, setGetLength] = useState(0)


    const [show, setShow] = useState(false);
    const [dayOrder, setDayOrder] = useState('')
    const [itemId, setItemId] = useState('')
    const getDetailPayment = async () => {
        const res = await getAllPaymentService()
        console.log(res)
        if (res.data.data.length > 0) {
            setDetailPayment(res.data.data)
            setGetLength(res.data.data.length)

        }
    }

    function formatVietnameseDateTime(dateTimeString) {

        const date = new Date(dateTimeString);
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',

        }).format(date);

        return formattedDate;
    }
    const handleFeedBack = (itemId) => {
        setShow(true)
        setItemId(itemId)

    }

    const handleCloseFeedBack = () => {
        setShow(false)

    }
    useEffect(() => {

        getDetailPayment()

    }, [])

    return (
        <div className={cx('col-2')}>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>

                    {
                        getLength > 0 ? (
                            <div>
                                {
                                    detailPayment.map((item, index) => {
                                        console.log(item)
                                        return (
                                            <div key={index} className={cx('item')}>
                                                <div className={cx('info')} >
                                                    <div className={cx('header')}>
                                                        <div className={cx('shop-name')}>TB TECHNOLOGY</div>
                                                        <div className={('status')}>
                                                            <div className={cx('status-payment')}>{item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                                        </div>
                                                    </div>

                                                    <Link to={`/card?id=${item.orderItems[0].product}`}>
                                                        <div className={cx('body')}>
                                                            <img className={cx('img')} src={item.orderItems[0].image} alt=""></img>
                                                            <div className={cx('price')}>
                                                                <div className={cx('info-left')}>
                                                                    <div className={cx('name')}>{item.orderItems[0].name}</div>
                                                                    <div className={cx('amount')}>Số lượng: {item.orderItems[0].amount}</div>

                                                                </div>
                                                                <div className={cx('info-right')}>
                                                                    <div className={cx('old-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.orderItems[0].old_price)}</div>
                                                                    <div className={cx('new-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.orderItems[0].new_price)}</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className={cx('evaluate')}>
                                                        <div className={cx('infor-order')}>
                                                            <div>Ngày mua hàng: {formatVietnameseDateTime(item.createdAt)}</div>
                                                            <div>Phương thức thanh toán: {item.paymentMethod === 'thanh toan bang paypal' ? 'Ví điện tử Paypal' : 'Thanh toán khi nhận hàng'}</div>
                                                            <div>Hình thức nhận hàng: {item.shippingMethod === 'nhan tai cua hang' ? 'Nhận tại của hàng' : 'Giao hàng tận nơi'}</div>
                                                        </div>
                                                        <button onClick={() => handleFeedBack(item.orderItems[0].product)} style={{ backgroundColor: 'var(--background-color-button' }}>Đánh Giá</button>
                                                    </div>

                                                </div>
                                                <div className={cx('footer')} >
                                                    <div className={cx('total')}>Tổng cộng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</div>

                                                </div>
                                            </div>

                                        )

                                    })
                                }


                            </div>


                        ) : (
                            <div className={cx('empty')}>
                                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b96488590b8f781f.png" alt=""></img>
                                <div>Chưa có đơn hàng</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <ModalFeedBack
                show={show}
                handleClose={handleCloseFeedBack}
                idPayment
                itemId={itemId}
            />
        </div >

    )
};

export default ProfileOrder;