
import styles from './footer.module.scss'
import { FaFacebook, } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function Footer() {

    return (
        <div className={cx('footer-wrapper')} >
            <div className={cx('footer-list')}>
                <div className={cx('footer-item')}>
                    <div style={{ flex: '2' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}>Thông tin chung</div>

                        <div className={cx('col-item')}>Giới thiệu về TB Technology</div >
                        <div className={cx('col-item')}>Tin tuyển dụng</div >
                        <div className={cx('col-item')}>Tin tức</ div>
                        <div className={cx('col-item')}>Tin khuyến mãi</ div>
                        <div className={cx('col-item')}>Liên hệ, góp ý</ div>
                        <div className={cx('col-item')}>Khách hàng doanh nghiệp</ div>

                    </div>
                    <div style={{ flex: '2' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}>Hỗ trợ khách hàng</div>
                        <div className={cx('col-item')}>Tìm hiểu về mua trả góp</div >
                        <div className={cx('col-item')}>Chính sách vận chuyển, giao hàng</div >
                        <div className={cx('col-item')}>Chính sách, quy định chung</div >
                        <div className={cx('col-item')}>Chính sách bảo hành</div >
                        <div className={cx('col-item')}>Bảo mật thông tin khách hàng</div >
                        <div className={cx('col-item')}>Khách hàng doanh nghiệp</div >

                    </div>

                    <div style={{ flex: '3', marginRight: '45px' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}><span style={{ color: 'red' }}>TB Technology</span> Đà Nẵng</div>

                        <didiv className={cx('col-item')}><span style={{ fontWeight: '700' }}>Thời gian làm việc:</span> 07h30 - 20h30</didiv >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Showroom 1:</span> 152 Hàm Nghi, Quận Thanh Khê, Đà Nẵng</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Tel:</span> (0236) 3 888 000 Mobile: (84) 0903 555 310</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email:</span> danang@tbshop.com.vn</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Showroom 2:</span> 52 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng</div >
                        <div className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Email:</span> danang@tbshop.com.vn</div >
                        <div className={cx('col-title')}><span style={{ color: 'red' }}>TB Technology</span> Huế</div>div
                        <div className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Thời gian làm việc:</span> 07h30 - 20h30</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Địa chỉ:</span>48 Hùng Vương, TP.Huế, Thừa Thiên Huế </div >
                        <div className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Tel:</span> (0234) 3 977 000 - Fax: (0234) 3 3935 468</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email:</span> hue@tbshop.com.vn</div >
                    </div>
                    <div style={{ flex: '3' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}>Customer's Care</div>
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}> Trung tâm Bảo Hành và Sửa chữa: </span>Tầng 3 - 152 Hàm Nghi, Đà Nẵng (Giờ LV: 7:30 - 11:30 và 13:30 - 17:30 )</div >
                        <div className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Tel: </span></div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Gọi sửa chữa: </span>(0236)3 655 000 </div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Hotline sửa chữa:</span> 0911 299 228 </div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Gọi kỹ thuật:</span> (0236)3 872 000 </div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Quản lý chất lượng dịch vụ:</span> 1800 1222</div >
                        <div className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email: </span>danang@tbshop.com.vn</div >
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div className={cx('col-icon')} style={{ marginRight: '15px' }}><FaFacebook style={{ width: '33px', height: '28px' }} /> </div >

                            <div className={cx('col-icon')} style={{ marginRight: '15px' }} ><RiInstagramFill style={{ width: '33px', height: '30px' }} /> </div >
                            <div className={cx('col-icon')}><BsYoutube style={{ width: '33px', height: '33px' }} /> </div >
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Footer;