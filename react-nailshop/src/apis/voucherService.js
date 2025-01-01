import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

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
        const response = await axiosClient.get("/api/v1//coupon/code", {
            code: code
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
