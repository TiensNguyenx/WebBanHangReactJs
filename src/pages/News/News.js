import classNames from "classnames/bind";
import { FaEye } from "react-icons/fa";
import Carousel from 'react-bootstrap/Carousel';
import styles from "./News.module.scss";
import Article from "~/components/Layout/components/Article";
import Footer from "~/components/Layout/components/Footer";
const cx = classNames.bind(styles);
function News() {
    return (
        <div>
            <div className={cx('wrapper')} >
                <div className={cx('containner')}>
                    <div className={cx('title')}>
                        <h1>Tin tức công nghệ</h1>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('main-post')}>

                            <div className={cx('slider')}>
                                <Carousel fade controls touch indicators={false} >
                                    <Carousel.Item>
                                        <img src="https://phongvu.vn/cong-nghe/wp-content/uploads/2023/09/iPhone-15-Pro-Max-2-630x359.webp" alt="" className={cx('img-slider')} />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>So sánh iPhone 15 Pro Max và iPhone 14 Pro Max: Có đáng “lên đời” lúc này?</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="https://philong.com.vn/media/news/584-amd-philong.jpg" alt="" className={cx('img-slider')} />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')} >Dòng CPU Laptop AMD Ryzen™ 7045/7040 Series Có Gì Hấp Dẫn?</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className={cx('img-slider')} src="https://philong.com.vn/media/news/569-philong-amd2.png" alt="" />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>Dòng CPU Ryzen 7040 và Ryzen 7045 dành cho laptop tuyệt vời như thế nào</p>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className={cx('img-slider')} src="https://philong.com.vn/media/news/588-msi-x-amg-1.png" alt="" />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>Laptop MSI Phiên Bản Mercedes-AMG - Trải Nghiệm Đường Đua Gaming</p>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className={cx('img-slider')} src="https://philong.com.vn/media/news/488-z3374097273281_130abf059b8a9af806d4c2c306a98d6b.jpg" alt="" />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>Dell Latitude 3520 - Lựa chọn hàng đầu cho đối tượng nhân viên văn phòng, cũng như thế hệ sinh viên ngày nay</p>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className={cx('img-slider')} src="https://philong.com.vn/media/news/461-02pm6uttsxowwx2rwq3vdpk-13--v1622513353.png" alt="" />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>AMD ra mắt các card đồ hoạ mới cho laptop và RX 6500 XT cho PC</p>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className={cx('img-slider')} src="https://philong.com.vn/media/news/459-thumbs-ct-amd-2-03012022.png" alt="" />
                                        <Carousel.Caption>

                                            <p className={cx('title-slider')}>4 mẫu laptop cấu hình cao, giá hợp lý cho người chơi hệ “đa-zi-năng”</p>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                        <div className={cx('recent-post')}>
                            <div className={cx('recent-item')}>
                                <img className={cx('recent-img')} src="https://philong.com.vn/media/news/120-483-cover-fb.jpg" alt="" />

                                <div className={cx('height-100')}>
                                    <p>Trải Nghiệm Dell Latitude 3420 – Xử Lý Đa Nhiệm – Tối Ưu Năng Suất</p>
                                    <div className={cx('eye-icon')}><FaEye />265</div>
                                </div>
                            </div>
                            <div className={cx('recent-item')}>
                                <img className={cx('recent-img')} src="https://philong.com.vn/media/news/120-481-35ed2efe65c4aa9af3d5.jpg" alt="" />

                                <div className={cx('height-100')}>
                                    <p>Chuột máy tính Bluetooth giá ngon, bổ, rẻ, đáng mua trong năm 2022</p>
                                    <div className={cx('eye-icon')}><FaEye />265</div>
                                </div>
                            </div>
                            <div className={cx('recent-item')}>
                                <img className={cx('recent-img')} src="https://philong.com.vn/media/news/120-479-ct-msi-promotion-14032022.jpg" alt="" />
                                <div className={cx('height-100')}>
                                    <p>MSI NHẬN CODE GAME TRỊ GIÁ ĐẾN 99$ SỐ LƯỢNG CÓ HẠN</p>
                                    <div className={cx('eye-icon')}><FaEye />265</div>
                                </div>
                            </div>
                            <div className={cx('recent-item')}>
                                <img className={cx('recent-img')} src="https://philong.com.vn/media/news/120-477-lati-3520--1-.png" alt="" />
                                <div className={cx('height-100')}>
                                    <p>Dell Latitude 3520: Cấu hình đỉnh cao, vẻ ngoài sang trọng</p>
                                    <div className={cx('eye-icon')}><FaEye />265</div>
                                </div>
                            </div>
                            <div className={cx('recent-item')}>
                                <img className={cx('recent-img')} src="https://philong.com.vn/media/news/120-430-thumbs-post-31052021.jpg" alt="" />
                                <div className={cx('height-100')}>
                                    <p>Acer ra mắt loạt sản phẩm laptop trang bị card đồ họa Nvidia GeForce RTX 30</p>
                                    <div className={cx('eye-icon')}><FaEye />265</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('left-column')}>
                            <div className={cx('article-wrapper')}>
                                <div className={cx('article')}>
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />
                                    <Article img="https://phongvu.vn/cong-nghe/wp-content/uploads/2019/01/zipcode-300x206.png" title="Mã bưu chính Việt Nam. Cách tra cứu mã bưu điện 63 tỉnh thành chính xác nhất" author="Song Han " day=" Tháng Mười Một 7, 2023" content="Mã bưu chính hay mã zip code là dãy số quan trọng giúp định vị địa lý khi vận chuyển bưu phẩm hoặc thư từ. Song, hiện…" type="Tin tức" />

                                </div>
                            </div>
                        </div>
                        <div className={cx('right-column')}>
                            <div className={cx('promote-wrapper')}>
                                <div className={cx('promote-content')}>
                                    <div className={cx('promote-title')}>
                                        <p>Khuyến mãi</p>
                                    </div>
                                    <div className={cx('promote-img')}>
                                        <img src="https://philong.com.vn/media/news/635-fb_1080x1920.jpg" alt="" />
                                        <a href="fb.com">[CTKM] LAPTOP LENOVO - GIÁNG SINH RỦNG RỈNH QUÀ</a>
                                    </div>
                                    <div className={cx('promote-img')}>
                                        <img src="https://philong.com.vn/media/news/634-philong-asus.jpg" alt="" />
                                        <a href="fb.com">[CTKM] ĐẠI TIỆC ROG - SĂN QUÀ TỚI TUF</a>
                                    </div>
                                    <div className={cx('promote-img')}>
                                        <img src="https://philong.com.vn/media/news/633-banner_609x343.png" alt="" />
                                        <a href="fb.com">NHẬN AVATAR: FRONTIERS OF PANDORA VỚI LAPTOP CẤU HÌNH AMD</a>
                                    </div>
                                    <div className={cx('promote-img')}>
                                        <img src="https://philong.com.vn/media/news/632-banner_609x343.png" alt="" />
                                        <a href="fb.com">CTKM Tặng game AVATAR: FRONTIERS OF PANDORA™</a>
                                    </div>
                                    <div className={cx('promote-img')}>
                                        <img src="https://philong.com.vn/media/news/631-proart-he-sinh-thai-785x486.png" alt="" />
                                        <a href="fb.com">CHUẨN MÀU SẮC, ĐỈNH THIẾT KẾ CÙNG ASUS PROART</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default News;