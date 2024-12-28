import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 60000,
    headers: { "content-type": "application/json" }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
            const refreshToken = Cookies.get("refreshToken");
            if (!refreshToken) return Promise.reject(err);
            try {
                const res = await axiosClient.post("/auth/refresh", {
                    token: refreshToken
                });
                const newAccessToken = res.result.accessToken;

                Cookies.set("accessToken", newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (error) {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                return Promise.reject(error);
            }
        }
        // else {
        //     Cookies.remove("accessToken");
        //     Cookies.remove("refreshToken");
        // }
        console.log(err);
    }
);
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
