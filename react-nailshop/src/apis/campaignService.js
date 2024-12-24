import axiosClient from "./axiosClient";
const createCampaign = async (formData) => {
    let urlApi = `/campaign/create`;
    const res = await axiosClient.post(urlApi, formData);
    return res.data;
};
export { createCampaign };
