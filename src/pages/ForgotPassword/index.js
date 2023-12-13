import classNames from "classnames/bind";
import styles from './ForgotPassword.module.scss'
import { MdEmail } from 'react-icons/md';

import Footer from '~/components/Layout/components/Footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createAuthForgotPasswordService, authCodeForgotPasswordService } from "~/Services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const cx = classNames.bind(styles)
function ForgotPassword() {
    const [error, setError] = useState('');
    const [displayInputCode, setDisplayInputCode] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isAuthen, setIsAuthen] = useState(false);
    const [idCode, setIdCode] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    const handleChangeEmail = event => {
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError('');
        }

        setEmail(event.target.value);
    }
    const handleForget = async () => {
        const res = await createAuthForgotPasswordService(email);
        console.log(res);
        if (res.data.status === 'success') {
            setDisplayInputCode(true);
            toast.success('Vui nhập mã xác nhận đã được gửi về email của bạn')
            setIsAuthen(true);
            setIdCode(res.data.data.id);
        }
        else {
            setDisplayInputCode(false);
            toast.error(res.data.message);
        }
    }
    const handleAuthen = async () => {
        const res = await authCodeForgotPasswordService(idCode, code);
        console.log(res);
        if (res.data.status === 'success') {
            toast.success('Xác nhận thành công')

            navigate(`/resetpassword?idUser=${res.data.data.user}`)
        }
        else {
            toast.error('Vui lòng kiểm tra lại mã xác nhận')
        }
    }
    return (
        <div className={cx('container')}>

            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <form action=''>
                        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Quên mật khẩu</h1>
                        <div className={cx('input-box')} style={{ marginTop: '10px' }}>
                            <input id='email' type='email' placeholder='Email' required value={email} onChange={handleChangeEmail} />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <MdEmail className={cx('icon')} />
                        </div>
                        {displayInputCode && <div className={cx('input-box')} style={{ marginTop: '8px' }}>
                            <input type='text' placeholder='Mã xác nhận đã được gửi về email' required value={code} onChange={(e) => setCode(e.target.value)} />

                        </div>}

                        <button type="button" style={{ marginTop: '20px' }} className={cx('btn', email && !error ? 'active' : '')}
                            onClick={isAuthen ? handleAuthen : handleForget}
                            disabled={error ? true : false}>

                            {isAuthen ? 'Xác nhận' : 'Gửi mã xác nhận'}</button>
                        <div className={cx('register-link')}>
                            <Link to='/login'><div><div style={{ color: 'red', fontWeight: '600' }} >Đăng nhập/</div></div></Link>
                            <Link to='/register'><div><div style={{ color: 'red', fontWeight: '600' }} > Đăng ký</div></div></Link>
                        </div>
                    </form>
                </div>
            </div >
            <Footer></Footer>
        </div >
    );
}

export default ForgotPassword;