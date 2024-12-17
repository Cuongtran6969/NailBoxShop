import Header from "@components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useState } from "react";
import DiscountTicket from "@components/DiscountTicket/DiscountTicket";

//Ant
// import { Button, , Input, Space, theme } from 'antd';
import { Select, Space, ConfigProvider, Button, Flex } from "antd";
import classNames from "classnames";
function ProductDetailPage() {
    const {
        navPage,
        navPageItem,
        mainProductImg,
        imageSlider,
        productContent,
        productType,
        productTitle,
        productPriceBox,
        currentPrice,
        rootPrice,
        priceSymbol,
        productOptions,
        productSize,
        sizeBtn
    } = styles;
    const [currentImage, setCurrentImage] = useState(
        "https://nailboxxinh.com/wp-content/uploads/2024/12/set-qua-tang-combo-300x300.webp"
    );
    const [currentSize, setCurrentSize] = useState("S");

    const handleChangeImage = (src) => {
        setCurrentImage(src);
    };

    const handleChangeOption = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChooseSize = (value) => {
        setCurrentSize(value);
    };
    const isCurrentSize = (size) => {
        return currentSize === size;
    };
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            colorPrimary: "#ff90bc",
                            activeBorderColor: "#ff90bc",
                            hoverBorderColor: "#ff90bc",
                            optionSelectedBg: "#ffddeb",
                            fontSize: 16
                        },
                        Button: {
                            defaultHoverBorderColor: "#ff90bc",
                            defaultHoverColor: "#ff90bc", //hover text color
                            defaultGhostColor: "#ff90bc",
                            ghostBg: "#ff90bc",
                            defaultGhostBorderColor: "#ff90bc"
                        }
                    }
                }}
            >
                <Header />
                <Container>
                    <Row>
                        <Col sm={4}>
                            <div className={navPage}>
                                <a href="#" className={navPageItem}>
                                    Home
                                </a>
                                <span>/</span>
                                <a href="#" className={navPageItem}>
                                    nail box cute
                                </a>
                            </div>
                            <div className={mainProductImg}>
                                <img src={currentImage} />
                            </div>
                            <div className={imageSlider}>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={20}
                                    pagination={{
                                        clickable: true
                                    }}
                                    navigation={true}
                                    modules={[Navigation]}
                                >
                                    <SwiperSlide>
                                        <div
                                            onClick={() =>
                                                handleChangeImage(
                                                    "https://nailboxxinh.com/wp-content/uploads/2024/12/hinh-nail-box-trang-gao-300x300.webp"
                                                )
                                            }
                                        >
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/hinh-nail-box-trang-gao-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div
                                            onClick={() =>
                                                handleChangeImage(
                                                    "https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                )
                                            }
                                        >
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div
                                            onClick={() =>
                                                handleChangeImage(
                                                    "https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                )
                                            }
                                        >
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div>
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/hinh-nail-box-trang-gao-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div>
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div>
                                            <img
                                                src="https://nailboxxinh.com/wp-content/uploads/2024/12/huong-dan-do-mong-combo-300x300.webp"
                                                alt=""
                                            />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </Col>
                        <Col sm={5}>
                            <div className={productContent}>
                                <a className={productType} href="">
                                    Nail Box Xinh
                                </a>
                                <h3 className={productTitle}>
                                    Combo 2 bộ Nail box Trắng gạo + Cute trendy
                                    mắt mèo
                                </h3>
                                <div className={productPriceBox}>
                                    <span className={currentPrice}>
                                        119.000{" "}
                                        <span className={priceSymbol}>₫</span>
                                    </span>
                                    <p className={rootPrice}>
                                        200.000
                                        <span className={priceSymbol}>₫</span>
                                    </p>
                                    <DiscountTicket
                                        value={50}
                                        isAnimation={false}
                                    />
                                </div>
                                <div className={productOptions}>
                                    <p style={{ marginBottom: 3 }}>
                                        Chọn mẫu:{" "}
                                    </p>

                                    <Space>
                                        <Select
                                            size={"large"}
                                            defaultValue="lucy"
                                            style={{
                                                width: 500,
                                                height: 40
                                            }}
                                            onChange={handleChangeOption}
                                            options={[
                                                {
                                                    value: "jack",
                                                    label: "Mẫu 1"
                                                },
                                                {
                                                    value: "lucy",
                                                    label: "Mẫu 2"
                                                },
                                                {
                                                    value: "Yiminghe",
                                                    label: "Mẫu 3"
                                                },
                                                {
                                                    value: "disabled",
                                                    label: "Mẫu 4",
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                    </Space>
                                </div>
                                <div className={productSize}>
                                    <p style={{ marginBottom: 3 }}>Kích cỡ: </p>
                                    <Flex wrap gap="small">
                                        <Button
                                            ghost={isCurrentSize("XS")}
                                            onClick={() =>
                                                handleChooseSize("XS")
                                            }
                                            type={
                                                isCurrentSize("XS")
                                                    ? "primary"
                                                    : ""
                                            }
                                            className={sizeBtn}
                                        >
                                            XS
                                        </Button>
                                        <Button
                                            ghost={isCurrentSize("S")}
                                            onClick={() =>
                                                handleChooseSize("S")
                                            }
                                            type={
                                                isCurrentSize("S")
                                                    ? "primary"
                                                    : ""
                                            }
                                            className={sizeBtn}
                                        >
                                            S
                                        </Button>
                                        <Button
                                            ghost={isCurrentSize("M")}
                                            onClick={() =>
                                                handleChooseSize("M")
                                            }
                                            type={
                                                isCurrentSize("M")
                                                    ? "primary"
                                                    : ""
                                            }
                                            className={sizeBtn}
                                        >
                                            M
                                        </Button>
                                        <Button
                                            ghost={isCurrentSize("L")}
                                            onClick={() =>
                                                handleChooseSize("L")
                                            }
                                            type={
                                                isCurrentSize("L")
                                                    ? "primary"
                                                    : ""
                                            }
                                            className={sizeBtn}
                                        >
                                            L
                                        </Button>
                                    </Flex>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>Filter</Col>
                    </Row>
                    <div>product suggest system</div>
                </Container>
                <div>footer</div>
            </ConfigProvider>
        </div>
    );
}

export default ProductDetailPage;
