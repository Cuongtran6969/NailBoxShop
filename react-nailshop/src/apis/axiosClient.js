import axios from "axios";

let refreshingFunc = undefined;
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "http://localhost:8080/"
});

const refreshToken = async () => {
    try {
        const response = await instance.post("/auth/refresh", {
            token: Cookies.get("accessToken")
        });
        if (response.status === 200) {
            const refreshToken = response.data.result.token;
            Cookies.set("accessToken", refreshToken);
            return refreshToken;
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (error) {
        console.error("Error refreshing token: ", error);
        throw error;
    }
};

instance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token && config.url !== "/auth/refresh") {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return error && error.response && error.response
            ? error.response
            : Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            if (!refreshingFunc) {
                refreshingFunc = refreshToken();
            }
            try {
                const newToken = await refreshingFunc;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                refreshingFunc = undefined;

                return instance(originalRequest);
            } catch (refreshError) {
                refreshingFunc = undefined;
                Cookies.remove("accessToken");
                window.location = `/`;
                return Promise.reject(refreshError);
            }
        }
        return error && error.response ? error.response : Promise.reject(error);
    }
);

export default instance;
