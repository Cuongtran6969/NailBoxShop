import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: { "content-type": "application/json" }
});

axiosClient.interceptors.request.use(
    async (config) => {
        console.log(config);
        const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzUwNzE5MjMsImV4cCI6MTczNTA3NTUyM30.O52gVQTf5Hwb-UvwBnwWXRD0ZRua4zIypG0hrskPqFU";

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
// axiosClient.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalRequest = err.config;
//         if (err.response.status === 401 && !originalRequest._retry) {
//             const refreshToken = Cookies.get("refreshToken");
//             if (!refreshToken) return Promise.reject(err);
//             try {
//                 const res = await axiosClient.post("/refresh-token", {
//                     token: refreshToken
//                 });
//                 const newAccessToken = res.data.accessToken;

//                 Cookies.set("token", newAccessToken);
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return axiosClient(originalRequest);
//                 console.log("acc: " + res.data.accessToken);
//             } catch (error) {
//                 Cookies.remove("token");
//                 Cookies.remove("refreshToken");
//                 return Promise.reject(error);
//             }
//         }

//         console.log(err);
//     }
// );
export default axiosClient;

// const originalRequest = err.config;
// if ((err.response.status = 401 && !originalRequest._retry)) {
//     originalRequest._retry = true;
//     const refreshToken = Cookies.get("refreshToken");
//     if (!refreshToken) return Promise.reject(err);
//     try {
//         const res = await axiosClient.post("/refresh-token", {
//             token: refreshToken
//         });
//         const newAccessToken = res.data.accessToken;
//         Cookies.set("token", newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosClient(originalRequest);
//         console.log(res);
//     } catch (error) {
//         Cookies.remove("token");
//         Cookies.remove("refreshToken");
//         return Promise.reject(error);
//     }
// }
