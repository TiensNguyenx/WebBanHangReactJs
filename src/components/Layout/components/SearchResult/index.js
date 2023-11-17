import classNames from "classnames/bind";
import styles from "./SearchResult.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function SearchResult({ data }) {
    return (
        <Link className={cx('wrapper')}>
            <img className={cx('img')} src={data.image} alt=""></img>
            <div className={cx('info')}>
                <div className={cx('name')}>{data.name}</div>
                <div className={cx('description')}>{data.description}</div>
            </div>
        </Link>
    );
}

export default SearchResult;