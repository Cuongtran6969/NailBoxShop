import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    const [result, setResult] = useState(location.state?.result || "warning");
    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    }, [location.state]);
    return (
        <Result
            status={data[result].status}
            title={data[result].title}
            subTitle={data[result].subTitle}
            extra={[
                <Button type="primary" key="buy">
                    Buy Again
                </Button>
            ]}
        />
    );
}

export default OrderResultPage;
