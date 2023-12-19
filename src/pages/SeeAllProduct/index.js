import classNames from "classnames/bind";
import styles from './SeeAllProduct.module.scss'
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import Footer from "~/components/Layout/components/Footer";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { getProductByNameService, getAllProductService } from "~/Services/ProductServices";
import Product from '~/components/Layout/components/Product'
import './pagination.css'
const cx = classNames.bind(styles)
function SeeAllProduct() {
    const [page, setPage] = useState(0)

    const [saveSort, setSaveSort] = useState('')
    const [products, setProducts] = useState([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [toltalPage, setTotalPage] = useState(0)

    const [lableProduct, setLableProduct] = useState('')
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type')
    console.log(type)
    const handlePageClick = (event) => {
        setPage(+event.selected)

    }
    const handleSort = (sortBy, sortType, sortActive) => {
        fetch(`https://be-web-mn5x.onrender.com/api/product/get-all?page=${page}&limit=15&sort=${sortType}&sort=${sortBy}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setTotalProduct(data.total)

                setProducts(data.data)
            })
        setSaveSort(sortActive)
    }
    const handleSortNew = (sortActive) => {
        renderProduct()
        setSaveSort(sortActive)
    }
    const renderProduct = async () => {
        if (type === 'all') {
            const res = await getAllProductService(page, 15)
            if (res.data.status === 'success') {
                setProducts(res.data.data)
                setTotalPage(res.data.totalPage)
            }
        }
        else {
            const res = await getProductByNameService(type)
            if (res.data.status === 'success') {
                setProducts(res.data.data)
            }
        }

        if (type === 'logitech') {
            setLableProduct('BÀN PHÍM LOGITECH')
        }
        else if (type === 'razer') {
            setLableProduct('BÀN PHÍM RAZER')
        }
        else if (type === 'corsair') {
            setLableProduct('BÀN PHÍM CORSAIR')
        }
        else if (type === 'steelseries') {
            setLableProduct('BÀN PHÍM STEELSERIES')
        }
        else if (type === 'ducky') {
            setLableProduct('BÀN PHÍM DUCKY')
        }
        else {
            setLableProduct('TẤT CẢ SẢN PHẨM')
        }
    }
    useEffect(() => {
        renderProduct()
    }, [page])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containner')}>
                <div className={cx('title')}>

                    <div id="sp" className={cx('titleProduct')}>{lableProduct}</div>
                </div>
                <div className={cx('header')}>
                    <div className={cx('sort')}>
                        <div className={cx('sort-title')}>Sắp xếp theo <i className={cx('fa-solid fa-sort-down ', 'icon-sort')} style={{ color: '#c8191f' }}></i></div>
                        <ul className={cx('sort-list')}>
                            <li className={cx('sort-item', saveSort === 'sortNew' && 'active-sort')} onClick={() => handleSortNew('sortNew')} >Mới nhất</li>
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
                                <div className={cx('product-wrapper')} key={index}>
                                    <Product

                                        id={item._id}
                                        name={item.name}
                                        description={item.description.name_description}
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