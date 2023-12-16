import classNames from "classnames/bind";
import styles from './SeeAllProduct.module.scss'
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import Footer from "~/components/Layout/components/Footer";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { getProductByNameService } from '~/Services'
import Product from '~/components/Layout/components/Product'
import './pagination.css'
const cx = classNames.bind(styles)
function SeeAllProduct() {
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('')
    const [saveSort, setSaveSort] = useState('')
    const [products, setProducts] = useState([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [toltalPage, setTotalPage] = useState(0)

    const [description, setDescription] = useState([])
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type')
    console.log(type)
    const handlePageClick = (event) => {
        setPage(+event.selected)
    }
    const handleSort = (sortBy, sortType, sortActive) => {
        setSortBy(sortBy)
        setSortType(sortType)
        fetch(`https://be-web-mn5x.onrender.com/api/product/get-all?page=${page}&limit=10&sort=${sortType}&sort=${sortBy}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setTotalProduct(data.total)
                setTotalPage(data.totalPage)
                setProducts(data.data)
            })
        setSaveSort(sortActive)
    }
    console.log(toltalPage)
    const renderProduct = async () => {
        const res = await getProductByNameService(type)
        console.log(res)
        if (res.data.status === 'success') {
            setProducts(res.data.data)
            setDescription(res.data.data.description)
        }
    }
    useEffect(() => {
        renderProduct()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containner')}>
                <div className={cx('title')}>

                    <div id="sp" className={cx('titleProduct')}>BÀN PHÍM LOGITECH</div>
                </div>
                <div className={cx('header')}>
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
                </div>
                <div className={cx('body')}>

                    <div className={cx('product-list')}>

                        {products.map((item, index) => {
                            return (
                                <div className={cx('product-wrapper')}>
                                    <Product
                                        key={index}
                                        id={item._id}
                                        name={item.name}
                                        // description={}
                                        oldprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                                        newprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}
                                        src={item.image}
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className={cx('pagination')}>
                    <ReactPaginate
                        style={{ fontSize: '2em' }}
                        breakLabel="..."
                        nextLabel={<MdNavigateNext />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
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


                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SeeAllProduct;