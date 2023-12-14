import axios from 'axios';



const renderCartService = (userId) => {
    return axios.get(`http://localhost:3002/api/cart/get-details-cart/${userId}`)
};
const getDetailUserService = (id) => {
    return axios.get(`http://localhost:3002/api/user/get-detail/${id}`,
        {
            'headers': {
                token: `Beare ${localStorage.getItem('token')}`
            }
        }
    )
}




const deleteProductService = (idCart, idProduct) => {
    return axios.delete(`http://localhost:3002/api/cart/delete-item/${idCart}`, {
        data: {
            productId: idProduct
        }
    })

};
const deleteAllProductService = (idCart) => {
    return axios.delete(`http://localhost:3002/api/cart/delete-cart/${idCart}`)
}
const plustProductService = (idCart, idProduct) => {
    return axios.put(`http://localhost:3002/api/cart/increase-amount/${idCart}`, {
        productId: idProduct
    })
}
const minusProductService = (idCart, idProduct) => {
    return axios.delete(`http://localhost:3002/api/cart/decrease-amount/${idCart}`, {
        data: {
            productId: idProduct
        }
    })
};
const getRecommnedProductService = (page) => {
    return axios.get(`http://localhost:3002/api/product/get-all?page=${page}&limit=5`)
}
const getAllCouponService = (method) => {

    return axios.get(`http://localhost:3002/api/coupon/get-all/${method}`)

}
const checkedCouponService = (idOrder, idCoupon) => {
    return axios.post(`http://localhost:3002/api/coupon/increase/${idOrder}`, {
        idCoupon: idCoupon
    })
}
const getDetailOrderService = (idOrder) => {
    return axios.get(`http://localhost:3002/api/order/get-details-order/${idOrder}`)
}
const getDetailPaymentService = () => {
    if (localStorage.getItem('idPayment')) {
        return axios.get(`http://localhost:3002/api/payment/get-details-payment/${localStorage.getItem('idPayment')}`)
    }
}
const getAllPaymentService = (idUser) => {
    return axios.get(`http://localhost:3002/api/payment/get-all-payment/${localStorage.getItem('userId')}`)
}
const createFeedbackService = (idUser, productId, rate, content) => {
    return axios.post(`http://localhost:3002/api/rating/create/${idUser}`, {
        productId,
        rate,
        content
    })

}
const deleteFeedbackService = (idRating) => {
    return axios.delete(`http://localhost:3002/api/rating/delete-rating/${idRating}`)
}
const createPaymentService = (idOrder, paymentMethod, idCoupons, isShipping) => {
    if (isShipping === 'true') {
        return axios.post(`http://localhost:3002/api/payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": idCoupons,
            isPaid: false
        })
    }
    else {
        return axios.post(`http://localhost:3002/api/payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": idCoupons,
            isPaid: false
        })
    }
}
const getDetailProductService = (idProduct) => {
    return axios.get(`http://localhost:3002/api/product/get-details/${idProduct}`)
}
const orderProductService = (idUser, fullName, addressUser, email, phoneString, noteUser, shippingMethod, addressShipping, cityShipping, noteShipping, addressShop, cityShop) => {


    const phone = parseInt(phoneString, 10)

    if (addressShipping === '') {

        return axios.post(`http://localhost:3002/api/order/create/${idUser}`,

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

        return axios.post(`http://localhost:3002/api/order/create/${idUser}`,
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
const createAuthForgotPasswordService = (email) => {
    return axios.post('http://localhost:3002/api/forgot-pass/create-code', {
        email
    })
}
const authCodeForgotPasswordService = (idCode, code) => {
    return axios.post(`http://localhost:3002/api/forgot-pass/check-code/${idCode}`, {
        code
    })
}
const ResetPasswordService = (idUser, password) => {
    return axios.post(`http://localhost:3002/api/user/change-password/${idUser}`, {
        password

    })
}
const authEmail = (email) => {
    return axios.post('http://localhost:3002/api/auth-email/create-token', {
        email
    })
}

export {
    renderCartService, deleteProductService,
    deleteAllProductService, plustProductService,
    minusProductService, orderProductService,
    getRecommnedProductService,
    getAllCouponService, getDetailOrderService,
    createPaymentService, getDetailPaymentService,
    createFeedbackService, getAllPaymentService,
    getDetailProductService, deleteFeedbackService,
    checkedCouponService, createAuthForgotPasswordService,
    authCodeForgotPasswordService, ResetPasswordService,
    authEmail, getDetailUserService
}; 
