import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState } from "react";

import { AiOutlinePicture } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa6";
import Footer from "~/components/Layout/components/Footer";
import logoShop from "../../assets/images/logoShop.png";


const cx = classNames.bind(styles);
function Chat() {
    const [message, setMessage] = useState('');
    const handleTypeMessage = (e) => {
        setMessage(e.target.value);
    }
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('containener')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('sidebar-header')}>
                            Chats
                        </div>
                        <div className={cx('sidebar-search')}>
                            <input type="text" placeholder="Search contact / chat" />
                        </div>
                        <div className={cx('user-wrapper')}>
                            <div className={cx('user-containner')}>
                                <img className={cx('user-img')} src="https://connectme-html.themeyn.com/images/avatar/1.jpg" alt=""></img>
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}>Huynh Tien</div>
                                    <div className={cx('user-mess')}>Hello</div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={cx('chat-space')}>
                        <div className={cx('option')}>
                            <div className={cx('user-containner')}>
                                <img className={cx('user-img')} src={logoShop} alt=""></img>
                                <div className={cx('user-info')}>
                                    <div className={cx('user-name')}>TB Technology</div>
                                    <div className={cx('user-status')}>Active</div>
                                </div>
                            </div>
                            <div className={cx('user-option')}>
                                <button><FaPhoneAlt style={{ width: '20px', height: '20px' }} /></button>
                                <button><IoMdVideocam style={{ width: '20px', height: '20px' }} /></button>
                                <button><FaSearch style={{ width: '20px', height: '20px' }} /></button>
                            </div>
                        </div>
                        <div className={cx('chat-wrapper')}>
                            <div className={cx('history')}>


                            </div>

                        </div>
                        <div className={cx('input-wrapper')}>
                            <button> <IoMdAdd style={{ fontSize: '2rem' }} /></button>
                            <button> <AiOutlinePicture style={{ fontSize: '2rem' }} /></button>
                            <button> <MdOutlineAddReaction style={{ fontSize: '2rem' }} /></button>
                            <input onChange={handleTypeMessage} ></input>
                            <button><CiMicrophoneOn style={{ fontSize: '2rem' }} /></button>
                            <button><FaLocationArrow style={{ fontSize: '2.2rem' }} /></button>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chat;