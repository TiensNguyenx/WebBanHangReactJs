import classNames from "classnames/bind"
import styles from './Pay.module.scss'
import Footer from "~/components/Layout/components/Footer";

import { useState, useContext, useEffect } from "react";
import { orderProductService } from '../../Services'
import { UserContext } from "~/context/UserContext";
import { renderCartService, deleteAllProductService } from "~/Services";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const cx = classNames.bind(styles)

function Pay() {
    const { user, toastCustom, resetLength } = useContext(UserContext)
    const [fullName, setFullname] = useState('')
    const [addressUser, setAddressUser] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [noteUser, setNoteUser] = useState('')
    const [addressShipping, setAddressShipping] = useState('')
    const [cityShipping, setCityShipping] = useState('')
    const [noteShipping, setNoteShipping] = useState('')
    const [addressShop, setAddressShop] = useState('')
    const [cityShop, setCityShop] = useState('')
    const [isShipping, setIsShipping] = useState(false)
    const [checkedHome, setCheckedHome] = useState(true)
    const [checkedShipping, setCheckedShipping] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [temporaryPrice, setTemporaryPrice] = useState(0)
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [idCart, setIdCart] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const navigate = useNavigate();

    const handleOrder = async () => {
        setLoadingApi(true)
        let shippingMethod
        if (isShipping) {
            shippingMethod = 'giao hang tan noi'
        }
        else {
            shippingMethod = 'nhan tai cua hang'

        }
        const res = await orderProductService(fullName, addressUser, email, phone, noteUser, shippingMethod, addressShipping, cityShipping, noteShipping, addressShop, cityShop)
        if (res.data.status === 'success') {
            toast.success('Đặt hàng thành công', { ...toastCustom })
            const res = await deleteAllProductService(idCart)
            console.log(res)
            resetLength()
            navigate('/')
        }

    }


    useEffect(() => {
        if (!user.id) {
            navigate('/')
        }
    })


    const renderCart = async () => {
        if (user.id) {
            const res = await renderCartService(user.id)
            console.log(res)
            if (res.data.status === 'success') {
                setIdCart(res.data.data._id)
                setTemporaryPrice(res.data.data.itemsPrice)
                setTotalPrice(res.data.data.totalPrice)


            }
        }
    }
    const handleTabHome = () => {

        setCheckedHome(true)
        setCheckedShipping(false)
        setIsShipping(false)

    }
    const handleTabShip = () => {

        setCheckedShipping(true)
        setCheckedHome(false)
        setIsShipping(true)

    }
    function handleChangeEmail(event) {
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (!isValidEmail(event.target.value)) {
            setErrorEmail('Email is invalid');
        } else {
            setErrorEmail('');
        }

        setEmail(event.target.value);

    }
    function handleChangePhone(event) {
        function isValidPhone(phone) {
            return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        }
        if (!isValidPhone(event.target.value)) {
            setErrorPhone('Phone is invalid');
        } else {
            setErrorPhone('');
        }

        setPhone(event.target.value);
    }
    renderCart()
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <h1>THANH TOÁN</h1>
                    </div>
                    <div style={{ display: 'flex' }}>

                        <div className={cx('checkout')}>
                            <div className={cx('information')}>


                                <div className={cx('client-title')}>
                                    <h2>THÔNG TIN KHÁCH HÀNG</h2>
                                </div>
                                <div className={cx('client-information')}>

                                    <div style={{ padding: '20px' }}>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <div className={cx('ship-input')} style={{ marginBottom: 0 }}><label className={cx('lable-input')}>Nhập họ và tên (bắt buộc)</label><input style={{ paddingTop: '0' }} required onChange={(e) => setFullname(e.target.value)} /></div>
                                            <div className={cx('ship-input')} style={{ marginBottom: 0 }}> <label className={cx('lable-input')}>Nhập số điện thoại (bắt buộc)</label><input style={{ paddingTop: '0' }} required onChange={handleChangePhone} />{errorPhone && <p style={{ color: 'red', fontSize: '1.5rem' }}>{errorPhone}</p>}</div>
                                        </div>
                                        <div className={cx('ship-input', 'width-100')}> <label className={cx('lable-input')}>Nhập địa chỉ</label> <input required onChange={(e) => setAddressUser(e.target.value)} /></div>
                                        <div className={cx('ship-input', 'width-100')}> <label className={cx('lable-input')}> Nhập Email </label> <input onChange={handleChangeEmail} />   {errorEmail && <p style={{ color: 'red', fontSize: '1.5rem' }}>{errorEmail}</p>}</div>
                                        <div className={cx('ship-input', 'width-100')}> <label className={cx('lable-input')}>Nhập ghi chú (nếu có) </label> <input onChange={(e) => setNoteUser(e.target.value)} /></div>
                                        <div className={cx('width-100')} style={{ paddingTop: '15px', paddingBottom: '15px', display: 'flex', alignItems: 'center' }} > <input type="checkbox" required style={{ width: '16px', height: '16px', marginRight: '5px' }}></input>{loadingApi && <AiOutlineLoading3Quarters icon="spinner" className={cx('spinner')} />}<span style={{ fontSize: '1.3rem', margin: '0px' }}>Nhấn "Thanh toán" đồng nghĩa với việc bạn đọc và đồng ý tuân theo <a href="fb.com" style={{ color: "#3366cc", textDecoration: 'underline' }}  >Điều khoản và Điều kiện</a></span></div>
                                    </div>

                                </div>
                            </div>
                            <div className={cx('receiving-information')}>
                                <div className={cx('recei-title')}>
                                    <h2>THÔNG TIN NHẬN HÀNG</h2>
                                </div>
                                <div className={cx('recei-wrapper')}>
                                    <div className={cx('select-method')}>
                                        <div className={cx('store-title', checkedHome ? 'active' : '')} onClick={handleTabHome} >Nhận tại cửa hàng</div>
                                        <div className={cx('shipping-title', checkedShipping ? 'active' : '')} onClick={handleTabShip}> Giao hàng tận nơi</div>

                                    </div>

                                    {isShipping ? (
                                        <div style={{ padding: '20px' }} className={cx('shipping')}>

                                            <div className={cx('select-wrapper')} >
                                                <div className={cx('select-container')}>
                                                    <label className={cx('lable-input')}>TỈNH/THẢNH PHỐ</label>
                                                    <input onChange={(e) => { setCityShipping(e.target.value) }} />

                                                </div>

                                            </div>
                                            <div className={cx('select-wrapper')} style={{ display: 'flex' }} >

                                                <div className={cx('select-container')} >
                                                    <label className={cx('lable-input')} >Số nhà/tên đường</label>
                                                    <input onChange={(e) => setAddressShipping(e.target.value)} />

                                                </div>

                                            </div>
                                            <div >
                                                <label className={cx('lable-input')}>Ghi chú khác (nếu có)</label>
                                                <div> <input className={cx('note-store')} onChange={(e) => setNoteShipping(e.target.value)}></input></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '20px' }} className={cx('store')}>
                                            <div className={cx('select-wrapper')} >
                                                <div className={cx('select-container')}>
                                                    <label className={cx('lable-input')}>TỈNH/THẢNH PHỐ</label>
                                                    <input onChange={(e) => setCityShop(e.target.value)} />

                                                </div>

                                            </div>
                                            <div className={cx('select-wrapper')} style={{ display: 'flex', flexDirection: 'column' }} >
                                                <div className={cx('select-container')} style={{ width: '100%' }}>
                                                    <label className={cx('lable-input')} >ĐỊA CHỈ CỬA HÀNG</label>
                                                    <input onChange={(e) => setAddressShop(e.target.value)} />

                                                </div>
                                                <div >
                                                    <label className={cx('lable-input')}>Ghi chú khác (nếu có)</label>
                                                    <div> <input className={cx('note-store')}></input></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}







                                </div>
                            </div>
                        </div>
                        <div className={cx('product-information')}>
                            <div className={cx('product-title')}>
                                <h2>THÔNG TIN ĐƠN HÀNG</h2>
                            </div>

                            <div className={cx('total-price')}>
                                <div className={cx('price')}>    <p>Tổng tạm tính</p> <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(temporaryPrice)}</p></div>
                                <div className={cx('price')}> <p>Phí vận chuyển</p> <p>30.000 đ</p></div>
                                <div className={cx('price')}>   <p>Thành tiền</p><p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</p></div>
                                <div style={{ display: 'flex', justifyContent: 'center' }} onClick={handleOrder}><button className={cx('btn-pay', fullName && phone && email && !errorEmail && !errorPhone ? 'active' : '')} disabled={fullName && phone && email && !errorEmail && !errorPhone ? false : true}>THANH TOÁN</button></div>
                            </div>
                        </div>
                    </div>
                </div>

            </ div >
            <Footer />
        </>
    );
}

export default Pay;