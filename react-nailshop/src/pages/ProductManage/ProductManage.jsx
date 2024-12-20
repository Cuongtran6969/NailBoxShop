import ProductItem from "@productManagePages/productItem/ProductItem";
import {
    Button,
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

// api
import { getProduct } from "@/apis/productService";

const sortOptions = [
    { id: 1, type: "", icon: TiArrowUnsorted },
    { id: 2, type: "asc", icon: TiArrowSortedUp },
    { id: 3, type: "desc", icon: TiArrowSortedDown }
];

function ProductManage() {
    const [filters, setFilters] = useState({
        searchName: "",
        inputName: "",
        sortPrice: sortOptions[0],
        sortSold: sortOptions[0],
        sortStock: sortOptions[0],
        tags: []
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const handleSortChange = (field) => {
        setFilters((prev) => {
            const nextSortIndex = prev[field].id % sortOptions.length;
            return { ...prev, [field]: sortOptions[nextSortIndex] };
        });
    };
    const handleSearch = () => {
        setFilters((prev) => ({ ...prev, searchName: prev.inputName }));
    };
    const clearSearch = () => {
        setFilters((prev) => ({ ...prev, searchName: "", inputName: "" }));
    };

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, currentPage: page }));
    };

    const updateTags = (selectedTags) => {
        setFilters((prev) => ({ ...prev, tags: selectedTags }));
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { searchName, sortPrice, sortStock } = filters;
            const { currentPage } = pagination;

            let query = `name~'${searchName}'`;
            if (sortPrice.type) query += `&sort=price:${sortPrice.type}`;
            if (sortStock.type) query += `&sort=stock:${sortStock.type}`;
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 giây
            const response = await getProduct(currentPage, query);
            setProducts(response.result.items);
            setPagination((prev) => ({
                ...prev,
                totalItems: response.result.total
            }));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Tắt loading
        }
    };
    console.log("loading:" + loading);

    useEffect(() => {
        fetchProducts();
    }, [
        filters.searchName,
        filters.sortPrice,
        filters.sortStock,
        pagination.currentPage
    ]);

    // const items = [
    //     {
    //         key: "1",
    //         label: (
    //             <div onClick={(e) => e.stopPropagation()}>
    //                 <Input
    //                     value={currentInputName}
    //                     onChange={(e) => setCurrentInputName(e.target.value)}
    //                 />
    //                 <div className="mt-2">
    //                     <Button onClick={hanleSearchName}>Search</Button>
    //                     <Button onClick={hanleClearSearchName} className="ms-2">
    //                         Reset
    //                     </Button>
    //                 </div>
    //             </div>
    //         )
    //     }
    // ];
    const columns = useMemo(
        () => [
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
                                    overlay={
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Input
                                                value={filters.inputName}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        inputName:
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
                        <span onClick={() => handleSortChange("sortPrice")}>
                            <filters.sortPrice.icon />
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
                                handleChoose={updateTags}
                                checkedKeys={filters.tags}
                            />
                        </span>
                    </div>
                ),
                dataIndex: "categories",
                render: (categories) => (
                    <div className="d-flex">
                        {categories.map((category) => (
                            <Tag
                                key={category.name}
                                color={
                                    category.name.length > 10
                                        ? "geekblue"
                                        : "green"
                                }
                            >
                                {category.name.toUpperCase()}
                            </Tag>
                        ))}
                    </div>
                )
            },
            {
                title: (
                    <div className="d-flex justify-content-between">
                        <span>Sold</span>
                        <filters.sortSold.icon
                            onClick={() => handleSortChange("sortSold")}
                        />
                    </div>
                ),
                dataIndex: "sold"
            },
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Stock</span>
                        <filters.sortStock.icon
                            onClick={() => handleSortChange("sortStock")}
                        />
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
                                onClick={() =>
                                    console.log("Delete product: ", record.id)
                                }
                            />
                        </div>
                    </div>
                )
            }
        ],
        [filters]
    );

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys
    };

    return (
        <div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
                pagination={false}
                loading={loading}
            />
            <Pagination
                className="mt-3"
                current={pagination.currentPage}
                onChange={handlePageChange}
                pageSize={10}
                align="end"
                total={pagination.totalItems}
            />
        </div>
    );
}

export default ProductManage;
