import axiosClient from "./axiosClient";
import Cookies from "js-cookie";
export const getPaymentInfo = async () => {
    try {
        const response = await axiosClient.get("/api/v1/payment/methods");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPaymentQR = async (orderId) => {
    try {
        const response = await axiosClient.post("/api/v1/paymentQR/create", {
            orderId: orderId
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStatusPaymentQR = async (orderId) => {
    try {
        const response = await axiosClient.get(`/api/v1/paymentQR/${orderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelPaymentQR = async (orderId) => {
    try {
        const response = await axiosClient.put(
            `/api/v1/paymentQR/cancel/${orderId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
