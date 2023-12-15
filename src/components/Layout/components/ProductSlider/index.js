import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from 'classnames/bind';
import Product from '../Product';
import './ProductSlider.css'
const ProductSlider = ({ products }) => {
  const cx = classNames

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 1500,
    type: true,
    slidesToScroll: 1,
  };

  return (
    <div className='container' >
      <Slider {...settings} >

        {products.map((item, index) => (
          <Product
            key={index}
            id={item._id}
            name={item.name}
            description={item.description.name_description}
            oldprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
            newprice={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.new_price)}
            src={item.image}
          />
        ))}

      </Slider>
    </div>
  );
};

export default ProductSlider;
