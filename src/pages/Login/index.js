import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import Footer from '~/components/Layout/components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useContext } from 'react';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles)


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loadingApi, setLoadingApi] = useState(false);
    const navigate = useNavigate();
    const { loginContext, user } = useContext(UserContext);

    useEffect(() => {

        if (user.token) {
            navigate('/')
        }
    })
    const handleChange = event => {
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError('');
        }

        setEmail(event.target.value);
    };

    function handleLogin(event) {

        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin')
            return
        }
        setLoadingApi(true);
        fetch('http://localhost:3002/api/user/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (res.status === 200) {

                    return res.json()
                }
            }
            )
            .then((data) => {
                if (data.status === "success") {
                    localStorage.setItem('token', data.access_token)

                    loginContext(data.access_token);
                    setTimeout(() => {

                        toast.success('Đăng nhập thành công');
                        setLoadingApi(false);
                        navigate("/");
                    }, 1000)
                }
                else {
                    setTimeout(() => {
                        toast.error(data.message);
                        setLoadingApi(false);
                    }, 1000)
                }
            })



        event.preventDefault();
    }
    return (
        <div className={cx('container')}>

            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <form action=''>
                        <h1 style={{ textAlign: 'center' }}>Đăng Nhập</h1>
                        <div className={cx('input-box')} style={{ marginTop: '10px' }}>
                            <input id='email' type='email' placeholder='Email' required value={email} onChange={handleChange} />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <MdEmail className={cx('icon')} />
                        </div>
                        <div className={cx('input-box')} style={{ marginTop: '8px' }}>
                            <input type={isShowPassword === true ? 'text' : 'password'} placeholder='Mật khẩu' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className={cx('icon')} />
                            <div className={cx('icon-eye')} onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</div>

                        </div>
                        <div className={cx('remember-forgot')}>
                            <label><input type='checkbox' />Lưu mật khẩu</label>
                            <div>     <a href='/'> Quên mật khẩu</a></div>
                        </div>
                        <button style={{ marginTop: '20px' }} type='submit' className={cx('btn', email && password && !error ? 'active' : '')} disabled={email && password && !error ? false : true} onClick={handleLogin}>   {loadingApi && <AiOutlineLoading3Quarters icon="spinner" className={cx('spinner')} />} &nbsp; Đăng Nhập</button>
                        <div className={cx('register-link')}>
                            <p style={{ marginRight: '5px', cursor: 'pointer' }}>Chưa có tài khoản?
                            </p>
                            <Link to='/register'>   <div><div style={{ color: 'red', fontWeight: '600' }} >Đăng ký</div></div></Link>
                        </div>
                    </form>
                </div>
            </div >
            <Footer></Footer>
        </div >
    )
}

export default Login;