import classNames from "classnames/bind";
import styles from "./Article.module.scss";
const cx = classNames.bind(styles);
function Article({ img, title, author, content, day, type }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('article-item')}>
                    <div className={cx('article-img')}>
                        <img src={img} alt="" />
                    </div>
                    <div className={cx('content-wrapper')}>

                        <button>{type}</button>
                        <div className={cx('article-title')}>{title}</div>
                        <div className={cx('article-author')}>
                            <p>{author}</p>
                            <p>{day}</p>
                            <p>Comments off</p>
                        </div>
                        <div className={cx('article-content')}>{content}</div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Article;