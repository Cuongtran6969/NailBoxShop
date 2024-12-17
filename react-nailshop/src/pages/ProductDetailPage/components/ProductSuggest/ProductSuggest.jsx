import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Typography, Button } from "antd";
import { BsLightningChargeFill } from "react-icons/bs";

const { Text } = Typography;
import { PiTrendUpBold } from "react-icons/pi";
import styles from "./styles.module.scss";
function ProductSuggest() {
    const {
        container,
        productBox,
        headingContent,
        proImg,
        proContent,
        proTitle,
        proPrice,
        proPriceRoot,
        proDiscount
    } = styles;
    const videos = [
        {
            id: 1,
            title: "Dùng thử chuột trên iPadOS - Tính năng ngon như vậy mà giờ mới có",
            imgSrc: "https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-1-150x150.webp", // Placeholder cho ảnh
            price: "4,500,000₫",
            originalPrice: "5,000,000₫",
            discount: "10%"
        },
        {
            id: 2,
            title: "iPad Mini 5, hàng NGON BỔ RẺ của Apple là đây chứ đâu!",
            imgSrc: "https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-4-150x150.webp",
            price: "3,900,000₫",
            originalPrice: "4,500,000₫",
            discount: "13%"
        },
        {
            id: 3,
            title: "Đánh giá chi tiết iPad Mini 5 - Chiếc tablet",
            imgSrc: "https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-4-150x150.webp",
            price: "4,200,000₫",
            originalPrice: "4,700,000₫",
            discount: "11%"
        },
        {
            id: 4,
            title: "iPad chơi game BÁ ĐẠO NHẤT ???",
            imgSrc: "https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-4-150x150.webp",
            price: "5,200,000₫",
            originalPrice: "5,500,000₫",
            discount: "6%"
        }
    ];

    return (
        <Card className={container}>
            <Card.Title>
                <div className={headingContent}>
                    <PiTrendUpBold /> <span>Sản phẩm bán chạy</span>
                </div>
            </Card.Title>
            {/* Danh sách Video */}
            <Row>
                {videos.map((video) => (
                    <Col key={video.id} xs={12} className="mb-3">
                        <a className={productBox} href="#">
                            <div style={{ display: "flex" }}>
                                <img
                                    src={video.imgSrc}
                                    alt={video.title}
                                    className={proImg}
                                />
                                {/* Nội dung video */}
                                <div className={proContent}>
                                    <div className={proTitle}>
                                        {video.title}
                                    </div>
                                    {/* Thông tin giá */}
                                    <div style={{ marginTop: "5px" }}>
                                        <Text className={proPrice}>
                                            {video.price}
                                        </Text>
                                        <Text delete className={proPriceRoot}>
                                            {video.originalPrice}
                                        </Text>
                                        <span className={proDiscount}>
                                            <BsLightningChargeFill color="orange" />{" "}
                                            {video.discount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Col>
                ))}
            </Row>
            {/* Nút Xem thêm */}
            <div className="text-center mt-2">
                <Button type="default" style={{ width: "100%" }}>
                    Xem thêm...
                </Button>
            </div>
        </Card>
    );
}

export default ProductSuggest;
