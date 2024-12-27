import axiosClient from "./axiosClient";

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

export const register = async (otp, formData) => {
    let urlApi = `/auth/register?otp=${otp}`;
    const response = await axiosClient.post(urlApi, formData);
    return response.data;
};
export default { sendOtpRegister, register };
