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
import { getProduct } from "@/apis/productService";

const sortOptions = [
    { id: 1, type: "", icon: TiArrowUnsorted },
    { id: 2, type: "asc", icon: TiArrowSortedUp },
    { id: 3, type: "desc", icon: TiArrowSortedDown }
];
function ProductManage({
    onProductSelection = () => {},
    initCheckList = [],
    initProduct
}) {
    const navigate = useNavigate();
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
    console.log("initCheckList: " + initCheckList);

    const [checkedList, setCheckedList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(initProduct ?? []);

    const handleSortChange = (field) => {
        setFilters((prev) => {
            const nextSortIndex = prev[field].id % sortOptions.length;
            return { ...prev, [field]: sortOptions[nextSortIndex] };
        });
    };
    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        setFilters((prev) => ({ ...prev, searchName: prev.inputName }));
    };
    const clearSearch = () => {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
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
            setProducts(
                response.result.items.map((item) => {
                    return {
                        key: item.id,
                        ...item
                    };
                })
            );
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
        if (!initProduct) {
            fetchProducts();
        }
    }, [
        filters.searchName,
        filters.sortPrice,
        filters.sortStock,
        pagination.currentPage
    ]);
    useEffect(() => {
        onProductSelection(checkedList); // Send selected product IDs back to parent
    }, [checkedList]);
    useEffect(() => {
        if (initCheckList && initCheckList.length > 0) {
            setCheckedList(initCheckList);
        }
    }, [initCheckList]);
    const onCheckChange = (e, id) => {
        console.log(e.target.checked);
        if (e.target.checked) {
            setCheckedList((prev) => [...prev, id]);
        } else {
            setCheckedList((prev) => prev.filter((item) => item != id));
        }
    };
    const checkAll = () => {
        console.log("Aaaaa");
        console.log("in checkAll = checkedList: " + checkedList);
        if (checkedList.length === 0) return false;
        return products.every((product) => checkedList.includes(product.id));
    };
    const haveCheck = () => {
        console.log("Bbbbb");
        console.log("in haveCheck = checkedList: " + checkedList);

        if (checkedList.length === 0) return false;
        return products.some((product) => checkedList.includes(product.id));
    };

    const onCheckAllChange = (e) => {
        console.log("select change to: " + e.target.checked);
        if (e.target.checked) {
            //da check full
            console.log("herere 1");

            setCheckedList((prev) => [
                ...prev,
                ...products
                    .map((product) => product.id)
                    .filter((id) => !prev.includes(id))
            ]);
        } else {
            console.log("here 2");
            setCheckedList((prev) =>
                prev.filter(
                    (id) => !products.some((product) => product.id === id)
                )
            );
        }
    };

    console.log("checkedList.length" + checkedList.length);
    console.log("checkAll()" + checkAll());
    console.log("indeterminate()" + haveCheck());
    const columns = useMemo(
        () => [
            {
                title: (
                    <div className="d-flex">
                        <Checkbox
                            indeterminate={haveCheck() && !checkAll()}
                            onChange={(e) => onCheckAllChange(e)}
                            checked={checkAll()}
                        />
                    </div>
                ),
                dataIndex: "",
                render: (t, r) => (
                    <div className="d-flex">
                        <Checkbox
                            onChange={(e) => onCheckChange(e, r.id)}
                            checked={checkedList.includes(r.id)}
                        />
                    </div>
                )
            },
            {
                title: "Mã",
                dataIndex: "id"
            },
            {
                title: (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Tên</span>
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
                            <p className="text-secondary">
                                {r.createAt
                                    ? new Date(r.createAt).toLocaleString()
                                    : "N/A"}
                            </p>
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
                        <span>Thể loại</span>
                        {/* <span>
                            <CateFilter
                                handleChoose={updateTags}
                                checkedKeys={filters.tags}
                            />
                        </span> */}
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
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Đã bán</span>
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
                        <span>Còn hàng</span>
                        <filters.sortStock.icon
                            onClick={() => handleSortChange("sortStock")}
                        />
                    </div>
                ),
                dataIndex: "stock"
            },
            {
                title: "Cài đặt",
                dataIndex: "stock",
                render: (t, r) => (
                    <div className="d-flex">
                        <div>
                            <GoPencil
                                className="fs-5"
                                onClick={() =>
                                    navigate(`/admin/product/detail/${r.id}`)
                                }
                            />
                        </div>
                    </div>
                )
            }
        ],
        [filters, checkedList, pagination.currentPage, products]
    );

    return (
        <div>
            <Table
                // rowSelection={rowSelection}
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
