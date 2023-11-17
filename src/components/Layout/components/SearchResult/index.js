import classNames from "classnames/bind";
import styles from "./SearchResult.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function SearchResult({ data }) {
    console.log(data.image)
    return (
        <Link to={`/product?id=${data._id}&uptitle=${data.name}&downtitle=${data.description}&oldprice=${data.old_price}&newprice=${data.new_price}&src=${encodeURIComponent(data.image)} `}
            className={cx('wrapper')} onClick={() => {
                window.scroll({ top: 0 });
            }}>
            <img className={cx('img')} src={data.image} alt=""></img>
            <div className={cx('info')}>
                <div className={cx('name')}>{data.name}</div>
                <div className={cx('description')}>{data.description}</div>
            </div>
        </Link>
    );
}

export default SearchResult;