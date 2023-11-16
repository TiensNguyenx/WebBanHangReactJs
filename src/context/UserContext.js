import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false });
    const [idUser, setIdUser] = useState('')
    const loginContext = (token) => {
     
        localStorage.setItem('token', token)
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            console.log(decoded.payload.id)
            if (decoded.payload.id) {
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
                        console.log(data.data._id)
                        setUser((user) => ({
                            email: data.data.email,
                            auth: true,
                            name: data.data.name,
                            id: data.data._id
                        }));
                    })
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
       
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };
    const registerCpntext = () => {

    }
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };

