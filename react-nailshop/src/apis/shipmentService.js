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

export const getLeadtime = async (token, formData) => {
    const urlApi = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`;
    try {
        const response = await axios.post(urlApi, formData, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getFee:", error);
        throw error;
    }
};

// export const getShipStatus = async (code) => {
//     const urlApi =
//         "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail";
//     try {
//         const response = await axios.post(
//             urlApi,
//             {
//                 order_code: code
//             },
//             {
//                 headers: {
//                     token: token
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi gọi API getWard:", error);
//         throw error;
//     }
// };
//test
export const createOrderShip = async (token, shopId, formData) => {
    const urlApi =
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
    try {
        const response = await axios.post(
            urlApi,
            {
                ...formData
            },
            {
                headers: {
                    token: token,
                    shopId: shopId
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API createOrderShip:", error);
        throw error;
    }
};

export const getShipStatus = async (token, code) => {
    const urlApi =
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail";
    try {
        const response = await axios.post(
            urlApi,
            {
                order_code: code
            },
            {
                headers: {
                    token: token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getShipStatus:", error);
        throw error;
    }
};
