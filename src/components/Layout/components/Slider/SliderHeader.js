import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderHeader = ({ data }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
            {data.map((image) => {
                return (
                    <div> <img src={image.linkImg} alt='' /></div>
                )
            })}
        </Slider>
    )
}
export default SliderHeader