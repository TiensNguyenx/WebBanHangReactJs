import request from "~/utils/request";
export const getDetailPaymentService = () => {
    if (localStorage.getItem('idPayment')) {
        return request.get(`payment/get-details-payment/${localStorage.getItem('idPayment')}`)
    }
}
export const getAllPaymentService = (idUser) => {
    return request.get(`payment/get-all-payment/${localStorage.getItem('userId')}`)
}
export const createPaymentService = (idOrder, paymentMethod, idCoupons, isShipping, isPaid) => {
    if (isShipping === 'true') {
        return request.post(`payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": idCoupons,
            isPaid
        })
    }
    else {
        return request.post(`payment/create/${idOrder}`, {
            paymentMethod,
            "idCoupon": idCoupons,
            isPaid
        })
    }
}