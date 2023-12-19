import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import Menu from './Menu';


import { MenuItem } from './Menu';
import { PiSpeakerHigh } from 'react-icons/pi';
import { BsLaptop } from 'react-icons/bs';
import { GrMonitor } from 'react-icons/gr';
import { LuMonitorSpeaker } from 'react-icons/lu';
import { BiMicrochip } from 'react-icons/bi';
import { FaRegKeyboard } from 'react-icons/fa';
import { LuHeadphones } from 'react-icons/lu';
import { GrTechnology } from 'react-icons/gr';
import { GiVendingMachine } from 'react-icons/gi';
import { BiCctv } from 'react-icons/bi';
import { SiLogitech, SiRazer, SiSteelseries, SiCorsair } from "react-icons/si";
import { BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logoDucky from '../../../../assets/images/logoDucky.png'
const cx = classNames.bind(styles)

function Sidebar() {

    return (

        <div className={cx('container')}>
            <aside className={cx('wrapper')}>


                <button className={cx('list-btn')}> <BsList /><span>DANH MỤC SẢN PHẨM</span>
                    <input className={cx('input')} type="checkbox" />
                    <Menu className={cx('list-item')}>
                        <MenuItem title="Bàn phím Logitech" href={'#logitech'} icon={<SiLogitech />} />
                        <MenuItem title="Bàn phím Razer" href={'#razer'} icon={<SiRazer />} />
                        <MenuItem title="Bàn phím Corsair" href={'#corsair'} icon={<SiCorsair />} />
                        <MenuItem title="Bàn phím Steelseries" href={'#steelseries'} icon={<SiSteelseries />} />
                        <MenuItem title="Bàn phím Ducky" href={'#ducky'} icon={<img src={logoDucky} alt='' style={{ width: '18px', height: '18px' }} ></img>} />
                        <Link className={cx('menu-item')} to='/product?type=all'><FaRegKeyboard /><div>Xem tất cả bàn phim</div></Link>
                        {/* <MenuItem title="Phím, chuột, Gaming Gear" to="" icon={<FaRegKeyboard />} />
                        <MenuItem title="Loa, tai nghe, Webcam" to="" icon={<LuHeadphones />} />
                        <MenuItem title="Phụ kiện công nghệ " to="" icon={<GrTechnology />} />
                        <MenuItem title="Máy in, scan, vật tư máy in" to="" icon={<GiVendingMachine />} />
                        <MenuItem title="Máy chiếu, camera" to="" icon={<BiCctv />} /> */}

                    </Menu>
                </button>




                <Link to='Laptop' className={cx('subside')}>  <div > SẮM BÀN PHÍM MỚI</div></Link>
                <Link to='Screen' className={cx('subside')}> <div >BÀN PHÍM GAMING CHẤT</div></Link>
                <Link to='Pc' className={cx('subside')}>  <div > MUA BÀN PHÍM NHẬN QUÀ NGAY</div></Link>


            </aside>
        </div>

    );
}

export default Sidebar