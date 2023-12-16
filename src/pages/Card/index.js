import classNames from 'classnames/bind';
import styles from './Card.module.scss'
import Sidebar from '~/components/Layout/components/Sidebar';

import { AiFillStar } from 'react-icons/ai'
import { LuPencil } from "react-icons/lu";
import Product from '~/components/Layout/components/Product';
import Footer from '~/components/Layout/components/Footer';
import { useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import ModalLoginForAddCart from '~/components/Layout/components/ModalLoginForAddCart/ModalLoginForAddCart';
import ModalConfirmAddCart from '~/components/Layout/components/ModalConfirmAddCart/ModalConfirmAddCart';
import ModalLoginForBuy from '~/components/Layout/components/ModalLoginForBuy/ModalLoginForBuy';
import { useEffect, useContext } from 'react';
import ModalDeleteFeedBack from '~/components/Layout/components/ModalDeleteFeedBack';
import { useLocation } from 'react-router-dom';
import { UserContext } from '~/context/UserContext';
import { getRecommnedProductService, getDetailProductService } from '~/Services'
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)

function Card() {
    const { user, handleAddCartContext, increaseLength } = useContext(UserContext);
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const location = useLocation();
    const id = urlParams.get('id');
    const [product, setProduct] = useState({})
    const [recommends, setRecommends] = useState([])
    const [isShowModalLoginForBuy, setIsShowModalLoginForBuy] = useState(false);
    const [isShowModalAddCart, setIsShowModalAddCart] = useState(false);
    const [isShowModalLogin, setIsShowModalLogin] = useState(false);
    const [feedbacks, setFeedbacks] = useState([])
    const [totalRate, setTotalRate] = useState(0)
    const userId = localStorage.getItem('userId')
    const [description, setDescription] = useState({})
    const [isShowModalDeleteFeedBack, setIsShowModalDeleteFeedBack] = useState(false)
    const [idRating, setIdRating] = useState('')
    const navigate = useNavigate();
    useEffect(() => {

    }, [location]);
    function formatVietnameseDateTime(dateTimeString) {

        const date = new Date(dateTimeString);
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',

        }).format(date);

        return formattedDate;
    }
    const getDetailProduct = async () => {
        const res = await getDetailProductService(id)
        console.log(res)
        setProduct(res.data.data)
        setDescription(res.data.data.description)
        setFeedbacks(res.data.data.comments)
        setTotalRate(res.data.data.total_rate)

    }

    const handleClose = () => {
        setIsShowModalAddCart(false);
        setIsShowModalLogin(false);
        setIsShowModalLoginForBuy(false);
        setIsShowModalDeleteFeedBack(false)
    }
    const renderRecoomend = async () => {
        const res = await getRecommnedProductService(1)

        setRecommends(res.data.data)

    }
    const startArray = Array.from({ length: totalRate }, (_, index) => index);
    function renderStartUser(rate) {
        const startArrayUser = Array.from({ length: rate }, (_, index) => index);
        return startArrayUser.map((item) => (
            <AiFillStar key={item} style={{ color: '#c8191f' }} />
        ))
    }
    useEffect(() => {
        renderRecoomend()
        getDetailProduct()
    }, [])
    const handleAddCart = () => {
        if (user.id) {
            setIsShowModalAddCart(true);
        }
        else {
            setIsShowModalLogin(true);
        }

    }
    const handleBuy = async () => {
        if (!user.id) {
            setIsShowModalLoginForBuy(true);
        }
        else {
            let res = await handleAddCartContext(user.id, id)
            if (res.data.status === 'success') {
                increaseLength()
                navigate('/cart')
            }

        }
    }
    const handleDeleteFeedBack = (idRating) => {
        setIdRating(idRating)
        setIsShowModalDeleteFeedBack(true)
    }
    console.log(description.name_description)

    return (
        <div >
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('wrapper')}>

                    <div className={cx('product-container')}>
                        <div className={cx('header')}>

                            <div className={cx('title')}>{`${product.name}${description.name_description}`}</div>
                            <div className={cx('status')}>
                                <div className={cx('fb-start')} >

                                    <div className={cx('fb-result')}>
                                        <span>{startArray.map((item) => (
                                            <AiFillStar key={item} style={{ color: '#c8191f' }} />
                                        ))} </span>
                                    </div>
                                </div>
                                <div className={cx('storage')} >Tình Trạng: Còn Hàng</div>
                                <div className={cx('warranty')}>Bảo Hành: 12 Tháng</div>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('item')}>
                                <div className={cx('img')}>
                                    <img style={{ width: '80%', height: '80%' }} src={product.image} alt='' />
                                </div>
                                <div className={cx('col')}>
                                    <div className={cx('col-left')}>
                                        <li className={cx('cpu')} style={{ marginBottom: '5px' }}> <span style={{ fontWeight: '700' }}>Mã sản phẩm: </span>{description.product_code} </li>
                                        <li className={cx('hard-disk')} style={{ marginBottom: '5px' }}> <span style={{ fontWeight: '700' }}>Loại sản phẩm:</span> {description.product_type} </li>
                                        <li className={cx('monitor')}><span style={{ fontWeight: '700' }}>Cổng kết nối: </span  >{description.connection}</li>
                                    </div>
                                    <div className={cx('col-right')}>
                                        <li className={cx('ram')} style={{ marginBottom: '5px' }} ><span style={{ fontWeight: '700' }}>Keyswitch: </span>{description.switch_type}</li>
                                        <li className={cx('vga')} style={{ marginBottom: '5px' }}><span style={{ fontWeight: '700' }}>Độ bền Switch: </span>{description.durability}</li>
                                        <li className={cx('operating')} ><span style={{ fontWeight: '700' }}>Dạng bàn phím: </span> {description.format}</li>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('price')}>
                                <div className={cx('oldprice')}><span >Giá chính hãng: </span><span style={{ fontSize: '2.2rem', fontWeight: '700', textDecoration: 'line-through', marginLeft: '4px' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.old_price)}</span></div>
                                <div className={cx('newprice')}><span>Giá Khuyến Mãi: </span><span style={{ fontSize: '3.8rem', color: '#c8191f', marginLeft: '4px', fontWeight: '700' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.new_price)}</span></div>
                                <div className={cx('gift')}>
                                    <div className={cx('title-gift')}>Khuyến mãi quà tặng</div>
                                    <p className={cx('content-gift')}>Balo Acer SUV Chính Hãng</p>
                                    <p className={cx('content-gift')}>Chuột Không Dây Newmen F368</p>
                                    <p className={cx('content-gift')}>Trả góp lãi suất 0% áp dụng cho thẻ tín dụng Sacombank.</p>
                                    <p className={cx('content-gift')}>Trả góp lãi suất ưu đãi áp dụng cho nhà tài chính HD Saison và ACS.</p>
                                    <p className={cx('content-gift')} >Trả góp lãi suất ưu đãi thông qua cổng MPOS áp dụng cho thẻ tín dụng: Citibank, Eximbank, HSBC, MSB, Techcombank, Nam Á, Shinhan bank, TP bank, Seabank, Kiên Long bank, OCB, VIB, ACB, MB, Vietcombank, SHB...</p>
                                </div>
                                <div className={cx('buy')}>
                                    <button className={cx('add-btn')} onClick={() => handleAddCart()}>
                                        <div ><BsCartPlus style={{ width: '22px', height: '25px' }} />
                                        </div>Thêm vào giỏ hàng
                                    </button>

                                    <button className={cx('buy-btn')} onClick={handleBuy}>Mua Ngay</button>
                                </div>
                            </div>
                            <div className={cx('location')}>
                                <ul>
                                    <h4> Trợ giúp:</h4>
                                    <li>Hướng dẫn mua hàng nhanh chóng </li>
                                    <li>Chính sách bảo hành tại TB Shop</li>
                                    <li>Chính sách đổi hàng</li>
                                </ul>
                                <ul>
                                    <h4> Điện thoại tư vấn - đặt hàng:</h4>
                                    <li>Ánh Vân - 0911 299 230</li>
                                    <li>Thùy Vân - 0911 299 212</li>
                                    <li>Hồng Lê - 0903 555 310</li>
                                    <li>Thanh Hà - 0903 555 610</li>
                                </ul>
                                <ul>
                                    <h4>Địa chỉ mua hàng: </h4>
                                    <li>52 Nguyễn Văn Linh, Hải Châu, TP. Đà Nẵng </li>
                                    <li>48 Hùng Vương, Phú Nhuận, TP. Huế</li>

                                </ul>
                                <img className={cx('map')} src='https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/368391529_357314930194969_3860221427633991811_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=a9UwEZ1wFWcAX--eiLw&_nc_ht=scontent.fdad3-6.fna&oh=03_AdQmLUHEtAywHLISZJf-_sE8mNuqchsa1vh5Hiu9hWlJ2Q&oe=6569B647' alt='' />
                            </div>
                        </div>
                    </div>
                    <div className={cx('feedback-container')}>
                        <div className={cx('feedback-content')}>
                            <div className={cx('fb-header')}>Đánh giá và nhận xét về {product.name}</div>

                            <div className={cx('fb-cmt')}>

                                {feedbacks.length > 0 ? (
                                    feedbacks.map((item, index) => (

                                        <div key={index}>
                                            <div>
                                                <div className={cx('fb-col-c')}>
                                                    <img className={cx('fb-avatar')} src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' alt=''></img>
                                                    <div className={cx('fb-col-r')}>
                                                        <span className={cx('fb-user-name')}>{item.name}</span>
                                                        <span>{renderStartUser(item.rate)}</span>
                                                        <span className={cx('fb-time')}>{formatVietnameseDateTime(item.time_create)}</span>
                                                        <span className={cx('fb-content')}>{item.content}</span>
                                                    </div>
                                                    <div onClick={() => handleDeleteFeedBack(item.rating_id)} className={cx('fb-edit')}>{userId === item.user ? <LuPencil /> : ''}</div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={cx('fb-empty')}><img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2090a184404cb.png' alt=''></img><span>Chưa có đánh giá nào</span></div>
                                )}
                            </div>


                        </div>
                    </div>

                    <div className={cx('re-container')}>
                        <div className={cx('recommend-wrap')}>
                            <div className={cx('re-title')}>Sản phẩm tương tự </div>
                            <div className={cx('recommend')}>
                                {recommends.map((item, index) => {
                                    return (
                                        <div style={{ width: '20%' }} key={index}>
                                            <Product key={index}
                                                id={item._id}
                                                name={item.name}
                                                description={item.description.name_description}
                                                oldprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                                                newprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}
                                                // vga={item.vga}
                                                // screen={item.screen}
                                                // operation={item.operation}
                                                // disk={item.disk}
                                                // ram={item.ram}
                                                // cpu={item.cpu}
                                                src={item.image}
                                                recommend={true}
                                            />
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                        <div className={cx('feedback')}></div>
                        <div className={cx('comment')}></div>
                    </div>


                </div>

            </div>
            <Footer></Footer>
            <ModalConfirmAddCart
                show={isShowModalAddCart}
                handleClose={handleClose}

            />
            <ModalLoginForAddCart
                show={isShowModalLogin}
                handleClose={handleClose}
            />
            <ModalLoginForBuy
                show={isShowModalLoginForBuy}
                handleClose={handleClose}
            />
            <ModalDeleteFeedBack
                show={isShowModalDeleteFeedBack}
                handleClose={handleClose}
                idRating={idRating}
                getDetailProduct={getDetailProduct}
            />

        </div>


    );
}

export default Card