import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import Footer from '~/components/Layout/components/Footer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const navigate = useNavigate();

    function handleLogin(event) {

        // select * from user where email = useremail and pass = password 
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUsers(data)

                }
            })
        const user = users.find((user) => user.username === username && user.password === password);
        const ktra = users.includes(user, 0)
        if (ktra) {
            toast.success('Đăng nhập thành công')
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('name', user.username);
            sessionStorage.setItem('img', user.img);
            navigate("/");


        }
        else {
            toast.error('Đăng nhập thất bại')
        }


        event.preventDefault();

    }




    return (
        <div className={cx('container')}>

            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <form action=''>
                        <h1 style={{ textAlign: 'center' }}>Đăng Nhập</h1>
                        <div className={cx('input-box')} style={{ marginTop: '10px' }}>
                            <input type='text' placeholder='Email' required value={username} onChange={(e) => setUsername(e.target.value)} />
                            <MdEmail className={cx('icon')} />
                        </div>
                        <div className={cx('input-box')} style={{ marginTop: '8px' }}>
                            <input type='password' placeholder='Mật khẩu' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className={cx('icon')} />
                        </div>
                        <div className={cx('remember-forgot')}>
                            <label><input type='checkbox' />Lưu mật khẩu</label>
                            <div>     <a href='/'> Quên mật khẩu</a></div>
                        </div>
                        <button style={{ marginTop: '20px' }} type='submit' className={cx('btn')} onClick={handleLogin}>Đămg Nhập</button>
                        <div className={cx('register-link')}>
                            <p style={{ marginRight: '5px', cursor: 'pointer' }}>Chưa có tài khoản?
                            </p>
                            <Link to='/register'>   <div><div style={{ color: 'red', fontWeight: '600' }} >Đăng ký</div></div></Link>
                        </div>
                    </form>
                </div>
            </div >
            <Footer></Footer>
        </div>
    )
}

export default Login;