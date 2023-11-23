import classNames from "classnames/bind";
import Footer from "~/components/Layout/components/Footer";
import styles from './ProfileInformation.module.scss'

import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar2Check } from "react-icons/bs";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "~/context/UserContext";


const cx = classNames.bind(styles);
function ProfileInformation() {

    const [name, setName] = useState(localStorage.getItem('name'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [phone, setPhone] = useState(localStorage.getItem('phone'))
    const [onChangeEmail, setOnChangeEmail] = useState(false)
    const { toastCustom } = useContext(UserContext)
    const [errorPhone, setErrorPhone] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const userId = localStorage.getItem('idUser')

    const handleUpdateUser = () => {
        if (!onChangeEmail) {
            fetch(`http://localhost:3002/api/user/update-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ phone, name })

            }
            )
                .then((res) => { return res.json() })
                .then((data) => {
                    console.log(data)
                    if (data.status === 'success') {
                        toast.success('Cập nhật thông tin thành công', { ...toastCustom })
                        setEmail(data.data.email)
                        localStorage.setItem('email', data.data.email)
                        setName(data.data.name)
                        localStorage.setItem('name', data.data.name)
                        setPhone(data.data.phone)
                        localStorage.setItem('phone', data.data.phone)
                        console.log(name)
                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại', { ...toastCustom })
                    }
                })
        }
        else {
            fetch(`http://localhost:3002/api/user/update-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ phone, name, email })

            }
            )
                .then((res) => { return res.json() })
                .then((data) => {
                    if (data.data.status === 'success') {
                        toast.success('Cập nhật thành công', { ...toastCustom })
                        setEmail(data.data.email)
                        setName(data.data.name)
                        setPhone(data.data.phone)
                    }
                })

        }
    }
    const handleOnChangEmail = (e) => {
        setOnChangeEmail(true)
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (!isValidEmail(e.target.value)) {
            setErrorEmail('Email is invalid');
        } else {

            setErrorEmail('');
        }
        setEmail(e.target.value);



    }
    const handleOnChangeName = (e) => {

        setName(e.target.value)
    }
    const handleOnChangePhone = (e) => {
        function isValidPhone(phone) {
            return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        }
        if (!isValidPhone(e.target.value)) {
            setErrorPhone('Phone is invalid');
        } else {
            setErrorPhone('');
        }

        setPhone(e.target.value);
    }
    return (
        <div>

            <div className={cx('wrapper')}>
                <div className={cx('containner')}>
                    <div className={cx('col-1')}>
                        <div className={cx('user-information')}>
                            <div >
                                <img className={cx('user-img')} src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt=""></img>
                            </div>
                            <div className={cx('user-name')}>
                                <p>Tài khoản của</p>
                                <p>UserName</p>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <Link to='/information'>
                                <div className={cx('option-item')}>
                                    <FaRegCircleUser /> Thông tin tải khoản
                                </div>
                            </Link >
                            <Link to='/order'>
                                <div className={cx('option-item')}>
                                    <BsCalendar2Check />  Quản lý đơn hàng
                                </div>
                            </Link>
                            <Link to='/password'>
                                <div className={cx('option-item')}>
                                    <RiLockPasswordLine />  Đổi mật khẩu
                                </div>
                            </Link>
                            <Link to='/noti'>
                                <div className={cx('option-item')}>
                                    <RiNotification4Line /> Thông báo
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('col-2')}>
                        <div className={cx('header')}>
                            <h1>Thông tin tài khoản</h1>

                        </div>
                        <div className={cx('content')}>
                            <div className={cx('user-input')}><p>Họ và tên</p>
                                <input value={name} onChange={handleOnChangeName} type="text" />
                            </div>
                            <div className={cx('user-input')}><p>Enail</p>
                                <input value={email} onChange={handleOnChangEmail} type="text" />
                                {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
                            </div>
                            <div className={cx('user-input')} ><p>Số điện thoại</p>
                                <input value={phone} onChange={handleOnChangePhone} type="text" />
                                {errorPhone && <p style={{ color: 'red' }}>{errorPhone}</p>}
                            </div>

                            <div className={cx('update-btn', !errorEmail && !errorPhone ? 'active' : '')}>
                                <button onClick={handleUpdateUser} disabled={!errorEmail && !errorPhone ? false : true}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div >

    );
}

export default ProfileInformation;