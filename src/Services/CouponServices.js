import request from "~/utils/request";
export const getAllCouponService = (method) => {

    return request.get(`coupon/get-all/${method}`)

}
export const checkedCouponService = (idOrder, idCoupon) => {
    return request.post(`coupon/increase/${idOrder}`, {
        idCoupon: idCoupon
    })
}