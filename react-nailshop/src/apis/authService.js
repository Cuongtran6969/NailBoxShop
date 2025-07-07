import axiosClient from "./axiosClient";
import Cookies from "js-cookie";
export const sendOtpRegister = async (email) => {
    try {
        const response = await axiosClient.post(`/auth/send-otp-register`, {
            email: email
        });
        return response.data;
    } catch (error) {
        console.error("Error sendOtpRegister", error);
        throw error;
    }
};

export const sendOtpResetPassword = async (email) => {
    try {
        const response = await axiosClient.post(`/auth/send-otp`, {
            email: email
        });
        return response.data;
    } catch (error) {
        console.error("Error send Otp Reset Password", error);
        throw error;
    }
};

export const resetPassword = async (formData) => {
    try {
        const response = await axiosClient.post(
            `/auth/reset-password`,
            formData
        );
        return response.data;
    } catch (error) {
        console.error("Error Reset Password", error);
        throw error;
    }
};

export const register = async (otp, formData) => {
    let urlApi = `/auth/register?otp=${otp}`;
    try {
        const response = await axiosClient.post(urlApi, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (formData) => {
    let urlApi = `/auth/login`;
    try {
        const response = await axiosClient.post(urlApi, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const introspect = async () => {
    try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            throw new Error("Token is missing");
        }
        const response = await axiosClient.get(`/users/introspect`);

        if (response.data && response.data.result) {
            return response.data.result;
        } else {
            throw new Error("Invalid introspect response structure");
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Failed to introspect token";
        throw new Error(errorMessage);
    }
};

export const logout = async (token) => {
    let urlApi = `/auth/logout`;
    try {
        const response = await axiosClient.post(urlApi, {
            token: token
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { sendOtpRegister, register, login, introspect };
