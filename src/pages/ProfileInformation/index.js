import classNames from "classnames/bind";
import styles from './ProfileInformation.module.scss'
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "~/context/UserContext";


const cx = classNames.bind(styles);
function ProfileInformation() {



    const [onChangeEmail, setOnChangeEmail] = useState(false)
    const { user, loginContext } = useContext(UserContext)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [errorPhone, setErrorPhone] = useState('')
    const [errorEmail, setErrorEmail] = useState('')


    const handleUpdateUser = () => {
        if (!onChangeEmail) {
            fetch(`http://localhost:3002/api/user/update-user/${user.id}`, {
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
                        loginContext(localStorage.getItem('token'))

                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại')
                    }
                })
        }
        else {
            fetch(`http://localhost:3002/api/user/update-user/${user.id}`, {
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
                        loginContext(localStorage.getItem('token'))

                    }
                    else {
                        toast.error('Cập nhật thông tin thất bại')
                    }
                })

        }

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