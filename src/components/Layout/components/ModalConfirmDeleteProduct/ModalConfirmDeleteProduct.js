
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { deleteProductService } from '../../../../Services'
import { UserContext } from '~/context/UserContext';
import { useContext } from 'react';
const cx = classNames.bind()

function ModalConfirmDeleteProduct({ show, handleClose, dataDelete }) {
    const { decreaseLength, } = useContext(UserContext);
    const handleDeleteItem = async () => {

        let res = await deleteProductService(dataDelete.idCart, dataDelete.idProduct)

        if (res.data.status === 'success') {
            toast.success('Xóa sản phẩm thành công')
            handleClose()
        }
        else {
            toast.error('Xóa sản phẩm thất bại, vui lòng thử lại')
            handleClose()
        }
        decreaseLength()
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Thông báo!</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteItem()} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalConfirmDeleteProduct;