import request from "~/utils/request";
export const createAuthForgotPasswordService = (email) => {
    return request.post('forgot-pass/create-code', {
        email
    })
}
export const authCodeForgotPasswordService = (idCode, code) => {
    return request.post(`forgot-pass/check-code/${idCode}`, {
        code
    })
}
export const ResetPasswordService = (idUser, password) => {
    return request.post(`user/change-password/${idUser}`, {
        password

    })
}
export const authEmail = (email) => {
    return request.post('auth-email/create-token', {
        email
    })
}
export const getDetailUserService = (id) => {
    return request.get(`user/get-detail/${id}`,
        {
            'headers': {
                token: `Beare ${localStorage.getItem('token')}`
            }
        }
    )
}
