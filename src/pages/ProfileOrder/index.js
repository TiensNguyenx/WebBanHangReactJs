import classNames from "classnames/bind";
import styles from "./ProfileOrder.module.scss";
import { useEffect, useState } from "react";
import { getAllPaymentService, getDetailProductService } from "~/Services";

import ModalFeedBack from "~/components/Layout/components/ModalFeedBack";


const cx = classNames.bind(styles);
function ProfileOrder() {
    const [detailPayment, setDetailPayment] = useState([])
    const [getLength, setGetLength] = useState(0)
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false);
    const [itemId, setItemId] = useState('')
    const getDetailPayment = async () => {
        const res = await getAllPaymentService()
        setDetailPayment(res.data.data[0].orderItems)
        setGetLength(res.data.data.length)
        setTotal(res.data.data[0].totalPrice)
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

                                        return (
                                            <div className={cx('info')} key={index}>
                                                <div className={cx('header')}>
                                                    <div className={cx('shop-name')}>PHILONG TECHNOLOGY</div>
                                                    <div className={('status')}>
                                                        <div className={cx('status-payment')}>Đã thanh toán</div>
                                                    </div>
                                                </div>

                                                <div className={cx('body')}>
                                                    <img className={cx('img')} src={item.image} alt=""></img>
                                                    <div className={cx('price')}>
                                                        <div className={cx('info-left')}>
                                                            <div className={cx('name')}>{item.name}</div>
                                                            <div className={cx('amount')}>Số lượng: {item.amount}</div>
                                                        </div>
                                                        <div className={cx('info-right')}>
                                                            <div className={cx('old-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}</div>
                                                            <div className={cx('new-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className={cx('evaluate')}>
                                                    <button onClick={() => handleFeedBack(item.product)} style={{ backgroundColor: 'var(--background-color-button' }}>Đánh Giá</button>
                                                </div>

                                            </div>
                                        )

                                    })
                                }
                                <div className={cx('footer')} >
                                    <div className={cx('total')}>Tổng cộng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</div>
                                    <div className={cx('footer-button')}>

                                        <div className={cx('contact')}>
                                            <button style={{ backgroundColor: 'var(--white-background)', color: 'var(--black-color)' }}>Liên Hệ Cửa Hàng</button>
                                        </div>
                                        <div className={cx('buy-again')}>
                                            <button style={{ backgroundColor: 'var(--white-background)', color: 'var(--black-color)' }}>Mua Lại</button>
                                        </div>
                                    </div>
                                </div>

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