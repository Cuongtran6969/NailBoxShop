import axiosClient from "./axiosClient";
import Cookies from "js-cookie";
export const getShopInfo = async () => {
    try {
        const response = await axiosClient.get("/admin/shop/info");
        return response.data;
    } catch (error) {
        throw error;
    }
};
