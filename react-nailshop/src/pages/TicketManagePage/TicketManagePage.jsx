import {
    Button,
    Checkbox,
    Dropdown,
    Form,
    Input,
    Modal,
    Pagination,
    notification,
    Table,
    Space,
    Tooltip
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { GoPencil } from "react-icons/go";
import { BsTrash3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { getAllVoucher, deleteVoucher } from "@/apis/voucherService";

const sortOptions = [
    { id: 1, type: "", icon: TiArrowUnsorted },
    { id: 2, type: "asc", icon: TiArrowSortedUp },
    { id: 3, type: "desc", icon: TiArrowSortedDown }
];
function TicketManagePage() {
    const [filters, setFilters] = useState({
        startTime: sortOptions[0],
        endTime: sortOptions[0],
        amount: sortOptions[0],
        page: 1,
        size: 10,
        total: 10,
        type: ""
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [chooseId, setChooseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSortChange = (field) => {
        setFilters((prev) => {
            const nextSortIndex = prev[field].id % sortOptions.length;
            return { ...prev, [field]: sortOptions[nextSortIndex] };
        });
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page: page }));
    };

    const fetchVouchers = async () => {
        setLoading(true);
        try {
            let orderBy = "";
            let query = "";
            const { startTime, endTime, amount, page, size, type } = filters;
            if (startTime.type) orderBy += `&sort=startTime:${startTime.type}`;
            if (endTime.type) orderBy += `&sort=endTime:${endTime.type}`;
            if (amount.type) orderBy += `&sort=amount:${amount.type}`;
            if (type) query += `&filter=type:'${type}'`;
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 giây
            const response = await getAllVoucher(page, size, orderBy, query);

            setTickets(
                response.result.items.map((item) => {
                    return {
                        key: item.id,
                        ...item
                    };
                })
            );
            setFilters((prev) => ({
                ...prev,
                page: response.result.page,
                size: response.result.size,
                total: response.result.total
            }));
        } catch (error) {
            console.error("Error fetching ticket:", error);
        } finally {
            setLoading(false); // Tắt loading
        }
    };
    console.log("loading:" + loading);

    useEffect(() => {
        fetchVouchers();
    }, [
        filters.startTime,
        filters.endTime,
        filters.amount,
        filters.type,
        filters.page
    ]);
    const items = [
        {
            label: <a>Tất cả</a>,
            key: ""
        },
        {
            label: <a>Giảm giá</a>,
            key: "DISCOUNT"
        },
        {
            label: <a>Miễn phí vận chuyển</a>,
            key: "FREE_SHIP"
        }
    ];
    const handleMenuClick = (e) => {
        setFilters((prev) => ({
            ...prev,
            type: e.key
        }));
    };
    const menuProps = {
        items,
        onClick: handleMenuClick
    };
    const columns = useMemo(
        () => [
            {
                title: "Mã",
                dataIndex: "code"
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
                                    Thể loại {filters.type || "Tất cả"}
                                    <DownOutlined />
                                </Space>
                            </span>
                        </Dropdown>
                    </div>
                ),
                dataIndex: "type"
            },
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Giá trị</span>
                        <filters.amount.icon
                            onClick={() => handleSortChange("amount")}
                        />
                    </div>
                ),
                dataIndex: "amount"
            },
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Bắt đầu</span>
                        <filters.startTime.icon
                            onClick={() => handleSortChange("startTime")}
                        />
                    </div>
                ),
                dataIndex: "startTime",
                render: (startTime) => {
                    return new Date(startTime).toLocaleString();
                }
            },
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Kết thúc</span>
                        <filters.endTime.icon
                            onClick={() => handleSortChange("endTime")}
                        />
                    </div>
                ),
                dataIndex: "endTime",
                render: (endTime) => {
                    return new Date(endTime).toLocaleString();
                }
            },
            {
                title: "Tình trạng",
                dataIndex: "isUsed",
                render: (t, r) => {
                    {
                        return r.isUsed ? (
                            <span className="text-danger">Hết lượt</span>
                        ) : (
                            <span className="text-success">Còn lượt</span>
                        );
                    }
                }
            },
            {
                title: "Cài đặt",
                dataIndex: "id",
                render: (t, r) => {
                    return r.isUsed ? (
                        <></>
                    ) : (
                        <BsTrash3
                            onClick={() => {
                                setChooseId(r.id);
                                setIsModalOpen(true);
                            }}
                            fontSize={20}
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                        />
                    );
                }
            }
        ],
        [filters.endTime, filters.startTime, filters.amount, filters.type]
    );
    const hanleCancelModal = () => {
        setIsModalOpen(false);
    };
    const handleDeletePost = async () => {
        if (chooseId) {
            setIsModalOpen(false);
            setLoading(true);
            await deleteVoucher(chooseId)
                .then((res) => {
                    console.log(res.code);

                    if (res.code == 200) {
                        openNotificationWithIcon(
                            "success",
                            "Xóa ticket",
                            "Xóa ticket thành công"
                        );
                        fetchVouchers();
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "Xóa ticket",
                            "Xóa ticket thất bại"
                        );
                    }
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        "error",
                        "Xóa ticket",
                        "Xóa ticket thất bại"
                    );
                });
            setLoading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <Modal
                title="Xóa Ticket"
                open={isModalOpen}
                onOk={handleDeletePost}
                onCancel={hanleCancelModal}
            >
                <p>Bạn có chăc chắn muốn xóa ticket này</p>
            </Modal>
            <Table
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={tickets}
                pagination={false}
                loading={loading}
            />
            <Pagination
                className="mt-3"
                current={filters.page}
                onChange={handlePageChange}
                pageSize={filters.size}
                align="end"
                total={filters.total}
            />
        </div>
    );
}

export default TicketManagePage;
