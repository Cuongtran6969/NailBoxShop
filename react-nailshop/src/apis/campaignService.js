import axiosClient from "./axiosClient";
const createCampaign = async (formData) => {
    let urlApi = `/campaign/create`;
    const res = await axiosClient.post(urlApi, formData);
    return res.data;
};
const updateCampaign = async (id, formData) => {
    let urlApi = `/campaign/update/${id}`;
    const res = await axiosClient.put(urlApi, formData);
    return res.data;
};
const deleteCampaign = async (id) => {
    let urlApi = `/campaign/delete/${id}`;
    const res = await axiosClient.delete(urlApi);
    return res.data;
};
const searchCampaign = async (currentPage, filterQuery) => {
    let urlApi = `/campaign/search?size=3&page=${currentPage}`;
    if (filterQuery) {
        urlApi += `&filter=name~'${filterQuery}'`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};
const getCampaignDetail = async (id) => {
    let urlApi = `/campaign/${id}/detail`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

const updateCampaignStatus = async (formData) => {
    let urlApi = `/campaign/update-status`;
    const res = await axiosClient.put(urlApi, formData);
    return res.data;
};
export {
    createCampaign,
    updateCampaign,
    deleteCampaign,
    updateCampaignStatus,
    getCampaignDetail,
    searchCampaign
};
