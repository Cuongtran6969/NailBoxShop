import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Typography, Button } from "antd";
import { BsLightningChargeFill } from "react-icons/bs";
import { getProductPublic } from "@/apis/productService";
const { Text } = Typography;
import { PiTrendUpBold } from "react-icons/pi";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
let sort = "sold:desc";
let page = 1;
let size = 5;
function ProductSuggest() {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();
    const {
        container,
        productBox,
        headingContent,
        proImg,
        proContent,
        proTitle,
        proPrice,
        proPriceRoot,
        proDiscount,
        proPriceInfo
    } = styles;
    useEffect(() => {
        const fetchProductCampaign = async () => {
            try {
                const data = await getProductPublic(page, size, null, sort);
                setProducts(data.result.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductCampaign();
    }, []);

    return (
        <>
            {products != null && (
                <Card className={container}>
                    <Card.Title>
                        <div className={headingContent}>
                            <PiTrendUpBold /> <span>Sản phẩm bán chạy</span>
                        </div>
                    </Card.Title>
                    {/* Danh sách Video */}
                    <Row>
                        {products.map((product) => (
                            <Col key={product.id} xs={12} className="mb-3">
                                <div
                                    className={productBox}
                                    onClick={() =>
                                        navigate(`/detail/${product.id}`)
                                    }
                                >
                                    <div style={{ display: "flex" }}>
                                        <img
                                            src={product.pictures.split(",")[0]}
                                            alt={product.name}
                                            className={proImg}
                                        />
                                        {/* Nội dung video */}
                                        <div className={proContent}>
                                            <div className={proTitle}>
                                                {product.name}
                                            </div>
                                            {/* Thông tin giá */}
                                            <div className={proPriceInfo}>
                                                <div>
                                                    <Text className={proPrice}>
                                                        {new Intl.NumberFormat(
                                                            "vi-VN"
                                                        ).format(
                                                            product.price -
                                                                product.price *
                                                                    0.01 *
                                                                    product.discount
                                                        )}
                                                        <span>₫</span>
                                                    </Text>
                                                    <Text
                                                        delete
                                                        className={proPriceRoot}
                                                    >
                                                        {new Intl.NumberFormat(
                                                            "vi-VN"
                                                        ).format(product.price)}
                                                        <span>₫</span>
                                                    </Text>
                                                </div>
                                                <div>
                                                    <span
                                                        className={proDiscount}
                                                    >
                                                        <BsLightningChargeFill color="orange" />{" "}
                                                        {product.discount}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {/* Nút Xem thêm */}
                    <div className="text-center mt-2">
                        <Button
                            type="default"
                            style={{ width: "100%" }}
                            onClick={() =>
                                navigate(`/search`, {
                                    state: { orderBy: "sold:desc" }
                                })
                            }
                        >
                            Xem thêm...
                        </Button>
                    </div>
                </Card>
            )}
        </>
    );
}

export default ProductSuggest;
