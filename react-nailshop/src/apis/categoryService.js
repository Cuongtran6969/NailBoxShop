import axiosClient from "./axiosClient";
const getCategory = async () => {
    let urlApi = "/category/list";
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export { getCategory };
