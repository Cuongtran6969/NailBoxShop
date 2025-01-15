import { getPosts, deletePost } from "@/apis/postService";
import { Pagination, Table, notification, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsTrash3 } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
function PostManagePage() {
    const { container } = styles;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chooseId, setChooseId] = useState(null);
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const [filter, setFilter] = useState({
        page: 1,
        size: 10,
        title: "",
        total: 10
    });

    const handleGetPosts = async () => {
        setLoading(true);
        await getPosts(filter.page, filter.size, filter.title)
            .then((res) => {
                console.log(res);
                setFilter((prev) => ({
                    ...prev,
                    page: res.result.page,
                    size: res.result.size,
                    total: res.result.total
                }));
                setPosts(res.result.items);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    };

    const handleDeletePost = async () => {
        if (chooseId) {
            setIsModalOpen(false);
            setLoading(true);
            await deletePost(chooseId)
                .then((res) => {
                    openNotificationWithIcon(
                        "success",
                        "Xóa post",
                        "Xóa post thành công"
                    );
                    handleGetPosts();
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        "error",
                        "Xóa post",
                        "Xóa post thất bại"
                    );
                });
            setLoading(false);
        }
    };
    useEffect(() => {
        handleGetPosts();
    }, []);

    const columns = useMemo(
        () => [
            {
                title: "Ảnh",
                key: "1",
                dataIndex: "image",
                render: (image) => (
                    <div className="d-flex">
                        <img
                            src={image}
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "5px"
                            }}
                        />
                    </div>
                )
            },
            {
                title: "Tiêu đề",
                key: "2",
                dataIndex: "title"
            },
            {
                title: "Mô tả",
                key: "3",
                dataIndex: "description",
                render: (description) => (
                    <div className="d-flex">
                        <span>
                            {description && description.slice(0, 25)}...
                        </span>
                    </div>
                )
            },
            {
                title: "Ngày tạo",
                key: "4",
                dataIndex: "createAt",
                render: (createAt) => (
                    <div className="d-flex">
                        {createAt ? new Date(createAt).toLocaleString() : ""}
                    </div>
                )
            },
            {
                title: "Setting",
                key: "5",
                dataIndex: "",
                render: (t, r) => (
                    <div className="d-flex">
                        <HiOutlinePencilSquare
                            // onClick={() => handleDeletePost(r.id)}
                            fontSize={20}
                            className="me-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/admin/post/edit/${r.id}`)}
                        />
                        <BsTrash3
                            onClick={() => {
                                setChooseId(r.id);
                                setIsModalOpen(true);
                            }}
                            fontSize={20}
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                )
            }
        ],
        [filter]
    );
    const hanleCancelModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            {contextHolder}
            <Modal
                title="Xóa post"
                open={isModalOpen}
                onOk={handleDeletePost}
                onCancel={hanleCancelModal}
            >
                <p>Bạn có chăc chắn muốn xóa post này</p>
            </Modal>
            <div className={container}>
                <Table
                    // rowSelection={rowSelection}
                    rowKey="id"
                    columns={columns}
                    dataSource={posts}
                    pagination={false}
                    loading={loading}
                    scroll={{ x: 1500, y: 650 }}
                />
            </div>
            <Pagination
                className="mt-3"
                current={filter.page}
                onChange={() => {}}
                pageSize={filter.size}
                align="end"
                total={filter.total}
            />
        </div>
    );
}

export default PostManagePage;
