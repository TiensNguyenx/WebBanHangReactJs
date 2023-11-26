import HeaderOnly from "../../HeaderOnly";
import classNames from "classnames/bind";
import SideBarUser from "../SidebarUser";
import styles from "./DefaultInformation.module.scss";
import Footer from "../Footer";
const cx = classNames.bind(styles);

function DefalutInformation({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderOnly />

            <div className={cx('container-default')} >
                <div className={cx('content')}>
                    <div className={cx('col-left')}>
                        <SideBarUser />
                    </div>
                    <div className={cx('col-right')}>
                        {children}
                    </div>
                </div>
            </div >
            <Footer />
        </div>
    );
}

export default DefalutInformation;