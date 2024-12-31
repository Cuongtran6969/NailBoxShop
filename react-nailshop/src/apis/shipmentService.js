import axios from "axios";

export const getShipFee = async (token, shop_id, formData) => {
    const urlApi = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`;
    try {
        const response = await axios.post(urlApi, formData, {
            headers: {
                token: token,
                shop_id: shop_id
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getFee:", error);
        throw error;
    }
};
