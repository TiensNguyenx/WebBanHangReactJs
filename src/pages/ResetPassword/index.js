import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";

import Footer from '~/components/Layout/components/Footer';

import { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ResetPasswordService } from '~/Services';
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ResetPassword() {


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassWord, setIsShowConfirmPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const idUser = urlParams.get('idUser');
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    function handleOnChangeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
        if (event.target.value !== password) {
            setErrorConfirmPassword('Mật khẩu không khớp');
        } else {
            setErrorConfirmPassword('');
        }
    }
    console.log(idUser)
    const handleReset = async () => {
        const res = await ResetPasswordService(idUser, password);
        if (res.data.status === 'success') {
            toast.success('Đặt lại mật khẩu thành công')
            navigate('/login')
            console.log(res)
        }
        else {
            toast.error('Đặt lại mật khẩu thất bại')
        }
    }
    return (
        <div className={cx('container')}>

            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <form action=''>
                        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Đặt lại mật khẩu</h1>
                        <div className={cx('input-box')} style={{ marginTop: '8px' }}>
                            <input type={isShowPassword === true ? 'text' : 'password'} placeholder='Mật khẩu' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className={cx('icon')} />
                            <div className={cx('icon-eye')} onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</div>

                        </div>
                        <div className={cx('input-box', 'confirm-password')} style={{ marginTop: '8px' }}>
                            <input type={isShowConfirmPassWord === true ? 'text' : 'password'} placeholder='Nhập lại mật khẩu' required onChange={handleOnChangeConfirmPassword} />
                            <FaLock className={cx('icon')} />
                            {errorConfirmPassword && <p style={{ color: 'red' }}>{errorConfirmPassword}</p>}
                            <div className={cx('icon-eye')} onClick={() => setIsShowConfirmPassword(!isShowConfirmPassWord)}>{isShowConfirmPassWord ? <AiFillEye /> : <AiFillEyeInvisible />}</div>
                        </div>
                        <button style={{ marginTop: '20px' }} type='button' className={cx('btn', confirmPassword && password && !errorConfirmPassword ? 'active' : '')}
                            disabled={confirmPassword && password && !errorConfirmPassword ? false : true} onClick={handleReset}>

                            Cập nhật</button>

                    </form>
                </div>
            </div >
            <Footer></Footer>
        </div >
    );
}

export default ResetPassword;