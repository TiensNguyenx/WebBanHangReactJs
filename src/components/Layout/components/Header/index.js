import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrNotification, GrLogout } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai"

import { BsCartCheck } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi"
import { BsNewspaper } from "react-icons/bs"

import ModalConfirmLogout from '../ModalConfirmLogout/ModalConfirmLogout';
import { useContext, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import Search from '../Search';


const cx = classNames.bind(styles)

function Header() {

    const { user, lengthCart, getLengthCartContext } = useContext(UserContext);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const handleLogout = () => {

        setIsShowModalConfirm(true);
    }
    function handleClose() {
        setIsShowModalConfirm(false);
    }

    getLengthCartContext()


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div >
                    <Link to="/"><img className={cx('logo')} src='https://philong.com.vn/media/banner/logo_philong11.png' alt=''></img></Link>
                </div>
                <div className={cx('input')} >

                    <div className={cx('btn-list')} ><span style={{ fontSize: '1.5rem' }}>Tất cả danh mục  </span>  <div ><AiOutlineDown /></div></div>
                    <Search />
                </div>

                <div className={cx('list-item')} >
                    <Link to="/news">
                        <div className={cx('item')} >
                            <button className={cx('icon')}>  <BsNewspaper style={{ width: '2rem', height: '2rem' }} /></button>
                            <span className={cx('subtiltle')}>Tin tức</span>
                        </div >
                    </Link>

                    <Link to="/cart">
                        <div className={cx('item', 'custom-item')} >
                            <button className={cx('icon')}> <AiOutlineShoppingCart style={{ width: '2rem', height: '2rem' }} /></button>
                            <span className={cx('subtiltle')}>Giỏ hàng</span>
                            {user && user.auth === true ? (<div className={cx('count-cart')}>{lengthCart}</div>) : ''}
                        </div>
                    </Link>

                    <Link to="chat">
                        <div className={cx('item')}>
                            <button className={cx('icon')}>  <BsChatDots style={{ width: '2rem', height: '2rem' }} /></button>
                            <span className={cx('subtiltle')}>Liên hệ</span>
                        </div>
                    </Link>
                    {user && user.auth === true ? (
                        <div className={cx('item')} >
                            <div >


                                <div className={cx('whenlogin')}>

                                    {/* <button className={cx('icon')}> <AiOutlineUser style={{ width: '2rem', height: '2rem' }} /></button> */}
                                    <div className={cx('avatar-user')}>   <img src='https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg' alt='avatar' />   <span className={cx('username')} > {user.name} </span></div>
                                    <div>
                                        <ul className={cx('nav')}>
                                            <Link to='/information'> <li className={cx('subnav')}><button> <span className={cx('icon-subnav')}><BiUserCircle /></span>Thông tin tài khoản</button></li></Link>
                                            <Link to='/cart'>      <li className={cx('subnav')}><button><span className={cx('icon-subnav')}><BsCartCheck /></span>Quản lý giỏ hàng</button></li></Link>
                                            <li className={cx('subnav')}><button><span className={cx('icon-subnav')}><GrNotification /></span>Thông báo</button></li>
                                            <li className={cx('subnav')}><button onClick={handleLogout} > <span className={cx('icon-subnav', 'last-icon')}><GrLogout /></span>Đăng xuất</button></li>
                                        </ul>
                                    </div >
                                </div>



                            </div>


                        </div>
                    ) : (
                        <div className={cx('item')} >
                            <Link to='/login'>   <button className={cx('icon')}> <AiOutlineUser style={{ width: '2rem', height: '2rem' }} /></button></Link>
                            <span className={cx('subtiltle')}>Đăng nhập</span>
                        </div>
                    )}
                </div>
                {/* Logo,search,icon */}
            </div>
            <ModalConfirmLogout
                handleClose={handleClose}
                show={isShowModalConfirm}
            />
        </header>

    );
}

export default Header;