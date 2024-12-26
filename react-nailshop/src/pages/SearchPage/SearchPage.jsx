import CateFilter from "@components/CateFilter/CateFilter";
import { Container, Col, Row } from "react-bootstrap";
import ProductSuggest from "@components/ProductSuggest/ProductSuggest";
import ProductItem from "@components/ProductItem/ProductItem";
import FilterBox from "@components/FilterBox/FilterBox";
import { Pagination, Tag } from "antd";
import { useState } from "react";

function SearchPage() {
    const [tags, setTags] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [current, setCurrent] = useState(2);

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
        setCurrent(page);
    };
    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <div>
                        <p className="fs-4 text-center">Kết quả tìm kiếm: “”</p>
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
                            Hiển thị 1–40 của 65 kết quả
                        </span>
                        <span className="order-1 order-sm-2">
                            <FilterBox />
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
                    <Row className="gx-2 gx-sm-3 gy-5">
                        {/* <ProductItem numberDisplay={4} /> */}
                    </Row>
                    <Row className="mt-4">
                        <Pagination
                            align="center"
                            current={current}
                            onChange={onChange}
                            total={40}
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchPage;
