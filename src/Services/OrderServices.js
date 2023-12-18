import request from "~/utils/request";
export const getDetailOrderService = (idOrder) => {
    return request.get(`order/get-details-order/${idOrder}`)
}
export const orderProductService = (idUser, fullName, addressUser, email, phoneString, noteUser, shippingMethod, addressShipping, cityShipping, noteShipping, addressShop, cityShop) => {


    const phone = parseInt(phoneString, 10)

    if (addressShipping === '') {

        return request.post(`order/create/${idUser}`,

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

        return request.post(`order/create/${idUser}`,
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