import axiosClient from "./axiosClient";
//api product
const getProduct = async (currentPage, filterQuery) => {
    let urlApi = `/admin/products/get-product?page=${currentPage}`;
    if (filterQuery) {
        urlApi += `&filter=${filterQuery}`;
    }
    const res = await axiosClient.get(urlApi);
    return res.data;
};
const createProduct = async (formData) => {
    let urlApi = `/admin/products/create-product`;
    const res = await axiosClient.post(urlApi, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};
const updateProduct = async (id, formData) => {
    const response = await axiosClient.put(
        `/admin/products/update-product/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
};
const getProductDetail = async (id) => {
    let urlApi = `/admin/products/${id}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

//api product design
const updateDesign = async (formData) => {
    const res = await axiosClient.put(
        `/admin/products/update-design`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return res.data;
};

const deleteDesign = async (id) => {
    let urlApi = `/admin/products/delete-design/${id}`;
    const res = await axiosClient.delete(urlApi);
    return res.data;
};

const createDesign = async (productId, formData) => {
    let urlApi = `admin/products/create-design/${productId}`;
    const res = await axiosClient.post(urlApi, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export {
    getProduct,
    createProduct,
    updateProduct,
    getProductDetail,
    updateDesign,
    deleteDesign,
    createDesign
};
