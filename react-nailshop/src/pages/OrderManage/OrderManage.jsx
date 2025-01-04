import ProductItem from "@productManagePages/productItem/ProductItem";
import {
    Button,
    Checkbox,
    Dropdown,
    Form,
    Input,
    Pagination,
    Space,
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
// api
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { getAllOrders } from "@/apis/orderService";

const sortOptions = [
    { id: 1, type: "", icon: TiArrowUnsorted },
    { id: 2, type: "asc", icon: TiArrowSortedUp },
    { id: 3, type: "desc", icon: TiArrowSortedDown }
];
import styles from "./styles.module.scss";
const statusInfo = {
    PENDING: { label: "Chưa xử lý", color: "orange" },
    PAYMENT_SUCCESS: { label: "Đã thanh toán trước", color: "green" },
    PROCESSING: { label: "Đơn hàng đang xử lý", color: "blue" },
    CANCELLED: { label: "Đã hủy", color: "red" },
    COMPLETED: { label: "Hoàn thành", color: "volcano" }
};
function OrderManage({ onProductSelection = () => {}, initCheckList = [] }) {
    const navigate = useNavigate();
    const { table } = styles;
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({
        page: 1,
        size: 10,
        total: 1
    });

    console.log("initCheckList: " + initCheckList);

    // const handlePageChange = (page) => {
    //     setPagination((prev) => ({ ...prev, currentPage: page }));
    // };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getAllOrders();
            setOrders(
                response.result.items.map((item) => {
                    return {
                        key: item.id,
                        ...item
                    };
                })
            );
            setFilter((prev) => ({
                ...prev,
                total: response.result.total
            }));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Tắt loading
        }
    };
    console.log("loading:" + loading);

    useEffect(() => {
        fetchOrders();
    }, []);

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
                dataIndex: "code"
            },
            {
                title: "Địa chỉ",
                dataIndex: "address"
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
                dataIndex: "status"
            },
            {
                title: "shipper lấy hàng",
                dataIndex: "status"
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

    return (
        <div>
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
