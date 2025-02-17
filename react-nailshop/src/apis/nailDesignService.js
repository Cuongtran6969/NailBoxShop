import axiosClient from "./axiosClient";
export const getNailDesign = async (filterQuery, currentPage, pageSize) => {
    let urlApi = `/api/v1/design/all?page=${currentPage}&size=${pageSize}`;
    if (filterQuery) {
        urlApi += `&filter=${filterQuery}`;
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
