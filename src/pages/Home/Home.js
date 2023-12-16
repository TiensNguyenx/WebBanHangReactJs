import classNames from "classnames/bind";
import styles from './Home.module.scss'


import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProductByNameService } from '~/Services'


import ProductSlider from "~/components/Layout/components/ProductSlider";
const cx = classNames.bind(styles)

function Home() {
    const [logitechProduct, setLogitechProduct] = useState([])
    const [razerProduct, setRazerProduct] = useState([])
    const [corsairProduct, setCorsairProduct] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        renderProductLogitech()
        renderProductRazer()
        renderProductCorSair()

    }, [])
    const renderProductLogitech = async () => {
        const resLogitech = await getProductByNameService('logitech')
        if (resLogitech.data.status === 'success') {
            setLogitechProduct(resLogitech.data.data)
        }
    }
    const renderProductRazer = async () => {
        const resRazer = await getProductByNameService('razer')
        if (resRazer.data.status === 'success') {
            setRazerProduct(resRazer.data.data)
        }
    }
    const renderProductCorSair = async () => {
        const resCorsair = await getProductByNameService('corsair')
        if (resCorsair.data.status === 'success') {
            setCorsairProduct(resCorsair.data.data)
        }
    }
   

    const handleSeeAll = (category) => {
        navigate(`/product?type=${category}`)
    }
    return (
        <div className={cx('wrapper')}>


            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM LOGITECH</div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('logitech')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={logitechProduct} />
            </div>
            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM RAZER </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('razer')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={razerProduct} />
            </div>
            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM CORSAIR </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('corsair')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={corsairProduct} />
            </div>

          
        </div >
    );
}

export default Home;