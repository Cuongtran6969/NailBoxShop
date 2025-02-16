import { useLocation, useNavigate } from "react-router-dom";
import { getStatusPaymentQR, cancelPaymentQR } from "@/apis/paymentService";
import { getOrderPaymentInfo } from "@/apis/paymentService";
import { removeVoucher, removeItem } from "@redux/slice/cartSlice";
import { useEffect, useState } from "react";
import Payment from "./components/Payment";
import PaymentResult from "./components/PaymentResult";
import { useDispatch, useSelector } from "react-redux";
function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderId, setOrderId] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetDate, setTargetDate] = useState("");
    const { listBuy } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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

    const hanleCancelPayment = (id) => {
        const fetchApiCancelPayment = async () => {
            setLoading(true);
            await cancelPaymentQR(id)
                .then((res) => {
                    setPaymentStatus(res.result.status);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        };
        if (id) {
            fetchApiCancelPayment();
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        if (location.state) {
            handleRemoveBuyList();
        }

        let timeoutId; // Lưu ID của setTimeout

        const fetchApiOrderPayment = async () => {
            setLoading(true);
            try {
                const res = await getOrderPaymentInfo();

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

                const delay = createdAt.getTime() - new Date().getTime();
                if (delay > 0) {
                    timeoutId = setTimeout(() => {
                        hanleCancelPayment(res.result.orderId);
                    }, delay);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApiOrderPayment();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
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
