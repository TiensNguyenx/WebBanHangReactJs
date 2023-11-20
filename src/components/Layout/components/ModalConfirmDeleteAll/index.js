
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import { deleteAllProductService } from '~/Services';
import { toast } from 'react-toastify'
const cx = classNames.bind()
function ModalConfirmDeleteAll({ show, handleClose, dataDelete }) {
    const { resetLength } = useContext(UserContext);
    const handleDeleteItem = async () => {
        const res = await deleteAllProductService(dataDelete)

        if (res.data.status === 'success') {
            toast.success('Xóa sản phẩm thành công')
            handleClose()
            resetLength()
        }
        else {
            toast.error('Xóa sản phẩm thất bại, vui lòng thử lại')
            handleClose()
        }


    }
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Thông báo!</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa tất cả sản phẩm?  </Modal.Body>
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

export default ModalConfirmDeleteAll;