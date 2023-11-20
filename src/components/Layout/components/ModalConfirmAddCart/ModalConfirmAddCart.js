
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { UserContext } from '~/context/UserContext';
import { useContext } from 'react';

const cx = classNames.bind()
function ModalConfirmAddCart({ show, handleClose }) {
    const { user, handleAddCartContext, increaseLength, toastCustom } = useContext(UserContext);
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const productID = urlParams.get('id')
    const handleAddCart = async () => {

        let res = await handleAddCartContext(user.id, productID)

        if (res.data.status === 'success') {
            toast.success('Thêm vào giỏ hàng thành công', {
                ...toastCustom
            })
            handleClose()
            increaseLength()

        }
        else {
            toast.error('Thêm vào giỏ hàng thất bại, vui lòng thử lại', { ...toastCustom })
            handleClose()
        }

    }



    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Xác nhận thêm sản phẩm vào giỏ hàng</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn thêm sản phẩm này ? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-secondary', 'btn-lg')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => handleAddCart()} className={cx('btn-danger', 'btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmAddCart;