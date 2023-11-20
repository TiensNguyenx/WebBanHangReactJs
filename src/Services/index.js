import axios from 'axios';
const renderCartService = (userId) => {
    return axios.get(`http://localhost:3002/api/cart/get-details-cart/${userId}`)
};
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
export { renderCartService, deleteProductService, deleteAllProductService, plustProductService, minusProductService }; 
