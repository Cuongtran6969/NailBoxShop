import { useLocation, useNavigate } from "react-router-dom";
import {
    createPaymentQR,
    getStatusPaymentQR,
    cancelPaymentQR
} from "@/apis/paymentService";
import { getOrderPaymentInfo } from "@/apis/orderService";

import { useEffect, useState } from "react";
import Payment from "./components/Payment";
import PaymentResult from "./components/PaymentResult";
function PaymentPage() {
    const location = useLocation();
    console.log("ORDERID: " + location.state?.orderId || "");
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(location.state?.orderId || "");
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetDate, setTargetDate] = useState("");

    const hanleCancelPayment = () => {
        if (orderId) {
            const fetchApiCancelPayment = async () => {
                setLoading(true);
                await cancelPaymentQR(orderId)
                    .then((res) => {
                        console.log(res.result);
                        setPaymentStatus(res.result.status);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setLoading(false);
            };
            fetchApiCancelPayment();
        }
    };

    useEffect(() => {
        if (!orderId) {
            navigate("/");
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) {
            const fetchApiOrderPayment = async () => {
                setLoading(true);
                await getOrderPaymentInfo(orderId)
                    .then((res) => {
                        console.log(res.result);
                        setPaymentInfo(res.result);
                        setPaymentStatus(res.result.status);
                        const createdAt = new Date(res.result.createdAt);
                        createdAt.setMinutes(createdAt.getMinutes() + 5);
                        setTargetDate(createdAt);
                        console.log("time " + createdAt);
                        const timeoutId = setTimeout(() => {
                            hanleCancelPayment();
                        }, createdAt.getTime() - new Date().getTime());
                        return () => clearTimeout(timeoutId);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setLoading(false);
            };
            fetchApiOrderPayment();
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId && paymentStatus === "PENDING") {
            const interval = setInterval(async () => {
                try {
                    const res = await getStatusPaymentQR(orderId);
                    setPaymentStatus(res.data.status);
                    console.log(res.data);
                } catch (err) {
                    console.log(err);
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [orderId, paymentStatus]);

    if (loading) {
        return <div>loading....</div>;
    }
    console.log("paymentInfo:" + paymentInfo);
    console.log("paymentStatus:" + paymentStatus);
    return (
        <div>
            {paymentStatus === "PENDING" && (
                <Payment
                    info={paymentInfo}
                    countTime={targetDate}
                    hanleCancelPayment={hanleCancelPayment}
                />
            )}
            {paymentStatus === "PAID" && <PaymentResult result={"success"} />}
            {paymentStatus === "CANCELLED" && (
                <PaymentResult result={"error"} />
            )}
        </div>
    );
}

export default PaymentPage;
