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

export const updateShopInfo = async (formData) => {
    try {
        const response = await axiosClient.put("/admin/shop/update", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBanner = async (formData) => {
    const response = await axiosClient.put(
        `/admin/shop/save-banner`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
};

export const getBanners = async () => {
    const response = await axiosClient.get(`/api/v1/shop/banners`);
    return response.data;
};
