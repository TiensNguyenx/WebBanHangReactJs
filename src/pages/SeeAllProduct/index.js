import classNames from "classnames/bind";
import styles from './SeeAllProduct.module.scss'

import { useState, useEffect } from "react";
import Footer from "~/components/Layout/components/Footer";
function SeeAllProduct() {
    const cx = classNames.bind(styles)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containner')}>
                <Footer />
            </div>
        </div>
    );
}

export default SeeAllProduct;