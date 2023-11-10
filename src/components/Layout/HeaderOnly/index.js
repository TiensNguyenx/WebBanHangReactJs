import classNames from "classnames/bind";
import Header from "../components/Header";
import styles from './HeaderOnly.scss'
const cx = classNames.bind(styles)

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('my-container')}>

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
