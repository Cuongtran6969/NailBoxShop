import styles from "../styles.module.scss";
import OrderItem from "./OrderItem";
import { Divider, Button, Pagination, Modal, notification } from "antd";
import { getMyOrders, cancelOrder } from "@/apis/orderService";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const statusInfo = {
    PENDING: { label: "Chờ xác nhận", color: "orange" },
    PAYMENT_SUCCESS: { label: "Đã thanh toán trước", color: "green" },
    PROCESSING: { label: "Đơn hàng đang giao đến bạn", color: "blue" },
    CANCELLED: { label: "Đã hủy", color: "red" },
    COMPLETED: { label: "Hoàn thành", color: "volcano" }
};
import { Container, Row } from "react-bootstrap";
function MyOrder() {
    const {
        orderHeader,
        orderCode,
        orderDate,
        orderCancel,
        orderStatus,
        orderFooter,
        footerTitle,
        totalPrice,
        buyAgainBtn,
        footerPrice,
        contactBtn
    } = styles;
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 3,
        total: 10
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chooseId, setChooseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, page: page }));
    };
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(Math.floor(price)) + "₫";
    };
    function calculateDiscountAmount(discountedPrice, discountPercent) {
        // Tính giá gốc
        const originalPrice = (discountedPrice * 100) / (100 - discountPercent);
        // Tính số tiền đã giảm
        const discountAmount = originalPrice - discountedPrice;
        // Kết quả
        return formatPrice(discountAmount);
    }

    function calculateOriginalPrice(discountedPrice, discountPercent) {
        const originalPrice = (discountedPrice * 100) / (100 - discountPercent);
        return formatPrice(originalPrice);
    }
    const getOrders = async () => {
        setLoading(true);
        await getMyOrders(pagination.page, pagination.size)
            .then((res) => {
                console.log(res.result.items);
                setOrders(res.result.items);
                setPagination({
                    page: res.result.page,
                    size: res.result.size,
                    total: res.result.total
                });
            })
            .catch((err) => {});
        setLoading(false);
    };
    const renderSkeletons = () => (
        <Row className="gx-3 gy-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                    <Skeleton width="100%" />
                    <Skeleton width="20%" className="mt-2" />
                    <div className="d-flex">
                        <div className="w-50 w-sm-25">
                            <Skeleton
                                width="90%"
                                height="160px"
                                className="mt-2"
                            />
                        </div>
                        <div className="w-50 w-sm-75 text-end">
                            <Skeleton width="90%" className="mt-2" />
                            <Skeleton width="90%" className="mt-2" />
                        </div>
                    </div>
                    <div className="text-end">
                        <Skeleton width="30%" />
                        <Skeleton width="30%" />
                    </div>
                </div>
            ))}
        </Row>
    );
    useEffect(() => {
        getOrders();
    }, [pagination.page]);

    const handleCancel = async () => {
        await cancelOrder(chooseId)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Đơn hàng",
                    "Đơn hàng hủy thành công"
                );
                setIsModalOpen(false);
                getOrders();
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Đơn hàng",
                    "Đơn hàng hủy thất bại"
                );
            });
    };
    return (
        <>
            {contextHolder}
            <Modal
                title="Hủy đơn hàng"
                open={isModalOpen}
                onOk={handleCancel}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Bạn chắc chắn muốn hủy đơn hàng này</p>
            </Modal>
            {!loading ? (
                <>
                    {orders.map((order) => {
                        return (
                            <div className="mb-5">
                                <div className={orderHeader}>
                                    <div>
                                        <span className={orderCode}>
                                            MÃ ĐƠN HÀNG:{" "}
                                            <strong>{order.code}</strong>
                                        </span>
                                        <p className={orderDate}>
                                            Ngày đặt:{" "}
                                            {new Date(
                                                order.createAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <span className={orderStatus}>
                                            {statusInfo[order.status].label}
                                        </span>
                                    </div>
                                </div>
                                <Divider className="my-1" />
                                <div>
                                    {order.items.map((item) => {
                                        return <OrderItem item={item} />;
                                    })}
                                </div>
                                <div className={orderFooter}>
                                    <div className={footerPrice}>
                                        <span className={footerTitle}>
                                            Order total:
                                        </span>
                                        <span className={totalPrice}>
                                            {order.coupon &&
                                            order.coupon.amount > 0
                                                ? calculateOriginalPrice(
                                                      order.totalPrice,
                                                      order.coupon.amount
                                                  )
                                                : calculateOriginalPrice(
                                                      order.totalPrice,
                                                      0
                                                  )}
                                        </span>
                                    </div>
                                    <div className={footerPrice}>
                                        <span className={footerTitle}>
                                            Phí vận chuyển:
                                        </span>
                                        <span className={totalPrice}>
                                            {formatPrice(order.shipFee)}
                                        </span>
                                    </div>
                                    <div className={footerPrice}>
                                        <span className={footerTitle}>
                                            {order.coupon &&
                                            order.coupon.amount > 0
                                                ? "Giảm giá từ shop"
                                                : ""}
                                            {order.coupon &&
                                            order.coupon.amount == 0
                                                ? "Miễn phí vận chuyển"
                                                : ""}
                                        </span>
                                        <span className={totalPrice}>
                                            {order.coupon &&
                                            order.coupon.amount > 0
                                                ? calculateDiscountAmount(
                                                      order.totalPrice,
                                                      order.coupon.amount
                                                  )
                                                : ""}
                                            {order.coupon &&
                                            order.coupon.amount == 0
                                                ? "-" +
                                                  formatPrice(order.shipFee)
                                                : ""}
                                        </span>
                                    </div>
                                    <div className={footerPrice}>
                                        <span className={footerTitle}>
                                            Tổng:
                                        </span>
                                        <span className={totalPrice}>
                                            {order.coupon &&
                                            order.coupon.amount == 0
                                                ? formatPrice(order.totalPrice)
                                                : formatPrice(
                                                      order.totalPrice +
                                                          order.shipFee
                                                  )}
                                        </span>
                                    </div>
                                    <div>
                                        {order.status === "PENDING" ? (
                                            <Button
                                                type="default"
                                                className={orderCancel}
                                                onClick={() => {
                                                    setChooseId(order.id);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Hủy
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                        <Button
                                            type="default"
                                            className={buyAgainBtn}
                                        >
                                            Buy Again
                                        </Button>
                                        <Button
                                            type="default"
                                            className={contactBtn}
                                        >
                                            Contact Sale
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <Pagination
                        className="mt-3"
                        current={pagination.page}
                        onChange={handlePageChange}
                        pageSize={pagination.size}
                        align="end"
                        total={pagination.total}
                    />
                </>
            ) : (
                <>{renderSkeletons()}</>
            )}
        </>
    );
}

export default MyOrder;
