import classNames from "classnames/bind"
import styles from './Pay.module.scss'
import Footer from "~/components/Layout/components/Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)

function Pay() {
    const [carts, setCarts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/carts')
            .then(res => res.json())
            .then(data => setCarts(data))
    }, [])
    const country = [
        'TP Huế', 'Đà Nẵng', 'Hà Nội', 'TP Hồ Chí Minh', 'Đà Lạt'
    ]
    const dataWards = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]
    const address = [
        "152 Hàm Nghi, Quận Thanh Khê, Đà Nẵng", "52 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng", "48 Hùng Vương, TP Huế, Thừa Thiên Huế"
    ]
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

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className={cx('ship-input')}><input style={{ paddingTop: '0' }} placeholder="Nhập họ và tên (bắt buộc) " required></input></div>
                                            <div className={cx('ship-input')}> <input style={{ paddingTop: '0' }} placeholder="Nhập số điện thoại (bắt buộc)" required></input></div>
                                        </div>
                                        <div className={cx('ship-input', 'width-100')}> <input placeholder="Nhập địa chỉ" required></input></div>
                                        <div className={cx('ship-input', 'width-100')}> <input placeholder="Nhập Email (không bắt buộc)"></input></div>
                                        <div className={cx('ship-input', 'width-100')}><input placeholder="Nhập ghi chú (không bắt buộc)"></input></div>
                                        <div className={cx('width-100')} style={{ paddingTop: '15px', paddingBottom: '15px', display: 'flex', alignItems: 'center' }} > <input type="checkbox" required style={{ width: '16px', height: '16px', marginRight: '5px' }}></input><span style={{ fontSize: '1.3rem', margin: '0px' }}>Nhấn "Thanh toán" đồng nghĩa với việc bạn đọc và đồng ý tuân theo <a href="fb.com" style={{ color: "#3366cc", textDecoration: 'underline' }}  >Điều khoản và Điều kiện</a></span></div>
                                    </div>

                                </div>
                            </div>
                            <div className={cx('receiving-information')}>
                                <div className={cx('recei-title')}>
                                    <h2>THÔNG TIN NHẬN HÀNG</h2>
                                </div>
                                <div className={cx('recei-wrapper')}>
                                    <Tabs
                                        defaultActiveKey="home"
                                        id="fill-tab-example"
                                        className="mb-3"
                                        fill
                                        variant='pills'
                                    >
                                        <Tab eventKey="home" title=" Nhận tại cửa hàng">
                                            <div style={{ padding: '20px' }}>

                                                <div className={cx('select-wrapper')} >
                                                    <div className={cx('select-container')}>
                                                        <label className={cx('lable')}>TỈNH/THẢNH PHỐ</label>
                                                        <input list="data-country" />
                                                        <datalist id="data-country">

                                                            <select className={cx('select')} >
                                                                {country.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                    <div className={cx('select-container')}>
                                                        <label className={cx('lable')} >QUẬN HUYỆN</label>
                                                        <input list="data-wards" />
                                                        <datalist id="data-wards">

                                                            <select className={cx('select')} >
                                                                {dataWards.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className={cx('select-wrapper')} style={{ display: 'flex', flexDirection: 'column' }} >
                                                    <div className={cx('select-container')} style={{ width: '100%' }}>
                                                        <label className={cx('lable')} >CỬA HÀNG</label>
                                                        <input list="data-ađdress" />
                                                        <datalist id="data-ađdress">

                                                            <select className={cx('select')} >
                                                                {address.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                    <div >
                                                        <label style={{ fontWeight: '500', fontSize: '1.2rem' }}>Ghi chú khác (nếu có)</label>
                                                        <div> <input className={cx('note-store')}></input></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="profile" title="Giao hàng tận nơi">
                                            <div style={{ padding: '20px' }}>

                                                <div className={cx('select-wrapper')} >
                                                    <div className={cx('select-container')}>
                                                        <label className={cx('lable')}>TỈNH/THẢNH PHỐ</label>
                                                        <input list="data-country" />
                                                        <datalist id="data-country">

                                                            <select className={cx('select')} >
                                                                {country.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                    <div className={cx('select-container')}>
                                                        <label className={cx('lable')} >QUẬN HUYỆN</label>
                                                        <input list="data-wards" />
                                                        <datalist id="data-wards">

                                                            <select className={cx('select')} >
                                                                {dataWards.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className={cx('select-wrapper')} style={{ display: 'flex' }} >
                                                    <div className={cx('select-container')} >
                                                        <label className={cx('lable')} >Chọn phường/xã</label>
                                                        <input list="data-ađdress" />
                                                        <datalist id="data-ađdress">

                                                            <select className={cx('select')} >
                                                                {address.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>
                                                    <div className={cx('select-container')} >
                                                        <label className={cx('lable')} >Số nhà/tên đường</label>
                                                        <input list="data-ađdress" />
                                                        <datalist id="data-ađdress">

                                                            <select className={cx('select')} >
                                                                {address.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>

                                                        </datalist>
                                                    </div>

                                                </div>
                                                <div >
                                                    <label style={{ fontWeight: '500', fontSize: '1.2rem' }}>Ghi chú khác (nếu có)</label>
                                                    <div> <input className={cx('note-store')}></input></div>
                                                </div>
                                            </div>
                                        </Tab>

                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-information')}>
                            <div className={cx('product-title')}>
                                <h2>THÔNG TIN ĐƠN HÀNG</h2>
                            </div>
                            {carts.map((item, index) => {
                                return (
                                    <div key={index} className={cx('product-wrapper')} >

                                        <div className={cx('product-img')}>
                                            <img src={item.src} alt=""></img>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className={cx('product-name')}>
                                                <p>{item.uptitle}</p>
                                            </div>
                                            <div className={cx('price')}>
                                                <p className={cx('new-price')}>{item.newprice}</p>
                                                <p className={cx('old-price')}>{item.oldprice}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={cx('total-price')}>
                                <p>Tổng tạm tính</p>
                                <p>Phí vận chuyển</p>
                                <p>Thành tiền</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><button className={cx('btn-pay')}>THANH TOÁN</button></div>
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