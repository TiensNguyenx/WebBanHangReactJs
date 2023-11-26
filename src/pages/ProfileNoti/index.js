import classNames from "classnames/bind";

import styles from "./ProfileNoti.module.scss";


const cx = classNames.bind(styles);
function ProfileNoti() {
    return (
        <div>
            <div className={cx('wrapper')}>
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
    );
}

export default ProfileNoti;