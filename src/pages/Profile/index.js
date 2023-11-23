import classNames from "classnames/bind";
import Footer from "~/components/Layout/components/Footer";
import styles from "./Profile.module.scss";

import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar2Check } from "react-icons/bs";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "~/context/UserContext";
const cx = classNames.bind(styles);
function ProfileInformation() {
    const { user } = useContext(UserContext)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    console.log(user.phone)
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
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                            </div>
                            <div className={cx('user-input')}><p>Enail</p>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                            </div>
                            <div className={cx('user-input')} ><p>Số điện thoại</p>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" />
                            </div>

                            <div className={cx('update-btn')}>
                                <button>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    );
}

export default ProfileInformation;