import ProductItem from "@productManagePages/productItem/ProductItem";
import { Table } from "antd";
import { useState } from "react";

function ProductManage() {
    const columns = [
        {
            title: "Id",
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (t, r) => (
                <div className="d-flex">
                    <div>
                        <img
                            src={r.image}
                            style={{ width: "50px", height: "50px" }}
                            alt=""
                        />
                    </div>
                    <div className="ms-2">
                        <div className="fw-medium">{r.name}</div>
                        <p className="text-secondary">{r.createAt}</p>
                    </div>
                </div>
            )
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Sold",
            dataIndex: "sold"
        },
        {
            title: "Stock",
            dataIndex: "stock"
        }
    ];
    const dataSource = [
        {
            key: 1,
            id: 1,
            image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
            name: `Edward King `,
            price: 32000,
            sold: 200,
            stock: 20,
            createAt: "2024-12-14 18:13:20.375071"
        },
        {
            key: 2,
            id: 2,
            image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
            name: `Edward King `,
            price: 32000,
            sold: 120,
            stock: 25,
            createAt: "2024-12-14 18:13:20.375071"
        },
        {
            key: 3,
            id: 3,
            image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
            name: `Edward King `,
            price: 32000,
            sold: 480,
            stock: 12,
            createAt: "2024-12-14 18:13:20.375071"
        }
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
            />
            {/* <ProductItem /> */}
        </div>
    );
}

export default ProductManage;
