import { BsCalendar2Check } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from './SidebarUser.module.scss';
import classNames from "classnames/bind";
import { useState } from "react";
import { UserContext } from "~/context/UserContext";
import { useContext } from "react";
const cx = classNames.bind(styles);

function SideBarUser() {
    const [bold1, setBold1] = useState("bold")
    const [bold2, setBold2] = useState("")
    const [bold3, setBold3] = useState("")
    const [bold4, setBold4] = useState("")
    const { user } = useContext(UserContext)
    const onClick = (index) => {

        if (index === 1) {
            setBold1('bold')
            setBold2('')
            setBold3('')
            setBold4('')
        }
        else if (index === 2) {
            setBold1('')
            setBold2('bold')
            setBold3('')
            setBold4('')
        }
        else if (index === 3) {
            setBold1('')
            setBold2('')
            setBold3('bold')
            setBold4('')
        }
        else {
            setBold1('')
            setBold2('')
            setBold3('')
            setBold4('bold')
        }

    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('col-1')}>
                <div className={cx('user-information')}>
                    <div >
                        <img className={cx('user-img')} src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt=""></img>
                    </div>
                    <div className={cx('user-name')}>
                        <p>Tài khoản của</p>
                        <p style={{ textAlign: 'center' }}>{user.name}</p>
                    </div>
                </div>
                <div className={cx('options')}>
                    <Link to='/information'>
                        <div className={cx('option-item', bold1)} onClick={() => { onClick(1) }}>
                            <FaRegCircleUser /> Thông tin tài khoản
                        </div>
                    </Link >
                    <Link to='/order'>
                        <div className={cx('option-item', bold2)} onClick={() => { onClick(2) }}>
                            <BsCalendar2Check />  Quản lý đơn hàng
                        </div>
                    </Link>
                    <Link to='/password'>
                        <div className={cx('option-item', bold3)} onClick={() => { onClick(3) }}>
                            <RiLockPasswordLine />  Đổi mật khẩu
                        </div>
                    </Link>
                    <Link to='/noti'>
                        <div className={cx('option-item', bold4)} onClick={() => { onClick(4) }}>
                            <RiNotification4Line /> Thông báo
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBarUser;