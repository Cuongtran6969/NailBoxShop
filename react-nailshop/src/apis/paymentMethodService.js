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
