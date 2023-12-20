import classNames from "classnames/bind";
import styles from "./ProfilePassWord.module.scss";
import { UserContext } from "~/context/UserContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    const { user } = useContext(UserContext)
    const handleConfirmPassWord = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setError('Mật khẩu không trùng khớp');
        }
        else {
            setError('');
        }
    }
    const userId = user.id
    const handleUpdate = () => {

        fetch(`https://be-web-mn5x.onrender.com/api/user/update-user/${userId}`, {
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
                console.log(data)
                if (data.message.status === 'error') {
                    toast.error(data.message.message)
                }
                else {
                    toast.success('Cập nhật mật khẩu thành công')
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
                <div className={cx('col-2')}>
                    <div className={cx('header')}>
                        <h1>Đổi mật khẩu</h1>

                    </div>
                    <div className={cx('content')}>
                        <div className={cx('user-input')} ><p>Mật khẩu cũ</p>
                            <input type={isShowOldPassword ? 'text' : 'password'} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            <div className={cx('icon-eye')}
                                onClick={() => setIsShowOldPassword(!isShowOldPassword)}>
                                {isShowOldPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                        <div className={cx('user-input')}><p>Mật khẩu mới</p>
                            <input type={isShowNewPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className={cx('icon-eye')}
                                onClick={() => setIsShowNewPassword(!isShowNewPassword)}>
                                {isShowNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>

                        </div>
                        <div className={cx('user-input')} ><p>Xác nhận mật khẩu mới</p>
                            <input type={isShowConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPassWord} />
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
    );
}

export default ProfilePassword;