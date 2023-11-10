
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
const cx = classNames.bind()
function ModalConfirmAddCart({ show, handleClose, dataAddCart }) {

    function handleAddCart(dataAddCart) {




        fetch('http://localhost:3000/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    userId: dataAddCart.userId,
                    id: dataAddCart.id,
                    uptitle: dataAddCart.uptitle,
                    downtitle: dataAddCart.downtitle,
                    oldprice: dataAddCart.oldprice,
                    newprice: dataAddCart.newprice,
                    cpu: dataAddCart.cpu,
                    ram: dataAddCart.ram,
                    disk: dataAddCart.disk,
                    operation: dataAddCart.operation,
                    screen: dataAddCart.screen,
                    vga: dataAddCart.vga,
                    src: dataAddCart.src,


                }
            ),


        })
            .then(res => res.json())
            .then(data => console.log(data))

        toast.success('Thêm vào giỏ hàng thành công')
        handleClose()


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
                    <Button variant="primary" onClick={() => handleAddCart(dataAddCart)} className={cx('btn-danger', 'btn-lg')}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmAddCart;