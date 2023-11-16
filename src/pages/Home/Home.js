import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Product from "~/components/Layout/components/Product";
import 'swiper/css';
import 'swiper/css/bundle';
import { useState, useEffect } from "react";

import Pagination from 'react-bootstrap/Pagination';
const cx = classNames.bind(styles)

function Home() {
    const productApi = 'http://localhost:3002/api/product/get-all'
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(productApi)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setProducts(data.data)
            })
    }, [])
    const handlePageClick = (data) => {

    }
    return (
        <div className={cx('wrapper')}>
            <div id="sp" className={cx('titleProduct')}>SẢN PHẨM KHUYẾN MÃI HOT NHẤT</div>
            <div className={cx('container')}>
                {
                    products.map((item, index) => {
                        return (


                            <Product
                                key={index}
                                id={item.id}
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
            <div>

            </div>
            <Pagination size="lg">
         
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
            
            </Pagination>
        </div>
    );
}

export default Home;