
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

                        <a href='/' className={cx('col-item')}>Giới thiệu về Phi Long</a >
                        <a href='/' className={cx('col-item')}>Tin tuyển dụng</a >
                        <a href='/' className={cx('col-item')}>Tin tức</a >
                        <a href='/' className={cx('col-item')}>Tin khuyến mãi</a >
                        <a href='/' className={cx('col-item')}>Liên hệ, góp ý</a >
                        <a href='/' className={cx('col-item')}>Khách hàng doanh nghiệp</a >

                    </div>
                    <div style={{ flex: '2' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}>Hỗ trợ khách hàng</div>
                        <a href='/' className={cx('col-item')}>Tìm hiểu về mua trả góp</a >
                        <a href='/' className={cx('col-item')}>Chính sách vận chuyển, giao hàng</a >
                        <a href='/' className={cx('col-item')}>Chính sách, quy định chung</a >
                        <a href='/' className={cx('col-item')}>Chính sách bảo hành</a >
                        <a href='/' className={cx('col-item')}>Bảo mật thông tin khách hàng</a >
                        <a href='/' className={cx('col-item')}>Khách hàng doanh nghiệp</a >

                    </div>

                    <div style={{ flex: '3', marginRight: '45px' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}><span style={{ color: 'red' }}>Phi Long</span> Đà Nẵng</div>

                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Thời gian làm việc:</span> 07h30 - 20h30</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Showroom 1:</span> 152 Hàm Nghi, Quận Thanh Khê, Đà Nẵng</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Tel:</span> (0236) 3 888 000 Mobile: (84) 0903 555 310</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email:</span> danang@philong.com.vn</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Showroom 2:</span> 52 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng</a >
                        <a href='/' className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Email:</span> danang@philong.com.vn</a >
                        <div className={cx('col-title')}><span style={{ color: 'red' }}>Phi Long</span> Huế</div>

                        <a href='/' className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Thời gian làm việc:</span> 07h30 - 20h30</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Địa chỉ:</span>48 Hùng Vương, TP.Huế, Thừa Thiên Huế </a >
                        <a href='/' className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Tel:</span> (0234) 3 977 000 - Fax: (0234) 3 3935 468</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email:</span> hue@philong.com.vn</a >

                    </div>
                    <div style={{ flex: '3' }} className={cx('footer-col')}>
                        <div className={cx('col-title')}>Customer's Care</div>


                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}> Trung tâm Bảo Hành và Sửa chữa: </span>Tầng 3 - 152 Hàm Nghi, Đà Nẵng (Giờ LV: 7:30 - 11:30 và 13:30 - 17:30 )</a >
                        <a href='/' className={cx('col-item')}> <span style={{ fontWeight: '700' }}>Tel: </span></a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Gọi sửa chữa: </span>(0236)3 655 000 </a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Hotline sửa chữa:</span> 0911 299 228 </a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Gọi kỹ thuật:</span> (0236)3 872 000 </a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Quản lý chất lượng dịch vụ:</span> 1800 1222</a >
                        <a href='/' className={cx('col-item')}><span style={{ fontWeight: '700' }}>Email: </span>danang@philong.com.vn</a >
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <a href='/' className={cx('col-icon')} style={{ marginRight: '15px' }}><FaFacebook style={{ width: '33px', height: '28px' }} /> </a >

                            <a href='/' className={cx('col-icon')} style={{ marginRight: '15px' }} ><RiInstagramFill style={{ width: '33px', height: '30px' }} /> </a >
                            <a href='/' className={cx('col-icon')}><BsYoutube style={{ width: '33px', height: '33px' }} /> </a >
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;