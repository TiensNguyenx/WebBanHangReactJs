
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
const cx = classNames.bind()
function ModalConfirmLogout({ show, handleClose }) {
    const { logout } = useContext(UserContext);
    function handleLogout() {
        logout();

        window.location.reload();
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Xác nhận đăng xuất</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn đăng xuất tài khoản </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx('btn-lg')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => handleLogout()} className={cx('btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmLogout;