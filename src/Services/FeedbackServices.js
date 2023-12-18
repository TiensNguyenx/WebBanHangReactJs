import request from "~/utils/request";
export const createFeedbackService = (idUser, productId, rate, content) => {
    return request.post(`rating/create/${idUser}`, {
        productId,
        rate,
        content
    })

}
export const deleteFeedbackService = (idRating) => {
    return request.delete(`rating/delete-rating/${idRating}`)
}