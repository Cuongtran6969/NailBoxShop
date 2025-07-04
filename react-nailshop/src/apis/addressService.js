import axiosClient from "./axiosClient";
import Cookies from "js-cookie";
export const getMyAddress = async () => {
    try {
        const response = await axiosClient.get("/address/my-addresses");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createAddress = async (formData) => {
    let urlApi = "/address/create";
    const response = await axiosClient.post(urlApi, formData);
    console.log(response);

    return response.data;
};

export const updateAddress = async (addressId, formData) => {
    let urlApi = `/address/update/${addressId}`;
    const response = await axiosClient.put(urlApi, formData);
    return response.data;
};

export const deleteAddress = async (addressId) => {
    let urlApi = `/address/delete/${addressId}`;
    try {
        const response = await axiosClient.delete(urlApi);
        return response.data;
    } catch (error) {
        throw error;
    }
};
