
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
const cx = classNames.bind();
function ModalLoginForAddCart({ show, handleClose }) {

    return (
        <>

            <Modal show={show} onHide={handleClose}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Thông báo !</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng</Modal.Body>
                <Modal.Footer>
                    <Link to='/register'>
                        <Button variant="secondary" onClick={handleClose} className={cx('btn', 'btn-danger', 'btn-lg')}>
                            Đăng ký
                        </Button>
                    </Link>
                    <Link to='/login'>
                        <Button variant="primary" className={cx('btn', 'btn-success', 'btn-lg')} >
                            Đăng nhập
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalLoginForAddCart;