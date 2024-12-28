import axiosClient from "./axiosClient";
let token = "0f7f0dee-c521-11ef-bc3f-4e8d0f51e688";
// Hàm gửi yêu cầu với token
const getProvince = async () => {
    let urlApi = `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`;
    try {
        const response = await axiosClient.get(urlApi, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getProvince:", error);
        throw error;
    }
};
const getDistrict = async (province_id) => {
    const urlApi = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`;
    try {
        const response = await axiosClient.get(urlApi, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getDistrict:", error);
        throw error;
    }
};
const getWard = async (district_id) => {
    const urlApi = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`;
    try {
        const response = await axiosClient.get(urlApi, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getWard:", error);
        throw error;
    }
};

export { getProvince, getDistrict, getWard };
