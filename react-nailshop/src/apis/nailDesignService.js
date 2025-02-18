import axiosClient from "./axiosClient";
export const getNailDesign = async (filterQuery, currentPage, pageSize) => {
    let urlApi = `/api/v1/design/all`;
    let signalFirst = false;
    if (currentPage && pageSize) {
        urlApi += `?page=${currentPage}&size=${pageSize}`;
    } else {
        signalFirst = true;
    }
    if (filterQuery) {
        if (signalFirst) {
            urlApi += "?";
        } else {
            urlApi += "&";
        }
        urlApi += `filter=${filterQuery}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const getNailCategory = async (currentPage, pageSize) => {
    let urlApi = `/api/v1/design/cate/all`;
    if (currentPage && pageSize) {
        url += `?page=${currentPage}&size=${pageSize}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const createNailDesignTemplate = async (data) => {
    let urlApi = `/api/v1/design/create`;
    const res = await axiosClient.post(urlApi, data);
    return res.data;
};
export const createNailCateTemplate = async (data) => {
    let urlApi = `/api/v1/design/category/create`;
    const res = await axiosClient.post(urlApi, data);
    return res.data;
};

export const deleteNailDesignTemplate = async (id) => {
    let urlApi = `/api/v1/design/${id}`;
    const res = await axiosClient.delete(urlApi);
    return res.data;
};
