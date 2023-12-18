import request from "~/utils/request";

export const deleteProductService = (idCart, idProduct) => {
    return request.delete(`cart/delete-item/${idCart}`, {
        data: {
            productId: idProduct
        }
    })

};
export const deleteAllProductService = (idCart) => {
    return request.delete(`cart/delete-cart/${idCart}`)
}
export const plustProductService = (idCart, idProduct) => {
    return request.put(`cart/increase-amount/${idCart}`, {
        productId: idProduct
    })
}
export const minusProductService = (idCart, idProduct) => {
    return request.delete(`cart/decrease-amount/${idCart}`, {
        data: {
            productId: idProduct
        }
    })
};
export const getRecommnedProductService = (page) => {
    return request.get(`product/get-all?page=${page}&limit=5`)
}
export const getDetailProductService = (idProduct) => {
    return request.get(`product/get-details/${idProduct}`)
}
export const getProductByNameService = (name) => {
    return request.get(`product/get-all?filter=name&filter=${name}`)
}