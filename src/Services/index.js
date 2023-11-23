import axios from 'axios';



const renderCartService = (userId) => {
    return axios.get(`http://localhost:3002/api/cart/get-details-cart/${userId}`)
};
const updateUserService = (userId, name, email, phone) => {
    return axios.put(`http://localhost:3002/api/user/update-user/${userId}`, {
        headers: {
            token: `Bearer ${localStorage.getItem('token')}`
        },
        body: {
            name,
            email,
            phone
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

const orderProductService = (fullName, addressUser, email, phoneString, noteUser, shippingMethod, addressShipping, cityShipping, noteShipping, addressShop, cityShop) => {
    const idUser = localStorage.getItem('idUser')

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
export { renderCartService, deleteProductService, deleteAllProductService, plustProductService, minusProductService, orderProductService, updateUserService }; 
