import ProductItem from "@productManagePages/productItem/ProductItem";
import {
    Checkbox,
    Modal,
    Pagination,
    notification,
    Table,
    Tag,
    Dropdown,
    Space,
    Divider,
    Tooltip,
    Input,
    Button
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
// api
import { DownOutlined } from "@ant-design/icons";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { IoMdMore } from "react-icons/io";
import {
    getShipStatus,
    createOrderShip,
    cancelShip
} from "@/apis/shipmentService";
import {
    getAllOrders,
    saveShipCode,
    updateStatusOrder
} from "@/apis/orderService";
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
    PAYMENT_SUCCESS: { label: "Đã thanh toán trước", color: "cyan" },
    PROCESSING: { label: "Đang giao", color: "blue" },
    CANCELLED: { label: "Đã hủy", color: "red" },
    COMPLETED: { label: "Hoàn thành", color: "green" }
};
const shipStatusInfo = {
    none: { label: "Chưa yêu cầu", color: "" },
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
    const [isModalCancel, setIsModalCancel] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [chooseId, setChooseId] = useState(null);
    const [chooseCode, setChooseCode] = useState(null);
    const [shopInfo, setShopInfo] = useState(null);
    const [filter, setFilter] = useState({
        page: 1,
        size: 10,
        total: 1,
        code: "",
        inputCode: "",
        createAt: sortOptions[0],
        shipFee: sortOptions[0],
        totalPrice: sortOptions[0],
        status: ""
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };
    const items = [
        {
            label: <a>Tất cả</a>,
            key: ""
        },
        {
            label: <a>Chờ xác nhận</a>,
            key: "PENDING"
        },
        {
            label: <a>Đã thanh toán trước</a>,
            key: "PAYMENT_SUCCESS"
        },
        {
            label: <a>Đơn hàng đang giao đến bạn</a>,
            key: "PROCESSING"
        },
        {
            label: <a>Đã hủy</a>,
            key: "CANCELLED"
        },
        {
            label: <a>Hoàn thành</a>,
            key: "COMPLETED"
        }
    ];
    const handleMenuClick = (e) => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            status: e.key
        }));
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };
    const handleChangeStatus = async (id, status) => {
        await updateStatusOrder(id, status)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Trạng thái đơn hàng",
                    "Đơn hàng đã cập nhật thành công"
                );
                fetchApiShopInfo();
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Trạng thái đơn hàng",
                    "Đơn hàng đã cập nhật thất bại"
                );
            });
    };

    const menuPropsForRow = (id) => ({
        items: [
            {
                label: <a>Giao hàng</a>,
                key: "PROCESSING"
            },
            {
                label: <a>Hủy</a>,
                key: "CANCELLED"
            },
            {
                label: <a>Hoàn thành</a>,
                key: "COMPLETED"
            }
        ],
        onClick: (e) => handleChangeStatus(id, e.key)
    });
    const [order, setOrder] = useState();

    const fetchApiShopInfo = async () => {
        await getShopInfo()
            .then((res) => {
                setShopInfo(res.result);
            })
            .catch((err) => {});
    };

    const parseMoneyFormat = (price) => {
        return new Intl.NumberFormat("vi-VN").format(Math.floor(price)) + "đ";
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { page, size, code, createAt, status, shipFee, totalPrice } =
                filter;

            let query = `code~'${code.trim()}'`;
            if (status) {
                query += `&filter=status='${status}'`;
            } else {
                query += `&filter=status~'${status}'`;
            }
            if (createAt.type) query += `&sort=createAt:${createAt.type}`;
            if (shipFee.type) query += `&sort=shipFee:${shipFee.type}`;
            if (totalPrice.type) query += `&sort=totalPrice:${totalPrice.type}`;
            const response = await getAllOrders(page, size, query);

            const ordersWithShipStatus = await Promise.all(
                response.result.items.map(async (item) => {
                    let status = "none";
                    if (item.ship_code) {
                        await getShipStatus(shopInfo.token, item.ship_code)
                            .then((res) => {
                                status = res.data.status;
                            })
                            .catch(() => {
                                status = "none";
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
        } finally {
            setLoading(false);
        }
    };
    const handleSortChange = (field) => {
        setFilter((prev) => {
            const nextSortIndex = prev[field].id % sortOptions.length;
            return { ...prev, [field]: sortOptions[nextSortIndex] };
        });
    };

    useEffect(() => {
        fetchApiShopInfo();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [
        shopInfo,
        filter.page,
        filter.size,
        filter.createAt,
        filter.status,
        filter.shipFee,
        filter.totalPrice,
        filter.code
    ]);

    const showOrderDetail = (id) => {
        const order = orders.find((order) => order.id === id);
        setIsOpenDetail(true);
        setOrder(order);
    };

    const handleCancelShip = async () => {
        setIsModalCancel(false);
        setChooseCode(null);
        await cancelShip(shopInfo.token, chooseCode)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Yêu cầu hủy vận chuyển thành công",
                    "Đơn hàng đã hủy yêu cầu ship với đơn vị vận chuyển"
                );
                fetchApiShopInfo();
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Yêu cầu hủy vận chuyển không thành công",
                    "Đơn hàng đã hủy yêu không thành công"
                );
            });
    };
    const handleSearch = () => {
        setFilter((prev) => ({ ...prev, page: 1, code: prev.inputCode }));
    };
    const clearSearch = () => {
        setFilter((prev) => ({ ...prev, page: 1, code: "", inputCode: "" }));
    };

    const columns = useMemo(
        () => [
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Mã {filter.code}</span>
                        <span>
                            <Tooltip title="search">
                                <Dropdown
                                    overlay={
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Input
                                                value={filter.inputCode}
                                                onChange={(e) =>
                                                    setFilter((prev) => ({
                                                        ...prev,
                                                        inputCode:
                                                            e.target.value
                                                    }))
                                                }
                                            />
                                            <div className="mt-2">
                                                <Button onClick={handleSearch}>
                                                    Search
                                                </Button>
                                                <Button
                                                    onClick={clearSearch}
                                                    className="ms-2"
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    trigger={["click"]}
                                    placement="bottomRight"
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<IoSearch />}
                                            />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Tooltip>
                        </span>
                    </div>
                ),
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
                title: (
                    <div className="d-flex">
                        <span className="me-3">Ngày tạo</span>
                        <span onClick={() => handleSortChange("createAt")}>
                            <filter.createAt.icon />
                        </span>
                    </div>
                ),
                dataIndex: "createAt",
                render: (t, r) => new Date(r.createAt).toLocaleString()
            },
            {
                title: "Người nhận",
                dataIndex: "receiverName"
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
                title: (
                    <div className="d-flex">
                        <span className="me-3">Giá ship</span>
                        <span onClick={() => handleSortChange("shipFee")}>
                            <filter.shipFee.icon />
                        </span>
                    </div>
                ),
                dataIndex: "shipFee",
                render: (shipFee) =>
                    shipFee && (
                        <>
                            <div className="d-flex">
                                <span>{parseMoneyFormat(shipFee)}</span>
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
                title: (
                    <div className="d-flex">
                        <span className="me-3">Tổng giá</span>
                        <span onClick={() => handleSortChange("totalPrice")}>
                            <filter.totalPrice.icon />
                        </span>
                    </div>
                ),
                dataIndex: "totalPrice",
                render: (totalPrice) =>
                    totalPrice && (
                        <>
                            <div className="d-flex">
                                {parseMoneyFormat(totalPrice)}
                            </div>
                        </>
                    )
            },
            {
                title: (
                    <div className="d-flex">
                        <span className="me-3">Số lượng</span>
                    </div>
                ),
                dataIndex: "quantity"
            },
            {
                title: (
                    <div>
                        <Dropdown
                            menu={menuProps}
                            trigger={["click"]}
                            placement="bottom"
                            className="text-black"
                        >
                            <span style={{ color: "red !important" }}>
                                <Space>
                                    {statusInfo[filter.status]?.label ||
                                        "Tất cả"}
                                    <DownOutlined />
                                </Space>
                            </span>
                        </Dropdown>
                    </div>
                ),
                dataIndex: "status",
                render: (t, r) =>
                    r.status ? (
                        <>
                            <Tag color={statusInfo[r.status]?.color}>
                                {statusInfo[r.status]?.label}
                            </Tag>
                            <Dropdown
                                menu={menuPropsForRow(r.id)}
                                trigger={["click"]}
                                placement="bottom"
                                className="text-black"
                            >
                                <span style={{ color: "red !important" }}>
                                    <Space>
                                        <IoMdMore />
                                    </Space>
                                </span>
                            </Dropdown>
                        </>
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
                                            setChooseCode(r.ship_code);
                                            setIsModalCancel(true);
                                        }}
                                    />
                                )}
                        </div>
                    </div>
                )
            }
        ],
        [filter]
    );
    const handlePageChange = (page) => {
        setFilter((prev) => ({
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
                to_name: order.receiverName,
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
                cod_amount: parseInt(order.totalPrice),
                content: "Đơn hàng nailbox thiết kế, thương hiệu NailLaBox",
                length: shopInfo.boxLength,
                width: shopInfo.boxWidth,
                height: shopInfo.boxHeight * order.quantity,
                weight: shopInfo.boxWeight * order.quantity,
                insurance_value: parseInt(order.totalPrice),
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
                    fetchApiShopInfo();
                })
                .catch((err) => {
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
                title="Dịch vụ giao hàng"
                open={isModalCancel}
                onOk={handleCancelShip}
                onCancel={() => setIsModalCancel(false)}
            >
                <p>Hủy vận chuyển đơn hàng</p>
            </Modal>

            <Modal
                title="Chi tiết đơn hàng"
                onCancel={handleCancelDetail}
                open={isOpenDetail}
                width={580}
            >
                {order &&
                    order?.items.map((item) => {
                        return <OrderItem key={item.productId} item={item} />;
                    })}
                {order && (
                    <>
                        <Divider />
                        <div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Sum:</strong>
                                <span className="fs-6 fw-medium">
                                    {order.coupon &&
                                        order.coupon.amount > 0 &&
                                        parseMoneyFormat(
                                            order.totalPrice /
                                                (1 - order.coupon.amount * 0.01)
                                        )}
                                    {(!order.coupon ||
                                        (order.coupon &&
                                            order.coupon.amount === 0)) &&
                                        parseMoneyFormat(order.totalPrice)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Ship fee:</strong>
                                <span className="fs-6 fw-medium">
                                    {parseMoneyFormat(order.shipFee)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Voucher:</strong>
                                <span className="fs-6 fw-medium">
                                    {order.coupon &&
                                        order.coupon.amount > 0 &&
                                        "- " +
                                            parseMoneyFormat(
                                                order.totalPrice *
                                                    (order.coupon.amount /
                                                        (100 -
                                                            order.coupon
                                                                .amount))
                                            )}

                                    {order.coupon &&
                                        order.coupon.type === 0 &&
                                        "- " +
                                            parseMoneyFormat(order.totalPrice)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong className="mt-2">Total:</strong>
                                <span className="fs-6 fw-medium">
                                    {order.coupon && order.coupon.type === 0
                                        ? parseMoneyFormat(order.totalPrice)
                                        : parseMoneyFormat(
                                              order.totalPrice + order.shipFee
                                          )}
                                    {/* amount == 0 mean have is free ship */}
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
                scroll={{ x: 1500, y: 650 }}
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
