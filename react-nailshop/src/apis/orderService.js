import axiosClient from "./axiosClient";
//api product
export const createOrder = async (formData) => {
    let urlApi = `/api/v1/order/create`;
    const res = await axiosClient.post(urlApi, formData);
    return res.data;
};
