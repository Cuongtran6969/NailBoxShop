import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeVoucher, removeItem } from "@redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const data = {
    error: {
        status: "error",
        title: "Đặt hàng không thành công",
        subTitle: "Vui lòng đặt lại, cảm ơn quý khách"
    },
    success: {
        status: "success",
        title: "Đặt hàng thành công",
        subTitle: "Quý khách chú ý số điện thoại để nhận đơn hàng"
    },
    warning: {
        status: "warning",
        title: "Vui lòng đặt hàng",
        subTitle: "Trở về trang chủ để đặt hàng"
    }
};
function OrderResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(location.state?.result || "warning");
    const dispatch = useDispatch();
    const { listBuy } = useSelector((state) => state.cart);

    const handleRemoveBuyList = () => {
        for (const item of listBuy) {
            dispatch(
                removeItem({
                    ...item
                })
            );
        }
        dispatch(removeVoucher());
    };

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        } else {
            handleRemoveBuyList();
        }
    }, [location.state]);
    return (
        <Result
            status={data[result].status}
            title={data[result].title}
            subTitle={data[result].subTitle}
            extra={[
                <Button type="primary" key="buy" onClick={() => navigate("/")}>
                    Buy Again
                </Button>
            ]}
        />
    );
}

export default OrderResultPage;
