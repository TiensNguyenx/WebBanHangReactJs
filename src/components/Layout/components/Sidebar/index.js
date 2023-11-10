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
import { BsList } from 'react-icons/bs';
const cx = classNames.bind(styles)

function Sidebar() {

    return (

        <div className={cx('container')}>
            <aside className={cx('wrapper')}>


                <button className={cx('list-btn')}> <BsList /><span>DANH MỤC SẢN PHẨM</span>
                    <input className={cx('input')} type="checkbox" />
                    <Menu className={cx('list-item')}>
                        <MenuItem title="Tin tức khuyến mãi" href={'#sp'} icon={<PiSpeakerHigh />} />
                        <MenuItem title="Máy tính xách tay" to="" icon={<BsLaptop />} />
                        <MenuItem title="Màn hình máy tính" to="" icon={<GrMonitor />} />
                        <MenuItem title="Máy tính để bàn" to="" icon={<LuMonitorSpeaker />} />
                        <MenuItem title="Linh kiện máy tính" to="" icon={<BiMicrochip />} />
                        <MenuItem title="Phím, chuột, Gaming Gear" to="" icon={<FaRegKeyboard />} />
                        <MenuItem title="Loa, tai nghe, Webcam" to="" icon={<LuHeadphones />} />
                        <MenuItem title="Phụ kiện công nghệ " to="" icon={<GrTechnology />} />
                        <MenuItem title="Máy in, scan, vật tư máy in" to="" icon={<GiVendingMachine />} />
                        <MenuItem title="Máy chiếu, camera" to="" icon={<BiCctv />} />

                    </Menu>
                </button>




                <div className={cx('subside')}> SẮM LAPTOP TỰU TRƯỜNG</div>
                <div className={cx('subside')}>MÀN HÌNH SAMSUNG GIÁ CHẤT</div>
                <div className={cx('subside')}> BUILD PC NHẬN PC</div>


            </aside>
        </div>

    );
}

export default Sidebar