
import classNames from "classnames/bind";
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)
function MenuItem({ title, icon, href }) {
    return (
        <a className={cx('menu-item')} href={href}>
            {icon}
            <span className={cx('title')}>{title}</span>
        </a>
    );
}

export default MenuItem