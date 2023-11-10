import styles from './Cart.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineTag } from 'react-icons/ai';
import Footer from '~/components/Layout/components/Footer';
import ModalConfirm from '~/components/Layout/components/ModalConfirmDeleteProduct/ModalConfirmDeleteProduct';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const cx = classNames.bind(styles)
function Cart() {
    const [count, setCount] = useState(0)
    const [carts, setCarts] = useState([])
    const [total, setTotal] = useState(0)
    const [check, setCheck] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [showModalLogin, setShowModalLogin] = useState(true);

    useEffect(() => {
        const totalSum = carts.reduce((total, item) => {
            return total + item.newprice * count
        }, 0)
        setTotal(totalSum)
    }, [carts])
    function handlePlush() {

        setCount(prev => prev + 1)

    }
    const handleClose = () => {
        setIsShowModalDelete(false);
        setShowModalLogin(false);
        setCheck(!check)
    }

    function handleDeleteItem(item) {
        setIsShowModalDelete(true);
        setDataUserDelete(item)
        setCheck(!check)
    }
    function handleDeleteAll() {

        carts.map((item) => {

            return (

                axios.delete(`http://localhost:3000/carts/${item.id}`)
                    .then(res => {
                        console.log(res.status);

                    })
            )

        })

    }


    function processMinus(id) {

        fetch(`http://localhost:3000/carts/${id}?count=${count}`, {
            _method: 'PATCH',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            body: JSON.stringify(),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(err => console.error(err))
        setCheck(!check)
    }
    useEffect(() => {
        if (count < 0) {
            setCount(0)
        }
    }, [count])
    useEffect(() => {
        fetch('http://localhost:3000/carts')
            .then(res => res.json())
            .then(data => setCarts(data))
    }, [check])

    if (carts.length > 0) {
        return (
            <div>

                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('product')}>
                            <div className={cx('product-header')}>

                                <h1>Giỏ hàng</h1>
                                <div className={cx('delete-all')} onClick={handleDeleteAll}>Xóa tất cả</div>

                            </div>
                            <div style={{ padding: '16px' }}>
                                <div className={cx('lable')}>
                                    <p style={{ fontWeight: '700' }}>
                                        CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ PHI LONG
                                    </p>
                                    <div style={{ width: '78.63px', textAlign: 'center' }}>Đơn giá</div>
                                    <div style={{ width: '78.24px', textAlign: 'center' }}>Số lượng</div>
                                    <p>Thành tiền</p>

                                </div>
                                {carts.map((item, index) => {

                                    return (
                                        item.userId === sessionStorage.getItem('id') ?
                                            (
                                                <div className={cx('item-wrapper')} key={index}>
                                                    <div className={cx('info')}>

                                                        <div className={cx('item-name')}>
                                                            <div style={{ border: '1px solid #f0f0f0', width: '80px', height: '80px' }}>
                                                                <img src={item.src} alt=''>

                                                                </img>
                                                            </div>
                                                            <div className={cx('name')}>
                                                                <p> {item.uptitle}</p>
                                                                <p>{item.downtitle}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={cx('new-price')}>
                                                                {item.newprice}
                                                            </div>
                                                            <div className={cx('old-price')}>
                                                                {item.oldprice}
                                                            </div>
                                                        </div>

                                                        <div >

                                                            <div className={cx('quantity')}>
                                                                <div className={cx('minus')} onClick={() => processMinus(item.id)}>
                                                                    <button >-</button>
                                                                </div>

                                                                <input style={{ textAlign: 'center' }} value={count} onChange={(e) => setCount(e.target.value)} className={cx('number')} />


                                                                <div className={cx('plus')} onClick={handlePlush}>
                                                                    <button>+</button>
                                                                </div>
                                                            </div>
                                                            <div className={cx('delete')} onClick={() => handleDeleteItem(item)}>Xóa </div>
                                                        </div>

                                                        <div className={cx('total')}>



                                                        </div>



                                                    </div>

                                                </div>
                                            )
                                            : (


                                                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                                                </div>

                                            )
                                    )
                                }
                                )
                                }

                            </div>
                        </div>
                        <div style={{ marginLeft: ' 16px', marginTop: '50px', flex: '2' }}>
                            <div className={cx('pay')}>
                                <div className={cx('promotion')}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>Khuyến mãi</p>
                                        <div className={cx('select-promotion')} >
                                            <AiOutlineTag /> Chọn hoặc nhập mã khuyến mãi
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '1.5rem', color: '#82869e' }}>Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua thêm để áp dụng</p>
                                </div>

                            </div>
                            <div className={cx('confirm-pay')}>
                                <div style={{ fontWeight: '700' }}>Thanh toán</div>
                                <div className={cx('pay-end')}><p>Tổng tạm tính</p><p></p></div>
                                <div className={cx('pay-end')}><p>Tổng tiền</p> </div>
                                <div className={cx('pay-end')}>(Đã bao gồm VAT)</div>
                                <button className={cx('btn-ctn')}>TIẾP TỤC</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataUserDelete={dataUserDelete}
                    check={check}
                />
            </div >
        )
    }
    else {
        return (
            <div>

                <div className={cx('container-empty')}>
                    <div className={cx('wrapper-empty')}>
                        <img src='https://shopfront-cdn.tekoapis.com/static/empty_cart.png' alt='' />
                        <div>Giỏ hàng chưa có sản phẩm nào</div>
                        <Link to='/'>
                            <button className={cx('btn-empty')}>Mua sắm ngay</button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Cart