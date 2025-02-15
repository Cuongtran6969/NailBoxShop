import { useNavigate } from "react-router-dom";
import { getStatusPaymentQR, cancelPaymentQR } from "@/apis/paymentService";
import { getOrderPaymentInfo } from "@/apis/paymentService";

import { useEffect, useState } from "react";
import Payment from "./components/Payment";
import PaymentResult from "./components/PaymentResult";
function PaymentPage() {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(null);
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
        const fetchApiOrderPayment = async () => {
            setLoading(true);
            await getOrderPaymentInfo()
                .then((res) => {
                    if (res.result === undefined) {
                        navigate("/");
                        return;
                    }
                    setPaymentInfo(res.result);
                    setPaymentStatus(res.result.status);
                    setOrderId(res.result.orderId);
                    const createdAt = new Date(res.result.createdAt);
                    createdAt.setMinutes(createdAt.getMinutes() + 5);
                    setTargetDate(createdAt);
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
    }, []);

    useEffect(() => {
        if (orderId && paymentStatus === "PENDING") {
            const interval = setInterval(async () => {
                try {
                    const res = await getStatusPaymentQR(orderId);
                    setPaymentStatus(res.data.status);
                } catch (err) {
                    console.log(err);
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [paymentStatus]);

    if (loading) {
        return <div>loading....</div>;
    }
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
