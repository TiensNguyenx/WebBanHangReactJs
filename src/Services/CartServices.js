import request from "~/utils/request";
export const renderCartService = (userId) => {
    return request.get(`cart/get-details-cart/${userId}`)
};