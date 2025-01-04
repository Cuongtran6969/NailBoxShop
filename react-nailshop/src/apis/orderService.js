import axiosClient from "./axiosClient";
//api product
export const createOrder = async (formData) => {
    let urlApi = `/api/v1/order/create`;
    const res = await axiosClient.post(urlApi, formData);
    return res.data;
};

export const getOrderPaymentInfo = async (id) => {
    let urlApi = `/api/v1/order/payment-info/${id}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const getAllOrders = async () => {
    let urlApi = `/admin/orders`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};