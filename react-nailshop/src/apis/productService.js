import axiosClient from "./axiosClient";
const getProduct = async () => {
    const res = await axiosClient.get("/admin/products/get-product");
    return res.data;
};

export { getProduct };
