import CateFilter from "@components/CateFilter/CateFilter";
import { Container, Col, Row } from "react-bootstrap";
import ProductSuggest from "@components/ProductSuggest/ProductSuggest";
import ProductItem from "@components/ProductItem/ProductItem";
import FilterBox from "@components/FilterBox/FilterBox";
import { Pagination, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { getProductPublic } from "@/apis/productService";
import { HeaderSearchContext } from "@contexts/HeaderSearchProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
function SearchPage() {
    const location = useLocation();
    console.log(location.state?.categoryId);
    const [tags, setTags] = useState(() => {
        return location.state?.id
            ? [{ id: location.state.id, name: location.state.name }]
            : [];
    });
    console.log(tags);

    const [loading, setLoading] = useState(true);
    const { keyword, setKeyword } = useContext(HeaderSearchContext);
    const [searchData, setSearchData] = useState({
        keyword: keyword,
        page: 1,
        orderBy: location.state?.orderBy || "",
        size: 10
    });
    const [data, setData] = useState(null);
    const { cardSketelon } = styles;
    const [categories, setCategories] = useState([]);
    const renderSkeletons = () => (
        <Row className="gx-3 gy-4">
            <Col className="col-12">
                <div className="text-end mt-3">
                    <Skeleton width="40%" height={30} />
                </div>
            </Col>
            <Col md={3} className="col-12">
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
                <Skeleton
                    width="80%"
                    height={500}
                    style={{ marginTop: "30px" }}
                />
                <Skeleton width="80%" style={{ marginTop: "10px" }} />
            </Col>
            <Col md={9} className="col-12">
                <Row className="gx-3 gy-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={cardSketelon}>
                            <Skeleton height={200} />
                            <Skeleton count={4} style={{ marginTop: "10px" }} />
                            <Skeleton
                                width="20%"
                                style={{ marginTop: "10px" }}
                            />
                        </div>
                    ))}
                </Row>
            </Col>
        </Row>
    );
    const handleChoose = (checkedKeys) => {
        // Cập nhật tags với cả id và name
        const updatedTags = checkedKeys.map((id) => {
            const category = categories.find((cate) => cate.id === id);
            return { id, name: category?.name || id };
        });
        setTags(updatedTags);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setSearchData((prevData) => ({
            ...prevData,
            keyword: keyword,
            page: 1
        }));
    }, [keyword]);

    useEffect(() => {
        const fetchApiGetProduct = async () => {
            let filterQuery = "";

            if (tags.length > 0) {
                filterQuery += `(`;
                filterQuery += tags
                    .map((tag) => `categories:'${tag.id}'`)
                    .join(" or ");
                filterQuery += `)`;
            }
            if (searchData.keyword) {
                filterQuery += `&name~'${searchData.keyword}'`;
            }
            setLoading(true);
            await getProductPublic(
                searchData.page,
                searchData.size,
                filterQuery,
                searchData.orderBy
            )
                .then((res) => {
                    console.log(res);
                    setData(res.result);
                })
                .catch((err) => {});
            setLoading(false);
        };
        fetchApiGetProduct();
    }, [
        searchData.keyword,
        searchData.page,
        searchData.size,
        searchData.orderBy,
        tags.length
    ]);

    const forMap = (tag) => (
        <span key={tag}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag.name}
            </Tag>
        </span>
    );
    const tagChild = tags.map(forMap);

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const onChange = (page) => {
        setSearchData((prev) => ({
            ...prev,
            page: page
        }));
    };

    return (
        <Container>
            {loading ? (
                renderSkeletons()
            ) : (
                <Row>
                    <Col sm={12}>
                        <div>
                            <p className="fs-4 text-center">
                                {searchData.keyword.length > 0 &&
                                    `Kết quả tìm kiếm: “${searchData.keyword}”`}
                            </p>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <div>
                            <div
                                style={{
                                    marginBottom: 16,
                                    textAlign: "center"
                                }}
                            >
                                {tagChild}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} className="mb-4">
                        <div className="d-flex flex-column flex-sm-row justify-content-end align-items-center">
                            <span className="me-4 order-2 order-sm-1 mt-4 mt-sm-0">
                                {data.items.length > 1 &&
                                    `Hiển thị 1–${data.items.length} của ${data.total} kết quả`}
                                {data.items.length <= 1 &&
                                    `${data.items.length} kết quả`}
                            </span>
                            <span className="order-1 order-sm-2">
                                <FilterBox
                                    currentValue={searchData.orderBy}
                                    handleChange={setSearchData}
                                    updateCategories={setCategories}
                                />
                            </span>
                        </div>
                    </Col>
                    <Col md={3} className="col-12">
                        <div className="mb-3 mb-sm-0">
                            <CateFilter
                                handleChoose={(checkedKeys) =>
                                    handleChoose(checkedKeys)
                                }
                                checkedKeys={tags.map((tag) => tag.id)}
                                updateCategories={setCategories}
                            />
                        </div>
                        <div className="d-md-block d-none">
                            <ProductSuggest />
                        </div>
                    </Col>
                    <Col md={9} className="mx-auto">
                        <div style={{ minHeight: "600px" }}>
                            <Row className="gx-2 gx-sm-3 gy-5">
                                {data &&
                                    data.items.map((item) => {
                                        return (
                                            <ProductItem
                                                numberDisplay={4}
                                                {...item}
                                            />
                                        );
                                    })}
                            </Row>
                        </div>
                        <Row className="mt-4">
                            <Pagination
                                align="center"
                                current={searchData.page}
                                onChange={onChange}
                                total={data.total}
                            />
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default SearchPage;
