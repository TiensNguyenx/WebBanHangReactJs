import styles from './Cart.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Footer from '~/components/Layout/components/Footer';
import ModalConfirmDeleteProduct from '~/components/Layout/components/ModalConfirmDeleteProduct/ModalConfirmDeleteProduct';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '~/context/UserContext';
import { useContext } from 'react';
import ModalConfirmDeleteAll from '~/components/Layout/components/ModalConfirmDeleteAll';
import { renderCartService, plustProductService, minusProductService } from '../../Services'
const cx = classNames.bind(styles)
function Cart() {
    const [carts, setCarts] = useState([])

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [productDelete, setProductDelete] = useState({})
    const [showModalLogin, setShowModalLogin] = useState(true);
    const [isShowModalDeleteAll, setIsShowModalDeleteAll] = useState(false);
    const { user, decreaseLength, increaseLength } = useContext(UserContext);
    const [idCart, setIdCart] = useState('')
    const [itemsPrice, setItemsPrice] = useState(0)
    const [toltalPrice, setTotalPrice] = useState(0)
    const [dataDeleteAll, setDataDeleteAll] = useState('')


    const renderCart = async () => {
        if (user.id) {
            let res = await renderCartService(user.id)
            if (res.data.status === 'success') {
                console.log(res)
                setCarts(res.data.data.orderItems)
                setIdCart(res.data.data._id)
                setItemsPrice(res.data.data.itemsPrice)
                setTotalPrice(res.data.data.totalPrice)

            }
            else {
                setCarts([])
            }
        }
    }
    useEffect(() => {
        renderCart()
    }, [user.id])
    const handleClose = () => {
        setIsShowModalDelete(false);
        setShowModalLogin(false);
        setIsShowModalDeleteAll(false)
        renderCart()
    }
    const handleDeleteItem = (idProduct) => {
        setIsShowModalDelete(true);
        setProductDelete({ idCart, idProduct })
        renderCart()
    }
    const handlePlus = async (idProduct) => {
        await plustProductService(idCart, idProduct)
        increaseLength()
        renderCart()
    }
    const handleMinus = async (idProduct) => {
        await minusProductService(idCart, idProduct)
        decreaseLength()
        renderCart()
    }
    function handleDeleteAll(idCart) {
        setIsShowModalDeleteAll(true)
        setDataDeleteAll(idCart)
        renderCart()
    }

    if (carts.length > 0) {
        return (
            <div>
                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: '3' }}>
                            <div className={cx('product-header')}>
                                <h1>Giỏ hàng</h1>
                                <div className={cx('delete-all')} onClick={() => { handleDeleteAll(idCart) }}>Xóa tất cả</div>
                            </div>
                            <div className={cx('product')}>
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
                                        (
                                            <div className={cx('item-wrapper')} key={index}>
                                                <div className={cx('info')}>

                                                    <div className={cx('item-name')}>
                                                        <div style={{ border: '1px solid #f0f0f0', width: '80px', height: '80px' }}>
                                                            <img src={item.image} alt=''>

                                                            </img>
                                                        </div>
                                                        <div className={cx('name')}>
                                                            <p> {item.name}</p>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={cx('new-price')}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}
                                                        </div>
                                                        <div className={cx('old-price')}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div className={cx('quantity')}>
                                                            <div className={cx('minus')} onClick={() => handleMinus(item.product)} >
                                                                <button >-</button>
                                                            </div>
                                                            <input style={{ textAlign: 'center' }} value={item.amount} onChange={() => { }} className={cx('number')} />
                                                            <div className={cx('plus')} onClick={() => handlePlus(item.product)} >
                                                                <button>+</button>
                                                            </div>
                                                        </div>
                                                        <div className={cx('delete')} onClick={() => handleDeleteItem(item.product)}>Xóa </div>
                                                    </div>

                                                    <div className={cx('total')}>
                                                        <p>{ }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                                )
                                }
                            </div>
                        </div>
                        <div style={{ marginLeft: ' 16px', marginTop: '35px', flex: '2' }}>
                            <div className={cx('pay')}>


                            </div>
                            <div style={{ backgroundColor: 'white', borderRadius: '8px' }}>
                                <div className={cx('pay-wrapper')}>
                                    <div className={cx('confirm-pay')}>
                                        <div style={{ fontWeight: '700' }}>Thanh toán</div>
                                        <div className={cx('pay-end')}><p>Tổng tạm tính</p></div>
                                        <div className={cx('pay-end')}><p>Tổng tiền</p> </div>
                                        <div className={cx('pay-end')}>(Đã bao gồm VAT)</div>

                                    </div>
                                    <div className={cx('pay-price')}>
                                        <div><p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemsPrice)}</p></div>
                                        <div><p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(toltalPrice)}</p></div>
                                    </div>
                                </div>
                                <Link to={`/pay?&idCart=${idCart}`} className={cx('btn-wrapper')}>    <button className={cx('btn-ctn')}>TIẾP TỤC</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ModalConfirmDeleteProduct
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={productDelete}


                />
                <ModalConfirmDeleteAll
                    show={isShowModalDeleteAll}
                    handleClose={handleClose}
                    dataDelete={dataDeleteAll}

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