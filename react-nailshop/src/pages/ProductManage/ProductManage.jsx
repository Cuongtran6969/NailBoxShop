import ProductItem from "@productManagePages/productItem/ProductItem";
import {
    Button,
    Dropdown,
    Form,
    Input,
    Space,
    Table,
    Tag,
    Tooltip
} from "antd";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import CateFilter from "@components/CateFilter/CateFilter";

// api

import { getProduct } from "@/apis/productService";

const sortType = [
    {
        id: 1,
        type: "",
        icon: TiArrowUnsorted
    },
    {
        id: 2,
        type: "asc",
        icon: TiArrowSortedUp
    },
    {
        id: 3,
        type: "desc",
        icon: TiArrowSortedDown
    }
];
const items = [
    {
        key: "1",
        label: (
            <div onClick={(e) => e.stopPropagation()}>
                <Input />
                <div className="mt-2">
                    <Button>Search</Button>
                    <Button className="ms-2">Reset</Button>
                </div>
            </div>
        )
    }
];
function ProductManage() {
    const [currentSortPrice, setCurrentSortPrice] = useState(sortType[0]);
    const [currentSortSold, setCurrentSortSold] = useState(sortType[0]);
    const [currentSortStock, setCurrentSortStock] = useState(sortType[0]);
    const [tags, setTags] = useState([]);

    const [listProducts, setListProducts] = useState([]);

    const handleSortPriceClick = () => {
        const nextSortIndex = currentSortPrice.id % sortType.length;
        setCurrentSortPrice(sortType[nextSortIndex]);
    };
    const handleSortSoldClick = () => {
        const nextSortIndex = currentSortSold.id % sortType.length;
        setCurrentSortSold(sortType[nextSortIndex]);
    };
    const handleSortStockClick = () => {
        const nextSortIndex = currentSortStock.id % sortType.length;
        setCurrentSortStock(sortType[nextSortIndex]);
    };
    const handleTag = (value) => {
        setTags([...value]);
    };
    const columns = [
        {
            title: "Id",
            dataIndex: "id"
        },
        {
            title: (
                <div className="d-flex justify-content-between align-items-center">
                    <span>Name</span>
                    <span>
                        <Tooltip title="search">
                            <Dropdown
                                menu={{
                                    items
                                }}
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
            dataIndex: "name",
            render: (t, r) => (
                <div className="d-flex">
                    <div>
                        <img
                            src={r.pictures.split(",")[0]}
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
            title: (
                <div className="d-flex justify-content-between align-items-center">
                    <span>Price</span>
                    <span onClick={handleSortPriceClick}>
                        <currentSortPrice.icon />
                    </span>
                </div>
            ),
            dataIndex: "price"
        },
        {
            title: (
                <div className="d-flex justify-content-between align-items-center">
                    <span>Category</span>
                    <span>
                        <CateFilter
                            handleChoose={handleTag}
                            checkedKeys={tags}
                        />
                    </span>
                </div>
            ),
            dataIndex: "cate",
            render: (t, r) => {
                let tags = r.categories;
                return (
                    <div className="d-flex">
                        {tags.map((tag) => {
                            let color =
                                tag.name.length > 10 ? "geekblue" : "green";
                            if (tag === "loser") {
                                color = "volcano";
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.name.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </div>
                );
            }
        },
        {
            title: (
                <div className="d-flex justify-content-between">
                    <span>Sold</span>
                    <span onClick={handleSortSoldClick}>
                        <currentSortSold.icon />
                    </span>
                </div>
            ),
            dataIndex: "sold"
        },
        {
            title: (
                <div className="d-flex justify-content-between align-items-center">
                    <span>Stock</span>
                    <span onClick={handleSortStockClick}>
                        <currentSortStock.icon />
                    </span>
                </div>
            ),
            dataIndex: "stock"
        },
        {
            title: "Setting",
            dataIndex: "stock",
            render: (t, r) => (
                <div className="d-flex">
                    <div>
                        <GoPencil
                            className="fs-5"
                            onClick={() => handleDeleteProduct(r.id)}
                        />
                    </div>
                </div>
            )
        }
    ];
    const handleDeleteProduct = (id) => {
        console.log("delete:" + id);
    };
    // const dataSource = [
    //     {
    //         key: 1,
    //         id: 1,
    //         image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
    //         name: `Edward King `,
    //         price: 32000,
    //         sold: 200,
    //         stock: 20,
    //         createAt: "2024-12-14 18:13:20.375071",
    //         categories: [
    //             {
    //                 id: 1,
    //                 name: "sang Chảnh"
    //             },
    //             {
    //                 id: 2,
    //                 name: "cute"
    //             }
    //         ]
    //     },
    //     {
    //         key: 2,
    //         id: 2,
    //         image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
    //         name: `Edward King `,
    //         price: 32000,
    //         sold: 120,
    //         stock: 25,
    //         createAt: "2024-12-14 18:13:20.375071",
    //         categories: [
    //             {
    //                 id: 1,
    //                 name: "sang Chảnh"
    //             },
    //             {
    //                 id: 2,
    //                 name: "hộp các móng tay giả"
    //             }
    //         ]
    //     },
    //     {
    //         key: 3,
    //         id: 3,
    //         image: "https://nailboxxinh.com/wp-content/uploads/2024/10/son-nail-don-gian-den-bac-1-600x600.webp",
    //         name: `Edward King `,
    //         price: 32000,
    //         sold: 480,
    //         stock: 12,
    //         createAt: "2024-12-14 18:13:20.375071",
    //         categories: [
    //             {
    //                 id: 1,
    //                 name: "sang Chảnh"
    //             },
    //             {
    //                 id: 2,
    //                 name: "giáng sinh"
    //             },
    //             { id: 3, name: "phụ kiện" }
    //         ]
    //     }
    // ];

    useEffect(() => {
        getProduct().then((res) => {
            setListProducts(res.result.items);
            // console.log(res);
        });
    }, []);

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
                dataSource={listProducts}
            />
            {/* <ProductItem /> */}
        </div>
    );
}

export default ProductManage;
