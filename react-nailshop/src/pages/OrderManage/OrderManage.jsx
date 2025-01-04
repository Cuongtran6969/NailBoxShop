import ProductItem from "@productManagePages/productItem/ProductItem";
import {
    Checkbox,
    Modal,
    Pagination,
    notification,
    Table,
    Tag,
    Tooltip
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import CateFilter from "@components/CateFilter/CateFilter";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { Divider } from "antd";
// api
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";

import { getShipStatus, createOrderShip } from "@/apis/shipmentService";
import { getAllOrders, saveShipCode } from "@/apis/orderService";
import { LiaShippingFastSolid } from "react-icons/lia";
import { getShopInfo } from "@/apis/shopService";
const sortOptions = [
    { id: 1, type: "", icon: TiArrowUnsorted },
    { id: 2, type: "asc", icon: TiArrowSortedUp },
    { id: 3, type: "desc", icon: TiArrowSortedDown }
];
import styles from "./styles.module.scss";
import OrderItem from "./components/OrderItem";
const statusInfo = {
    PENDING: { label: "Chờ xác nhận", color: "orange" },
    PAYMENT_SUCCESS: { label: "Đã thanh toán trước", color: "green" },
    PROCESSING: { label: "Đơn hàng đang giao đến bạn", color: "blue" },
    CANCELLED: { label: "Đã hủy", color: "red" },
    COMPLETED: { label: "Hoàn thành", color: "volcano" }
};
const shipStatusInfo = {
    pending: { label: "Chờ xác nhận", color: "orange" },
    ready_to_pick: { label: "Chuẩn bị hàng", color: "gold" },
    picking: { label: "Chờ ship lấy hàng", color: "lime" },
    picked: { label: "Đã giao cho vận chuyển", color: "cyan" },
    delivering: { label: "Đang giao", color: "blue" },
    delivered: { label: "Giao hàng thành công", color: "green" },
    delivery_fail: { label: "Giao hàng thất bại", color: "magenta" },
    waiting_to_return: { label: "Chờ dvvc trả hàng", color: "purple" },
    return: { label: "Đã trả", color: "geekblue" },
    cancel: { label: "Đã hủy ship", color: "red" }
};
function OrderManage({ onProductSelection = () => {}, initCheckList = [] }) {
    const navigate = useNavigate();
    const { table, shipRequireBtn, shipCancelBtn, detailBtn } = styles;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [chooseId, setChooseId] = useState(null);
    const [shopInfo, setShopInfo] = useState(null);
    const [filter, setFilter] = useState({
        page: 1,
        size: 10,
        total: 1
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };
    const [order, setOrder] = useState();
    console.log("initCheckList: " + initCheckList);

    // const handlePageChange = (page) => {
    //     setPagination((prev) => ({ ...prev, currentPage: page }));
    // };
    const fetchApiShopInfo = async () => {
        await getShopInfo()
            .then((res) => {
                setShopInfo(res.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getAllOrders();
            console.log(shopInfo.token);

            const ordersWithShipStatus = await Promise.all(
                response.result.items.map(async (item) => {
                    let status = "pending";
                    if (item.ship_code) {
                        await getShipStatus(shopInfo.token, item.ship_code)
                            .then((res) => {
                                status = res.data.status;
                            })
                            .catch(() => {
                                status = "pending";
                            });
                    }
                    return {
                        key: item.id,
                        ...item,
                        ship_status: status
                    };
                })
            );

            setOrders(ordersWithShipStatus);

            setFilter((prev) => ({
                ...prev,
                total: response.result.total
            }));
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log("loading:" + loading);
    console.log("chooseId:" + chooseId);
    useEffect(() => {
        fetchApiShopInfo();
    }, []);
    useEffect(() => {
        fetchOrders();
    }, [shopInfo]);

    // useEffect(() => {
    //     if (initCheckList && initCheckList.length > 0) {
    //         setCheckedList(initCheckList);
    //     }
    // }, [initCheckList]);

    // const onCheckChange = (e, id) => {
    //     console.log(e.target.checked);
    //     if (e.target.checked) {
    //         setCheckedList((prev) => [...prev, id]);
    //     } else {
    //         setCheckedList((prev) => prev.filter((item) => item != id));
    //     }
    // };
    // const checkAll = () => {
    //     console.log("Aaaaa");
    //     console.log("in checkAll = checkedList: " + checkedList);
    //     if (checkedList.length === 0) return false;
    //     return products.every((product) => checkedList.includes(product.id));
    // };
    // const haveCheck = () => {
    //     console.log("Bbbbb");
    //     console.log("in haveCheck = checkedList: " + checkedList);

    //     if (checkedList.length === 0) return false;
    //     return products.some((product) => checkedList.includes(product.id));
    // };

    // const onCheckAllChange = (e) => {
    //     console.log("select change to: " + e.target.checked);
    //     if (e.target.checked) {
    //         //da check full
    //         console.log("herere 1");

    //         setCheckedList((prev) => [
    //             ...prev,
    //             ...products
    //                 .map((product) => product.id)
    //                 .filter((id) => !prev.includes(id))
    //         ]);
    //     } else {
    //         console.log("here 2");
    //         setCheckedList((prev) =>
    //             prev.filter(
    //                 (id) => !products.some((product) => product.id === id)
    //             )
    //         );
    //     }
    // };
    const displayPriceFomatVn = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
    };

    const showOrderDetail = (id) => {
        const order = orders.find((order) => order.id === id);
        console.log("id: " + id);
        setIsOpenDetail(true);
        setOrder(order);
    };
    const columns = useMemo(
        () => [
            {
                title: (
                    <div className="d-flex">
                        <Checkbox
                        // indeterminate={haveCheck() && !checkAll()}
                        // onChange={(e) => onCheckAllChange(e)}
                        // checked={checkAll()}
                        />
                    </div>
                ),
                dataIndex: "",
                render: (t, r) => (
                    <div className="d-flex">
                        <Checkbox
                        // onChange={(e) => onCheckChange(e, r.id)}
                        // checked={checkedList.includes(r.id)}
                        />
                    </div>
                )
            },
            {
                title: "Mã",
                dataIndex: "code",
                render: (t, r) => (
                    <div className="d-flex">
                        <span
                            className={detailBtn}
                            onClick={() => {
                                // setChooseId(r.id);
                                showOrderDetail(r.id);
                            }}
                        >
                            {r.code}
                        </span>
                    </div>
                )
            },
            {
                title: "Người nhận",
                dataIndex: "receiver_name"
            },
            {
                title: "Địa chỉ",
                dataIndex: "address",
                render: (t, r) => {
                    return (
                        <span>
                            {r.ward_name +
                                ", " +
                                r.district_name +
                                ", " +
                                r.province_name}
                        </span>
                    );
                }
            },
            {
                title: "Giá ship",
                dataIndex: "ship_fee",
                render: (ship_fee) =>
                    ship_fee && (
                        <>
                            <div className="d-flex">
                                {displayPriceFomatVn(ship_fee)}
                            </div>
                        </>
                    )
            },
            {
                title: "Voucher",
                dataIndex: "coupon",
                render: (coupon) =>
                    coupon ? (
                        <div className="d-flex">
                            {coupon.amount
                                ? coupon.type + " " + coupon.amount + "%"
                                : coupon.type}
                        </div>
                    ) : (
                        <div>0</div> // Hiển thị 0 khi coupon là null
                    )
            },
            {
                title: "Tổng giá",
                dataIndex: "total_price",
                render: (total_price) =>
                    total_price && (
                        <>
                            <div className="d-flex">
                                {displayPriceFomatVn(total_price)}
                            </div>
                        </>
                    )
            },
            {
                title: "Số lượng",
                dataIndex: "quantity"
            },
            {
                title: "Tình trạng",
                dataIndex: "status",
                render: (status) =>
                    status ? (
                        <Tag color={statusInfo[status]?.color}>
                            {statusInfo[status]?.label}
                        </Tag>
                    ) : null
            },
            {
                title: "Tình trạng ship",
                dataIndex: "ship_status",
                render: (ship_status) =>
                    ship_status ? (
                        <Tag color={shipStatusInfo[ship_status]?.color}>
                            {shipStatusInfo[ship_status]?.label}
                        </Tag>
                    ) : (
                        <Tag>{ship_status}</Tag>
                    )
            },
            {
                title: "shipper lấy hàng",
                dataIndex: "status",
                render: (t, r) => (
                    <div className="d-flex">
                        <div>
                            <LiaShippingFastSolid
                                className={shipRequireBtn}
                                onClick={() => {
                                    setChooseId(r.id);
                                    setIsModalOpen(true);
                                }}
                            />
                            {r.ship_code &&
                                (r.ship_status === "pending" ||
                                    r.ship_status == "ready_to_pick" ||
                                    r.ship_status == "picking") && (
                                    <MdCancel
                                        className={shipCancelBtn}
                                        onClick={() => {
                                            setChooseId(r.id);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                )}
                        </div>
                    </div>
                )
            }
        ],
        []
    );
    const handlePageChange = (page) => {
        setSearchData((prev) => ({
            ...prev,
            page: page
        }));
    };
    const handleCancelConfirm = () => {
        setIsModalOpen(false);
    };
    const handleCancelDetail = () => {
        setIsOpenDetail(false);
    };

    const transformItems = (items) => {
        return items.map((item) => {
            return {
                name:
                    item.productName +
                    (item.designName ? "|" + item.designName : "") +
                    "| size " +
                    item.size,
                quantity: item.quantity,
                price: parseInt(item.unitPrice * (1 - item.discount / 100))
            };
        });
    };

    const createShipOrder = () => {
        setIsModalOpen(false);
        if (shopInfo && chooseId) {
            const order = orders.find((order) => order.id === chooseId);
            const orderItems = transformItems(order.items);
            const formData = {
                to_name: order.receiver_name,
                to_phone: order.phone,
                client_order_code: order.code,
                to_address:
                    order.ward_name +
                    "," +
                    order.district_name +
                    "," +
                    order.province_name,
                to_ward_name: order.ward_name,
                to_district_name: order.district_name,
                to_province_name: order.province_name,
                cod_amount: parseInt(order.total_price),
                content: "Đơn hàng nailbox thiết kế, thương hiệu NailLaBox",
                length: shopInfo.boxLength,
                width: shopInfo.boxWidth,
                height: shopInfo.boxHeight * order.quantity,
                weight: shopInfo.boxWeight * order.quantity,
                insurance_value: parseInt(order.total_price),
                service_type_id: 2,
                pick_shift: [2],
                required_note: "CHOXEMHANGKHONGTHU",
                payment_type_id: 2,
                items: orderItems
            };
            createOrderShip(shopInfo.token, shopInfo.shopId, formData)
                .then((res) => {
                    openNotificationWithIcon(
                        "success",
                        "Yêu cầu vận chuyển thành công",
                        "Chuẩn bị hàng cho bên vận chuyển đến lấy hàng"
                    );
                    saveShipCode(chooseId, res.data.order_code);
                })
                .catch((err) => {
                    console.log(err);

                    openNotificationWithIcon(
                        "error",
                        "Yêu cầu vận chuyển thất bại",
                        err.response?.data?.code_message_value
                    );
                });
        }
    };

    const handleShipRequire = () => {
        if (chooseId) {
            createShipOrder();
        } else {
            console.log("errr");
        }
    };

    return (
        <div>
            {contextHolder}
            <Modal
                title="Dịch vụ giao hàng"
                open={isModalOpen}
                onOk={handleShipRequire}
                onCancel={handleCancelConfirm}
            >
                <p>Yêu cầu bên vận chuyển tới lấy hàng</p>
            </Modal>

            <Modal
                title="Chi tiết đơn hàng"
                onCancel={handleCancelDetail}
                open={isOpenDetail}
                width={580}
            >
                {console.log(order)}

                {order &&
                    order?.items.map((item) => {
                        return <OrderItem item={item} />;
                    })}
                {order && (
                    <>
                        {" "}
                        <Divider />
                        <div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Sum:</strong>
                                <span className="fs-6 fw-medium">
                                    {new Intl.NumberFormat("vi-VN").format(
                                        order.total_price
                                    )}
                                    ₫
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Voucher:</strong>
                                <span className="fs-6 fw-medium">
                                    {order.coupon &&
                                        order.coupon &&
                                        (order.coupon.type === "Discount"
                                            ? order.coupon.amount + "%"
                                            : order.coupon.type)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Ship fee:</strong>
                                <span className="fs-6 fw-medium">
                                    {new Intl.NumberFormat("vi-VN").format(
                                        order.ship_fee
                                    )}
                                    ₫
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Total:</strong>
                                <span className="fs-6 fw-medium">
                                    {order.coupon &&
                                        order.coupon.type === "Discount" &&
                                        new Intl.NumberFormat("vi-VN").format(
                                            Math.floor(
                                                order.total_price -
                                                    order.total_price *
                                                        0.01 *
                                                        order.coupon.amount
                                            )
                                        )}
                                    {order.coupon && <>{order.coupon.type}</>}
                                    {!order.coupon && (
                                        <>
                                            {new Intl.NumberFormat(
                                                "vi-VN"
                                            ).format(
                                                Math.floor(
                                                    order.total_price +
                                                        order.ship_fee
                                                )
                                            )}
                                            ₫
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {}
            </Modal>

            <Table
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={orders}
                pagination={false}
                loading={loading}
                scroll={{ x: 1500, y: 700 }}
                className={table}
            />
            <Pagination
                className="mt-3"
                current={filter.page}
                onChange={handlePageChange}
                pageSize={10}
                align="end"
                total={filter.total}
            />
        </div>
    );
}

export default OrderManage;
