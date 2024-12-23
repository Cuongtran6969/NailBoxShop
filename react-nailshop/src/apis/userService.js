import axiosClient from "./axiosClient";
//api product
const getUsers = async (currentPage, keyword) => {
    let urlApi = `/admin/users/search?page=${currentPage}&size=3&keyword=${keyword}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

const banUser = async (id) => {
    let urlApi = `admin/users/ban/${id}`;
    const res = await axiosClient.put(urlApi);
    return res.data;
};
const unBanUser = async (id) => {
    let urlApi = `admin/users/unban/${id}`;
    const res = await axiosClient.put(urlApi);
    return res.data;
};

export { getUsers, banUser, unBanUser };
