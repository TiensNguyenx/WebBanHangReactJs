import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Product from "~/components/Layout/components/Product";

import { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import './pagination.css'
const cx = classNames.bind(styles)

function Home() {


    const [products, setProducts] = useState([])
    const [totalProduct, setTotalProduct] = useState(0)
    const [toltalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('')
    const [saveSort, setSaveSort] = useState('')



    useEffect(() => {

        fetch(`http://localhost:3002/api/product/get-all?page=${page}&limit=10`)
            .then(response => response.json())
            .then((data) => {

                setTotalProduct(data.total)
                setTotalPage(data.totalPage)
                setProducts(data.data)
            })

    }, [page])

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div id="sp" className={cx('titleProduct')}>SẢN PHẨM KHUYẾN MÃI HOT NHẤT</div>
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
            <div className={cx('container')}>
                {
                    products.map((item, index) => {
                        return (


                            <Product
                                key={index}
                                id={item._id}
                                uptitle={item.name}
                                downtitle={item.description}
                                oldprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                                newprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}
                                src={item.image}
                            // cpu={item.cpu}
                            // ram={item.ram}
                            // disk={item.disk}
                            // operation={item.operation}
                            // screen={item.screen}
                            // vga={item.vga}

                            />

                        )
                    })

                }

            </div>
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


            </div>
        </div >
    );
}

export default Home;