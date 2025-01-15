import axiosClient from "./axiosClient";

export const createPost = async (formData) => {
    let urlApi = `/api/v1/post/create`;
    const res = await axiosClient.post(urlApi, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const updatePost = async (formData) => {
    let urlApi = `/api/v1/post/update`;
    const res = await axiosClient.put(urlApi, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const getPosts = async (page, size, title) => {
    let urlApi = `/api/v1/posts?page=${page}&size=${size}&title=${title}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const getPostDetail = async (id) => {
    let urlApi = `/api/v1/post/${id}`;
    const res = await axiosClient.get(urlApi);
    return res.data;
};

export const deletePost = async (id) => {
    let urlApi = `/api/v1/post/${id}`;
    const res = await axiosClient.delete(urlApi);
    return res.data;
};
