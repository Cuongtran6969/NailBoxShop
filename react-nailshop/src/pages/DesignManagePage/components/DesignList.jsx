import { Pagination, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getNailDesign } from "@/apis/nailDesignService";
import { calc } from "antd/es/theme/internal";
function DesignList() {
    const [design, setDesign] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        total: 1
    });
    useEffect(() => {
        setLoading(true);
        getNailDesign("", pagination.currentPage, pagination.pageSize)
            .then((res) => {
                setDesign(res.result.items);
                setPagination((prev) => ({
                    ...prev,
                    currentPage: res.page,
                    pageSize: res.size,
                    total: res.total
                }));
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }, []);
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
                width: "10%"
            }
        ],
        []
    );

    return (
        <div>
            <Table
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={design}
                pagination={false}
                loading={loading}
                scroll={{ x: 1000, y: 200 }}
            />
            <Pagination
                className="mt-3"
                current={pagination.currentPage}
                pageSize={10}
                align="end"
                total={pagination.total}
            />
        </div>
    );
}

export default DesignList;
