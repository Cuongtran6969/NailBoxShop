import axiosClient from "./axiosClient";

export const getRandomTicket = async () => {
    try {
        const response = await axiosClient.get("/api/v1/coupon/get-random");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVoucherByCode = async (code) => {
    try {
        const response = await axiosClient.get(`/api/v1/coupon/code/${code}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllVoucher = async (
    currentPage,
    pageSize,
    filterQuery,
    orderBy
) => {
    let urlApi = `/api/v1/coupon/get-all?page=${currentPage}&size=${pageSize}`;
    if (filterQuery) {
        urlApi += `&filter=${filterQuery}`;
    }
    if (orderBy) {
        urlApi += `&sort=${orderBy}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const deleteVoucher = async (id) => {
    try {
        const response = await axiosClient.delete(
            `/api/v1/coupon/delete/${id}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createVoucher = async (formData) => {
    try {
        const response = await axiosClient.post(
            `/api/v1/coupon/create`,
            formData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
