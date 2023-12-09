import axios from 'axios';



const renderCartService = (userId) => {
    return axios.get(`https://be-web-mn5x.onrender.com/api/cart/get-details-cart/${userId}`)
};





const deleteProductService = (idCart, idProduct) => {
    return axios.delete(`https://be-web-mn5x.onrender.com/api/cart/delete-item/${idCart}`, {
        data: {
            productId: idProduct
        }
    })

};
const deleteAllProductService = (idCart) => {
    return axios.delete(`https://be-web-mn5x.onrender.com/api/cart/delete-cart/${idCart}`)
}
const plustProductService = (idCart, idProduct) => {
    return axios.put(`https://be-web-mn5x.onrender.com/api/cart/increase-amount/${idCart}`, {
        productId: idProduct
    })
}
const minusProductService = (idCart, idProduct) => {
    return axios.delete(`https://be-web-mn5x.onrender.com/api/cart/decrease-amount/${idCart}`, {
        data: {
            productId: idProduct
        }
    })
};
const getRecommnedProductService = (page) => {
    return axios.get(`https://be-web-mn5x.onrender.com/api/product/get-all?page=${page}&limit=5`)
}
const getAllCouponService = (method) => {

    return axios.get(`https://be-web-mn5x.onrender.com/api/coupon/get-all/${method}`)

}
const getDetailOrderService = (idOrder) => {
    return axios.get(`https://be-web-mn5x.onrender.com/api/order/get-details-order/${idOrder}`)
}
const getDetailPaymentService = () => {
    if (localStorage.getItem('idPayment')) {
        return axios.get(`https://be-web-mn5x.onrender.com/api/payment/get-details-payment/${localStorage.getItem('idPayment')}`)
    }
}
const getAllPaymentService = (idUser) => {
    return axios.get(`https://be-web-mn5x.onrender.com/api/payment/get-all-payment/${localStorage.getItem('userId')}`)
}
const createFeedbackService = (idUser, productId, rate, content) => {
    return axios.post(`https://be-web-mn5x.onrender.com/api/rating/create/${idUser}`, {
        productId,
        rate,
        content
    })

}
const deleteFeedbackService = (idRating) => {
    return axios.delete(`https://be-web-mn5x.onrender.com/api/rating/delete-rating/${idRating}`)
}
const createPaymentService = (idOrder, paymentMethod, idPrice, idShipping, isShipping) => {
    if (isShipping === 'true') {
        return axios.post(`https://be-web-mn5x.onrender.com/api/payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": {
                idPrice,
                idShipping
            },
            isPaid: false
        })
    }
    else {
        return axios.post(`https://be-web-mn5x.onrender.com/api/payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": {
                idPrice
            },
            isPaid: false
        })
    }
}
const getDetailProductService = (idProduct) => {
    return axios.get(`https://be-web-mn5x.onrender.com/api/product/get-details/${idProduct}`)
}
const orderProductService = (idUser, fullName, addressUser, email, phoneString, noteUser, shippingMethod, addressShipping, cityShipping, noteShipping, addressShop, cityShop) => {


    const phone = parseInt(phoneString, 10)

    if (addressShipping === '') {

        return axios.post(`https://be-web-mn5x.onrender.com/api/order/create/${idUser}`,

            {
                fullName,
                addressUser,
                email,
                phone,
                shippingMethod,
                addressShop,
                cityShop,

            }
        )
    }
    else {

        return axios.post(`https://be-web-mn5x.onrender.com/api/order/create/${idUser}`,
            {
                fullName,
                phone,
                addressShipping,
                cityShipping,
                noteShipping,
                email,
                noteUser,
                shippingMethod,
                addressUser

            }
        )
    }


}
export {
    renderCartService, deleteProductService,
    deleteAllProductService, plustProductService,
    minusProductService, orderProductService,
    getRecommnedProductService,
    getAllCouponService, getDetailOrderService,
    createPaymentService, getDetailPaymentService,
    createFeedbackService, getAllPaymentService,
    getDetailProductService, deleteFeedbackService
}; 
