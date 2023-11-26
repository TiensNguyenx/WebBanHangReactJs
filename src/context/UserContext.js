import React from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false });
    const [lengthCart, setLengthCart] = React.useState(0);
    const loginContext = (token) => {

        localStorage.setItem('token', token)
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.payload?.id) {
                fetch(`http://localhost:3002/api/user/get-detail/${decoded.payload.id}`, {
                    headers: {
                        token: `Beare ${token}`
                    },

                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json()
                        }
                    }

                    )
                    .then((data) => {

                        if (data) {
                            setUser((user) => ({
                                email: data.data.email,
                                auth: true,
                                name: data.data.name,
                                id: data.data._id,
                                phone: data.data.phone,
                            }));


                        }
                    })
            }
        }
    };


    const getLengthCartContext = async () => {
        if (user.id) {
            axios.get(`http://localhost:3002/api/cart/get-details-cart/${user.id}`)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setLengthCart(res.data.data.totalItems)
                    }
                })
        }
    }
    const decreaseLength = () => {
        setLengthCart(lengthCart - 1)
    }
    const increaseLength = () => {
        setLengthCart(lengthCart + 1)
    }
    const resetLength = () => {
        setLengthCart(0)
    }
    const handleAddCartContext = (idUser, idProduct) => {
        return axios.post(`http://localhost:3002/api/cart/add-to-cart`, {
            newCart: {
                userID: idUser,
                productID: idProduct,
            }
        })
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idPayment');

        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };
    const toastCustom = {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
    return (
        <UserContext.Provider value={{ user, loginContext, logout, setUser, handleAddCartContext, lengthCart, getLengthCartContext, decreaseLength, increaseLength, resetLength, toastCustom }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };