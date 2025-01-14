import {
    Button,
    Dropdown,
    Form,
    Input,
    Pagination,
    Space,
    Switch,
    Table,
    message,
    Tooltip,
    Spin
} from "antd";
const { Search } = Input;
import { useEffect, useMemo, useState } from "react";
import { getUsers, banUser, unBanUser } from "@/apis/userService";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UserManagerPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        keyword: ""
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0
    });
    const EnableUser = async (id, checked) => {
        setLoading(true);
        try {
            let res;
            if (checked) {
                res = await unBanUser(id); // Chờ kết quả từ Promise
            } else {
                res = await banUser(id); // Chờ kết quả từ Promise
            }
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, enabled: checked } : user
                )
            );
            message.success(res); // Hiển thị kết quả trả về
        } catch (error) {
            message.error(error.message || "Something went wrong"); // Xử lý lỗi
        } finally {
            console.log(`switch to ${checked}`);
            setLoading(false); // Dừng trạng thái loading
        }
    };

    const columns = useMemo(
        () => [
            {
                title: "Id",
                dataIndex: "id"
            },
            {
                title: "Avatar",
                dataIndex: "avatar",
                render: (t, r) => (
                    <div className="d-flex">
                        <img
                            src={r.avatar}
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%"
                            }}
                            alt=""
                        />
                    </div>
                )
            },
            {
                title: "Name",
                dataIndex: "name"
            },
            {
                title: "Email",
                dataIndex: "email"
            },
            {
                title: "Phone",
                dataIndex: "phone"
            },
            {
                title: "Enabled",
                dataIndex: "enabled",
                render: (t, r) => (
                    <div className="d-flex">
                        {r.enabled ? (
                            <Switch
                                defaultChecked
                                onChange={() => EnableUser(r.id, false)}
                            />
                        ) : (
                            <Switch onChange={() => EnableUser(r.id, true)} />
                        )}
                    </div>
                )
            },
            {
                title: "Role",
                dataIndex: "role",
                render: (t, r) => r.role.name
            },
            {
                title: "Setting",
                dataIndex: "",
                render: (t, r) => (
                    <div className="">
                        <MdOutlineEdit
                            fontSize={22}
                            onClick={() => navigate(`edit/${r.id}`)}
                        />
                    </div>
                )
            }
        ],
        [filters]
    );
    const onSearch = (value) => {
        setKeyword(value);
    };
    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, currentPage: page }));
    };
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getUsers(pagination.currentPage, keyword);
            setUsers(res.result.items);
            setPagination((prev) => ({
                ...prev,
                totalItems: res.result.total
            }));
        } catch (error) {}
        setLoading(false);
    };
    useEffect(() => {
        fetchProducts();
    }, [keyword, pagination.currentPage]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys
    };
    console.log(pagination);
    if (loading) {
        return <Spin tip="Loading..." />;
    }
    return (
        <>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 200
                }}
            />
            <div>
                <Table
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={users}
                    pagination={false}
                    // loading={loading}
                />
                <Pagination
                    className="mt-3"
                    current={pagination.currentPage}
                    onChange={handlePageChange}
                    pageSize={3}
                    align="end"
                    total={pagination.totalItems}
                />
            </div>
        </>
    );
}

export default UserManagerPage;
