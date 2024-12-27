import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 20000,
    headers: { "content-type": "application/json" }
});

axiosClient.interceptors.request.use(
    async (config) => {
        console.log(config);
        const accessToken = Cookies.get("token");
        // const accessToken =
        //     "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzUyMjYzNDUsImV4cCI6MTczNTIyOTk0NX0.UH8N2kL5QRMlo9GjfMTV4UAhktjqI8Z_TSn47F7_Cmo";

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
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
