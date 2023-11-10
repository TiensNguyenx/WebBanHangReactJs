
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import classNames from 'classnames/bind';
const cx = classNames.bind()
function ModalConfirm({ show, handleClose, dataUserDelete }) {

    function handleDeleteItem(dataUserDelete) {
        console.log(dataUserDelete.id);
        axios.delete(`http://localhost:3000/carts/${dataUserDelete.id}`)
            .then(res => {
                console.log(res.status);
                // window.location.reload();
            })

        handleClose()


    }



    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Xác nhận xóa sản phẩm</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteItem(dataUserDelete)} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;