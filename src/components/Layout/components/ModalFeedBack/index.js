import { useState, useEffect, useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './ModalFeedBack.module.scss'
import ReactStars from "react-rating-stars-component";
import { getDetailProductService } from '~/Services/ProductServices';
import { createFeedbackService } from '~/Services/FeedbackServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles)
function ModalFeedBack({ show, handleClose, itemId }) {
    const [detailProduct, setDetailProduct] = useState({})
    const { user } = useContext(UserContext)
    const [reactions, setReactions] = useState('');
    const [content, setContent] = useState('');
    const [rate, setRate] = useState(0);
    const navigate = useNavigate()
    const getDetailItem = async () => {
        const res = await getDetailProductService(itemId)

        setDetailProduct(res.data.data)
    }
    const handleSubmit = async () => {
        const resItem = await getDetailProductService(itemId)
        if (resItem.data.data.comments.length < 2) {
            const resFeedback = await createFeedbackService(user.id, itemId, rate, content)
            if (resFeedback.data.status === 'success') {
                toast.success('Đánh giá thành công')
                handleClose()
            }
            else {
                toast.error('Đánh giá thất bại')
            }
        }
        else {
            toast.error('Bạn đã đánh giá sản phẩm này')
            handleClose()

        }
    }

    useEffect(() => {
        if (show) {
            getDetailItem()
        }
    }, [show])
    console.log(detailProduct)
    const handleRate = (newRating) => {
        setRate(newRating)

        if (newRating === 1) setReactions('Tệ')
        if (newRating === 2) setReactions('Không hài lòng');
        if (newRating === 3) setReactions('Bình thường');
        if (newRating === 4) setReactions('Hài lòng');
        if (newRating === 5) setReactions('Tuyệt vời');

    }
    return (
        <>

            <Modal show={show} onHide={handleClose} centered size='lg' backdrop="static"  >
                <Modal.Header closeButton className='py-4 px-5'>
                    <Modal.Title><h3>Đánh giá sản phẩm</h3></Modal.Title>
                </Modal.Header >
                <Modal.Body className='p-5'>

                    <div className={cx('body')}>
                        <img className={cx('img')} src={detailProduct.image} alt=""></img>
                        <div className={cx('price')}>
                            <div className={cx('info-left')}>
                                <div className={cx('name')}>{detailProduct.name}</div>
                                <div className={cx('amount')}>Số lượng: {detailProduct.amount}</div>
                            </div>
                            <div className={cx('info-right')}>
                                <div className={cx('old-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailProduct.old_price)}</div>
                                <div className={cx('new-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailProduct.new_price)}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('start')}>
                        <span className={cx('quality')}>
                            Chất lượng sản phẩm
                        </span>

                        <ReactStars
                            count={5}
                            onChange={handleRate}
                            size={28}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"

                        />
                        <span className={cx('reaction')}>{reactions}</span>
                    </div>

                    <div className={cx('comment')}><input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé...'>
                    </input></div>
                    {/* {setIndexStart(index)} */}




                </Modal.Body>
                <Modal.Footer className='px-5 py-4'>
                    <button onClick={handleClose} className={cx('btn', 'btn-back')}>
                        Trở Lại
                    </button>
                    <button onClick={() => handleSubmit()} className={cx('btn', 'btn-submit')}>
                        Hoàn Thành
                    </button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalFeedBack;