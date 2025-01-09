import axiosClient from "./axiosClient";
export const getInfo = async (time) => {
    let urlApi = `/admin/dashboard`;
    const res = await axiosClient.post(urlApi, {
        time: time
    });
    return res.data;
};
