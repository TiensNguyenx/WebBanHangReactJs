import classNames from "classnames/bind";
import styles from './ProfileInformation.module.scss'
import { useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "~/context/UserContext";
import { authEmail, getDetailUserService } from "~/Services/UserServices";

const cx = classNames.bind(styles);
function ProfileInformation() {



    const [onChangeEmail, setOnChangeEmail] = useState(false)
    const { user } = useContext(UserContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isAuthEmail, setIsAuthEmail] = useState()
    const [errorPhone, setErrorPhone] = useState('')
    const [errorEmail, setErrorEmail] = useState('')



    const handleUpdateUser = () => {
        if (!onChangeEmail) {
            fetch(`https://be-pbl3-commerce-web.onrender.com/api/user/update-user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ phone, name })
            }
            )
                .then((res) => { return res.json() })
                .then((data) => {

                    if (data.status === 'success') {
                        toast.success('Cập nhật thông tin thành công')
                        renderInforUser()
                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại')
                    }
                })
        }
        else {
            fetch(`https://be-pbl3-commerce-web.onrender.com/api/user/update-user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ phone, name, email })
            }
            )
                .then((res) => { return res.json() })
                .then((data) => {
                    if (data.data.status === 'success') {
                        toast.success('Cập nhật thành công')
                        renderInforUser()
                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại')
                    }
                })

        }

    }
    useEffect(() => {
        renderInforUser()
    }, [user])
    const renderInforUser = async () => {
        const res = await getDetailUserService(localStorage.getItem('userId'))
        console.log(res)
        setEmail(res.data.data.email)
        setName(res.data.data.name)
        setPhone(res.data.data.phone)
        setIsAuthEmail(res.data.data.isAuth)
    }
    const handleOnChangEmail = (e) => {
        setOnChangeEmail(true)
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (!isValidEmail(e.target.value)) {
            setErrorEmail('Email is invalid');
        } else {

            setErrorEmail('');
        }
        setEmail(e.target.value);
    }
    const handleOnChangeName = (e) => {

        setName(e.target.value)
    }
    const handleOnChangePhone = (e) => {
        function isValidPhone(phone) {
            return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        }
        if (!isValidPhone(e.target.value)) {
            setErrorPhone('Phone is invalid');
        } else {
            setErrorPhone('');
        }

        setPhone(e.target.value);
    }
    const handleAuthEmail = async () => {
        const res = await authEmail(email)
        console.log(res)
        if (res.data.status === 'success') {
            toast.success('Mã xác thực đã được gửi về email của bạn')

        }
        else {
            toast.error('Mã xác thực gửi thất bại')
        }
        setTimeout(() => {
            renderInforUser()
        }, 10000);
    }

    return (
        <div>

            <div className={cx('wrapper')}>
                <div className={cx('containner')}>

                    <div className={cx('col-2')}>
                        <div className={cx('header')}>
                            <h1>Thông tin tài khoản</h1>

                        </div>
                        <div className={cx('content')}>
                            <div className={cx('user-input')}><p>Họ và tên</p>
                                <input value={name} onChange={handleOnChangeName} type="text" />
                            </div>
                            <div className={cx('user-input')}><p>Enail</p>
                                <input value={email} onChange={handleOnChangEmail} type="text" />
                                {!isAuthEmail && <p style={{ color: 'red' }}>Vui lòng xác thực email</p>}
                                {!isAuthEmail && <button onClick={handleAuthEmail} className={cx('btn-auth')}>Cick vào đây để xác thực </button>}
                                {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
                            </div>
                            <div className={cx('user-input')} ><p>Số điện thoại</p>
                                <input value={phone} onChange={handleOnChangePhone} type="text" />
                                {errorPhone && <p style={{ color: 'red' }}>{errorPhone}</p>}
                            </div>

                            <div className={cx('update-btn', !errorEmail && !errorPhone ? 'active' : '')}>
                                <button onClick={handleUpdateUser} disabled={!errorEmail && !errorPhone ? false : true}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div >

    );
}

export default ProfileInformation;