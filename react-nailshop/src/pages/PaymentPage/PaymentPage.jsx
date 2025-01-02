import { useLocation } from "react-router-dom";
function PaymentPage() {
    const location = useLocation();
    const { orderCode } = location.orderCode || "";
    return <div></div>;
}

export default PaymentPage;
