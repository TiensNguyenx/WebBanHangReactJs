
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { deleteFeedbackService } from '~/Services'
import { toast } from 'react-toastify';
const cx = classNames.bind()
function ModalDeleteFeedBack({ show, handleClose, idRating, getDetailProduct }) {


    const handleDelete = async () => {
        const res = await deleteFeedbackService(idRating)
        console.log(res)
        if (res.data.status === 'success') {
            handleClose()
            toast.success('Xóa đánh giá thành công')
            getDetailProduct()
        }
        else {
            handleClose()
            toast.error('Xóa đánh giá thất bại')

        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Thông báo!</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa đánh giá ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteFeedBack;