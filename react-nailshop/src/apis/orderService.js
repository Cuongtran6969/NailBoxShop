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

export const getAllOrders = async (page, size, query) => {
    let urlApi = `/admin/orders?page=${page}&size=${size}`;
    if (query) {
        urlApi += `&filter=${query}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const saveShipCode = async (id, code) => {
    const urlApi = `/admin/orders/${id}/update/ship-code`;
    try {
        const response = await axiosClient.put(urlApi, {
            code: code
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getShipStatus:", error);
        throw error;
    }
};
export const getMyOrders = async (page, size) => {
    let urlApi = `/api/v1/order/my-order?page=${page}&size=${size}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};
export const cancelOrder = async (orderId) => {
    let urlApi = `/api/v1/order/cancel`;
    const res = await axiosClient.put(urlApi, {
        id: orderId
    });
    return res.data;
};
export const updateStatusOrder = async (orderId, status) => {
    let urlApi = `/admin/orders/update-status`;
    const res = await axiosClient.put(urlApi, {
        id: orderId,
        status: status
    });
    return res.data;
};
