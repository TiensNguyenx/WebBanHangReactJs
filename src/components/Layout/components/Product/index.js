import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)

function Product({ id, name, description, oldprice, newprice, src }) {
    let myClass = ""

    return (

        <div className={cx('Product', myClass)}>

            <Link to={`/card?id=${id}`} onClick={() => {
                window.scroll({ top: 0 });
            }}>
                <div className={cx('item')}>

                    <img className={cx('img-product')} src={src} alt="" />


                    <div className={cx('content')}>
                        <div className={cx('uptitle')}>{name}</div>
                        <div className={cx('downtitle')}>{description}</div>
                        <div className={cx('oldprice')}>{oldprice}</div>
                        <div className={cx('newprice')}>{newprice}</div>
                    </div>

                </div>
            </Link>
        </div>
    );
}

export default Product;