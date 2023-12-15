import classNames from "classnames/bind";
import styles from './Home.module.scss'


import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProductByNameService } from '~/Services'
import './pagination.css'

import ProductSlider from "~/components/Layout/components/ProductSlider";
const cx = classNames.bind(styles)

function Home() {


    const [products, setProducts] = useState([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [toltalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('')
    const [saveSort, setSaveSort] = useState('')
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
    const handlePageClick = (event) => {
        setPage(+event.selected)


    }
    const handleSort = (sortBy, sortType, sortActive) => {
        setSortBy(sortBy)
        setSortType(sortType)
        fetch(`http://localhost:3002/api/product/get-all?page=${page}&limit=10&sort=${sortType}&sort=${sortBy}`)
            .then(response => response.json())
            .then((data) => {

                setTotalProduct(data.total)
                setTotalPage(data.totalPage)
                setProducts(data.data)
            })
        setSaveSort(sortActive)
    }
    const handleSeeAll = (category) => {
        navigate(`/product?type=${category}`)
    }
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('header')}>
                <div className={cx('sort')}>
                    <div className={cx('sort-title')}>Sắp xếp theo <i className={cx('fa-solid fa-sort-down ', 'icon-sort')} style={{ color: '#c8191f' }}></i></div>
                    <ul className={cx('sort-list')}>
                        <li className={cx('sort-item')}>Mới nhất</li>
                        <li className={cx('sort-item', saveSort === 'sortPriceAsc' && 'active-sort')} onClick={() => handleSort('new_price', 'asc', 'sortPriceAsc')}>Giá tăng dần</li>
                        <li className={cx('sort-item', saveSort === 'sortPriceDesc' && 'active-sort')} onClick={() => handleSort('new_price', 'desc', 'sortPriceDesc')}>Giá giảm dần</li>
                        <li className={cx('sort-item', saveSort === 'sortNameAsc' && 'active-sort')} onClick={() => handleSort('name', 'asc', 'sortNameAsc')}>Tên từ A-Z</li>
                        <li className={cx('sort-item', saveSort === 'sortNameDesc' && 'active-sort')} onClick={() => handleSort('name', 'desc', 'sortNameDesc')}>Tên từ Z-A</li>

                    </ul>
                </div>
            </div> */}

            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM LOGITECH</div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('laptopmsi')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={logitechProduct} />
            </div>
            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM RAZER </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('laptopdell')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={razerProduct} />
            </div>
            <div id="sp" className={cx('titleProduct')}>BÀN PHÍM COSAIR </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('laptopdell')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={corsairProduct} />
            </div>

            {/* 
            <div className={cx('pagination')}>

                <ReactPaginate
                    style={{ fontSize: '2em' }}
                    breakLabel="..."
                    nextLabel={<MdNavigateNext />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={toltalPage}
                    previousLabel={<MdNavigateBefore />}
                    renderOnZeroPageCount={null}

                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"

                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />


            </div> */}
        </div >
    );
}

export default Home;