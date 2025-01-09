import CateFilter from "@components/CateFilter/CateFilter";
import { Container, Col, Row } from "react-bootstrap";
import ProductSuggest from "@components/ProductSuggest/ProductSuggest";
import ProductItem from "@components/ProductItem/ProductItem";
import FilterBox from "@components/FilterBox/FilterBox";
import { Pagination, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { getProductPublic } from "@/apis/productService";
import { HeaderSearchContext } from "@contexts/HeaderSearchProvider";
function SearchPage() {
    const [tags, setTags] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const { keyword, setKeyword } = useContext(HeaderSearchContext);
    const [searchData, setSearchData] = useState({
        keyword: keyword,
        page: 1,
        orderBy: "",
        size: 10
    });
    const [data, setData] = useState(null);
    useEffect(() => {
        setSearchData((prevData) => ({
            ...prevData,
            keyword: keyword,
            page: 1
        }));
    }, [keyword]);

    useEffect(() => {
        const fetchApiGetProduct = async () => {
            let filterQuery = "";
            if (searchData.keyword) {
                filterQuery += `name~'${searchData.keyword}'`;
            }
            console.log(
                searchData.page,
                searchData.size,
                filterQuery,
                searchData.orderBy
            );
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
        searchData.orderBy
    ]);

    const handleTag = (value) => {
        setTags([...value]);
    };

    const forMap = (tag) => (
        <span key={tag}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
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
    if (loading) {
        return <div>...</div>;
    }
    return (
        <Container>
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
                            />
                        </span>
                    </div>
                </Col>
                <Col md={3} className="col-12">
                    <div className="mb-3 mb-sm-0">
                        <CateFilter
                            handleChoose={handleTag}
                            checkedKeys={tags}
                        />
                    </div>
                    <div className="d-md-block d-none">
                        <ProductSuggest />
                    </div>
                </Col>
                <Col sm={9} className="mx-auto">
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
        </Container>
    );
}

export default SearchPage;
