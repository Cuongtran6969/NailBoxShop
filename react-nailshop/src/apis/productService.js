import axiosClient from "./axiosClient";
const getProduct = async (currentPage, filterQuery) => {
    let urlApi = `/admin/products/get-product?page=${currentPage}`;
    if (filterQuery) {
        urlApi += `&filter=${filterQuery}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export { getProduct };
