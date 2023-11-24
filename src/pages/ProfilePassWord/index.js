import classNames from "classnames/bind";
import Footer from "~/components/Layout/components/Footer";
import styles from "./ProfilePassWord.module.scss";

import { UserContext } from "~/context/UserContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar2Check } from "react-icons/bs";
import { RiLockPasswordLine, RiNotification4Line } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { useEffect } from "react";
const cx = classNames.bind(styles);
function ProfilePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const { toastCustom } = useContext(UserContext)
    const handleConfirmPassWord = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setError('Mật khẩu không trùng khớp');
        }
        else {
            setError('');
        }
    }
    const userId = localStorage.getItem('idUser');
    const handleUpdate = () => {

        fetch(`http://localhost:3002/api/user/update-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ oldPassword, password })

        }
        )
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.data.message === 'error') {
                    toast.error(data.message.message, { ...toastCustom })
                }
                else {
                    toast.success('Cập nhật mật khẩu thành công', { ...toastCustom })
                    setOldPassword('')
                    setPassword('')
                    setConfirmPassword('')
                }
            })
    }
    useEffect(() => {

    }, [confirmPassword])
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
                            <h1>Đổi mật khẩu</h1>

                        </div>
                        <div className={cx('content')}>
                            <div className={cx('user-input')} ><p>Mật khẩu cũ</p>
                                <input type={isShowOldPassword ? 'text' : 'password'} onChange={(e) => setOldPassword(e.target.value)} />
                                <div className={cx('icon-eye')}
                                    onClick={() => setIsShowOldPassword(!isShowOldPassword)}>
                                    {isShowOldPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </div>
                            </div>
                            <div className={cx('user-input')}><p>Mật khẩu mới</p>
                                <input type={isShowNewPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                                <div className={cx('icon-eye')}
                                    onClick={() => setIsShowNewPassword(!isShowNewPassword)}>
                                    {isShowNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </div>

                            </div>
                            <div className={cx('user-input')} ><p>Xác nhận mật khẩu mới</p>
                                <input type={isShowConfirmPassword ? 'text' : 'password'} onChange={handleConfirmPassWord} />
                                <div className={cx('icon-eye')}
                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                    {isShowConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </div>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                            </div>

                            <div className={cx('update-btn', !error && oldPassword && password && confirmPassword ? 'active' : '')} >
                                <button disabled={!error && oldPassword && password && confirmPassword ? false : true} onClick={handleUpdate}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ProfilePassword;