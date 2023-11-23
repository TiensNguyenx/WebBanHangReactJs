import classNames from "classnames/bind";
import Footer from "~/components/Layout/components/Footer";
import styles from "./ProfileNoti.module.scss";

import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar2Check } from "react-icons/bs";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function ProfileNoti() {
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
                            <div className={cx('option-item')}>
                                <FaRegCircleUser /> Thông tin tải khoản
                            </div>
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
                            <h1>Thông báo của bạn</h1>
                            <div >Đánh dấu tất cả là đã đọc</div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('img-noti')}>   <img src="https://shopfront-cdn.tekoapis.com/static/e536f0592aa3c8b1.png" alt="" /></div>
                            <p>Bạn chưa có thông báo mới</p>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ProfileNoti;