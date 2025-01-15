import { Button, Result } from "antd";
import { useLocation } from "react-router-dom";
const data = {
    error: {
        status: "error",
        title: "Chuyển khoản không thành công",
        subTitle: "Vui lòng đặt lại, cảm ơn quý khách"
    },
    success: {
        status: "success",
        title: "Chuyển khoản thành công",
        subTitle: "Quý khách chú ý số điện thoại để nhận đơn hàng"
    },
    warning: {
        status: "warning",
        title: "Chuyển khoản xảy ra vấn đề",
        subTitle:
            "Trở về trang chủ để đặt hàng, hoặc liên hệ admin qua số điện thoại"
    }
};
function PaymentResult({ result }) {
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

export default PaymentResult;
