import { Modal, Pagination, Table, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
    getNailDesign,
    deleteNailDesignTemplate
} from "@/apis/nailDesignService";
import { IoTrashOutline } from "react-icons/io5";

function DesignList({ change }) {
    const [design, setDesign] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chooseId, setChooseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        total: 1
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };

    const fecthApiGetAll = () => {
        let currentPage = pagination.currentPage ?? 1;
        let pageSize = pagination.pageSize ?? 10;

        getNailDesign("", currentPage, pageSize)
            .then((res) => {
                setDesign(res.result.items);
                setPagination((prev) => ({
                    ...prev,
                    currentPage: res.result.page,
                    pageSize: res.result.size,
                    total: res.result.total
                }));
            })

            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        setLoading(true);
        fecthApiGetAll();
        setLoading(false);
    }, [change, pagination.currentPage]);

    const columns = useMemo(
        () => [
            {
                title: "Ảnh",
                dataIndex: "images",
                render(images) {
                    return (
                        <img
                            src={images.split(",")[0]}
                            style={{ width: "90px" }}
                        />
                    );
                },
                width: "20%"
            },
            {
                title: "Tên",
                dataIndex: "name",
                width: "10%"
            },
            {
                title: "Thể loại",
                dataIndex: "cate",
                render(cate) {
                    return <>{cate.name}</>;
                },
                width: "10%"
            },
            {
                title: "danh sách",
                dataIndex: "images",
                render(images) {
                    return (
                        <div className="d-flex">
                            {images
                                .split(",")
                                .slice(1)
                                .map((image) => {
                                    return (
                                        <img
                                            src={image}
                                            style={{ width: "60px" }}
                                        />
                                    );
                                })}
                        </div>
                    );
                },
                width: "60%"
            },
            {
                title: "Setting",
                dataIndex: "delete",
                render(t, r) {
                    return (
                        <span
                            onClick={() => {
                                setChooseId(r.id);
                                setIsModalOpen(true);
                            }}
                            className="text-danger fs-4"
                            style={{ cursor: "pointer" }}
                        >
                            <IoTrashOutline />
                        </span>
                    );
                },
                width: "10%"
            }
        ],
        []
    );

    const hanleCancelModal = () => {
        setIsModalOpen(false);
    };
    const handlePageChange = (page) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: page
        }));
    };
    const handleDeleteTemplate = async () => {
        if (chooseId) {
            setIsModalOpen(false);
            setLoading(true);
            await deleteNailDesignTemplate(chooseId)
                .then((res) => {
                    console.log(res.code);

                    if (res.code == 200) {
                        openNotificationWithIcon(
                            "success",
                            "Xóa design template",
                            "Xóa design thành công"
                        );
                        fecthApiGetAll();
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "Xóa design template",
                            "Xóa design thất bại"
                        );
                    }
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        "error",
                        "Xóa design template",
                        "Xóa design thất bại"
                    );
                });
            setLoading(false);
        }
    };
    return (
        <div>
            <Modal
                title="Xóa design template"
                open={isModalOpen}
                onOk={handleDeleteTemplate}
                onCancel={hanleCancelModal}
            >
                <p>Bạn có chăc chắn muốn xóa design template này</p>
            </Modal>
            {contextHolder}
            <Table
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={design}
                pagination={false}
                loading={loading}
                scroll={{ x: 1000, y: 350 }}
            />
            <Pagination
                className="mt-3"
                current={pagination.currentPage}
                pageSize={10}
                onChange={handlePageChange}
                align="end"
                total={pagination.total}
            />
        </div>
    );
}

export default DesignList;
