import {
    Input,
    Pagination,
    Switch,
    Table,
    Popconfirm,
    Modal,
    notification
} from "antd";
const { Search } = Input;
import { useEffect, useMemo, useState } from "react";
import {
    searchCampaign,
    deleteCampaign,
    updateCampaignStatus
} from "@/apis/campaignService";
import { MdOutlineModeEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const LocalizedModal = () => {
    return;
};
function CampaignManage() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        totalPage: 0
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const showModal = (campaignId) => {
        setSelectedCampaignId(campaignId); // Lưu ID của chiến dịch
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            const res = await deleteCampaign(selectedCampaignId);
            setIsModalOpen(false);
            openNotificationWithIcon("success", "Xoá thành công", res.message);
            fetchCampaigns();
        } catch (error) {
            console.error("Error deleting campaign:", error);
            openNotificationWithIcon("error", "Xoá thất bại", error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedCampaignId(null);
    };

    const handleChangeStatus = async (campaignId, currentStatus) => {
        setLoading(true);
        try {
            // Gọi API để cập nhật trạng thái
            const formData = {
                id: campaignId,
                status: !currentStatus
            };
            const res = await updateCampaignStatus(formData);
            openNotificationWithIcon(
                "success",
                "Thay đổi trạng thái thành công",
                res.message
            );
            fetchCampaigns();
        } catch (error) {
            console.error("Error updating status:", error);
            openNotificationWithIcon(
                "error",
                "Lỗi",
                "Thay đổi trạng thái thất bại"
            );
        } finally {
            setLoading(false);
        }
    };

    const columns = useMemo(
        () => [
            {
                title: "Mã",
                dataIndex: "id"
            },
            {
                title: "Tên",
                dataIndex: "name"
            },
            {
                title: "Mô tả",
                dataIndex: "description"
            },
            {
                title: "Bắt đầu",
                dataIndex: "startTime",
                render: (t, r) => new Date(r.startTime).toLocaleString()
            },
            {
                title: "Kết thúc",
                dataIndex: "endTime",
                render: (t, r) => new Date(r.endTime).toLocaleString()
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
                render: (t, r) => (
                    <div className="d-flex">
                        <Popconfirm
                            placement="topRight"
                            title={
                                r.status
                                    ? "Tắt chiến dịch này?"
                                    : "Bật chiến dịch này?"
                            }
                            description={`Bạn có chắc chắn muốn ${
                                r.status ? "tắt" : "bật"
                            } chiến dịch này không?`}
                            onConfirm={() => handleChangeStatus(r.id, r.status)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Switch checked={r.status} loading={loading} />
                        </Popconfirm>
                    </div>
                )
            },
            {
                title: "Sản phẩm",
                dataIndex: "numberProduct"
            },
            {
                title: "Cài đặt",
                dataIndex: "setting",
                render: (t, r) => (
                    <div className="d-flex justify-content-between">
                        <span className="fs-5">
                            <MdOutlineModeEdit
                                onClick={() =>
                                    navigate(`/admin/campaigns/update/${r.id}`)
                                }
                            />
                        </span>
                        <sapn className="text-danger fs-5">
                            <GoTrash onClick={() => showModal(r.id)} />
                        </sapn>
                    </div>
                )
            }
        ],
        []
    );
    const onSearch = () => {
        setSearchValue(keyword);
        setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset về trang đầu khi search
    };
    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, currentPage: page }));
    };
    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 2 giây
            const res = await searchCampaign(
                pagination.currentPage,
                searchValue
            );
            setCampaigns(res.result.items);
            setPagination((prev) => ({
                ...prev,
                totalItems: res.result.total,
                totalPage: res.result.totalPages
            }));
        } catch (error) {}
        setLoading(false);
    };
    useEffect(() => {
        fetchCampaigns();
    }, [searchValue, pagination.currentPage]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Bạn muốn xóa chiến dịch này"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Chiến dịch này sẽ được xóa</p>
            </Modal>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 200
                }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <div>
                <Table
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={campaigns}
                    pagination={false}
                    loading={loading}
                />
                <Pagination
                    className="mt-3"
                    current={pagination.currentPage}
                    onChange={handlePageChange}
                    pageSize={pagination.totalPage}
                    align="end"
                    total={pagination.totalItems}
                />
            </div>
        </>
    );
}

export default CampaignManage;
