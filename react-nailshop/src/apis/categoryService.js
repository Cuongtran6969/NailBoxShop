import axiosClient from "./axiosClient";
const getCategory = async () => {
    let urlApi = "/api/v1/categories";
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export { getCategory };
