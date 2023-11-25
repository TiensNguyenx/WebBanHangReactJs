import classNames from "classnames/bind";
import Footer from "~/components/Layout/components/Footer";
import styles from "./ProfileOrder.module.scss";

import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar2Check } from "react-icons/bs";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { renderCartService } from '../../Services'
import { Link } from 'react-router-dom'
import { useEffect } from "react";
const cx = classNames.bind(styles);
function ProfileOrder() {

    const renderCart = async () => {
        const res = renderCartService()
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
                                <p style={{ textAlign: 'center' }}>{localStorage.getItem('name')}</p>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <Link to='/information'>
                                <div className={cx('option-item')}>
                                    <FaRegCircleUser /> Thông tin tài khoản
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

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ProfileOrder;