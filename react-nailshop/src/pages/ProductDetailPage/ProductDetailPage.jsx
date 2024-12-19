import Header from "@components/Header/Header";
import InputNumberBox from "@components/InputNumberBox/InputNumberBox";
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

import {
    Select,
    Space,
    ConfigProvider,
    Button,
    Flex,
    Breadcrumb,
    Image
} from "antd";
import classNames from "classnames";
import { FaShoppingCart } from "react-icons/fa";
import CateFilter from "@components/CateFilter/CateFilter";
import ProductSuggest from "@components/ProductSuggest/ProductSuggest";
import Description from "@productPages/CollapseDesc/Description";
import ProductItem from "@components/ProductItem/ProductItem";
import Footer from "@components/Footer/Footer";
function ProductDetailPage() {
    const {
        navPage,
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
        sizeBtn,
        productQuantity,
        addToCartBtn,
        buyNowBtn,
        productRelation,
        relationTitle
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
                <Container>
                    <Row>
                        <Col sm={9}>
                            <Row>
                                <Col sm={12}>
                                    <Row>
                                        <Col sm={5}>
                                            <div className={navPage}>
                                                <Breadcrumb
                                                    items={[
                                                        {
                                                            title: (
                                                                <a href="">
                                                                    Home
                                                                </a>
                                                            )
                                                        },
                                                        {
                                                            title: (
                                                                <a href="">
                                                                    Nail Box
                                                                </a>
                                                            )
                                                        }
                                                    ]}
                                                />
                                            </div>
                                            <div className={mainProductImg}>
                                                <Image src={currentImage} />
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
                                        <Col sm={7}>
                                            <div className={productContent}>
                                                <a
                                                    className={productType}
                                                    href=""
                                                >
                                                    Nail Box Xinh
                                                </a>
                                                <h3 className={productTitle}>
                                                    Combo 2 bộ Nail box Trắng
                                                    gạo + Cute trendy mắt mèo
                                                </h3>
                                                <div
                                                    className={productPriceBox}
                                                >
                                                    <span
                                                        className={currentPrice}
                                                    >
                                                        119.000{" "}
                                                        <span
                                                            className={
                                                                priceSymbol
                                                            }
                                                        >
                                                            ₫
                                                        </span>
                                                    </span>
                                                    <p className={rootPrice}>
                                                        200.000
                                                        <span
                                                            className={
                                                                priceSymbol
                                                            }
                                                        >
                                                            ₫
                                                        </span>
                                                    </p>
                                                    <DiscountTicket
                                                        value={50}
                                                        isAnimation={false}
                                                    />
                                                </div>
                                                <div className={productOptions}>
                                                    <p
                                                        style={{
                                                            marginBottom: 3
                                                        }}
                                                    >
                                                        Chọn mẫu:{" "}
                                                    </p>

                                                    <Space>
                                                        <Select
                                                            size={"large"}
                                                            defaultValue="lucy"
                                                            style={{
                                                                width: 360,
                                                                height: 40
                                                            }}
                                                            onChange={
                                                                handleChangeOption
                                                            }
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
                                                    <p
                                                        style={{
                                                            marginBottom: 3
                                                        }}
                                                    >
                                                        Kích cỡ:{" "}
                                                    </p>
                                                    <Flex wrap gap="small">
                                                        <Button
                                                            ghost={isCurrentSize(
                                                                "XS"
                                                            )}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    "XS"
                                                                )
                                                            }
                                                            type={
                                                                isCurrentSize(
                                                                    "XS"
                                                                )
                                                                    ? "primary"
                                                                    : ""
                                                            }
                                                            className={sizeBtn}
                                                        >
                                                            XS
                                                        </Button>
                                                        <Button
                                                            ghost={isCurrentSize(
                                                                "S"
                                                            )}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    "S"
                                                                )
                                                            }
                                                            type={
                                                                isCurrentSize(
                                                                    "S"
                                                                )
                                                                    ? "primary"
                                                                    : ""
                                                            }
                                                            className={sizeBtn}
                                                        >
                                                            S
                                                        </Button>
                                                        <Button
                                                            ghost={isCurrentSize(
                                                                "M"
                                                            )}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    "M"
                                                                )
                                                            }
                                                            type={
                                                                isCurrentSize(
                                                                    "M"
                                                                )
                                                                    ? "primary"
                                                                    : ""
                                                            }
                                                            className={sizeBtn}
                                                        >
                                                            M
                                                        </Button>
                                                        <Button
                                                            ghost={isCurrentSize(
                                                                "L"
                                                            )}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    "L"
                                                                )
                                                            }
                                                            type={
                                                                isCurrentSize(
                                                                    "L"
                                                                )
                                                                    ? "primary"
                                                                    : ""
                                                            }
                                                            className={sizeBtn}
                                                        >
                                                            L
                                                        </Button>
                                                    </Flex>
                                                </div>
                                                <div
                                                    className={productQuantity}
                                                >
                                                    <p
                                                        style={{
                                                            marginBottom: 3
                                                        }}
                                                    >
                                                        Kích cỡ:{" "}
                                                    </p>
                                                    <Space>
                                                        <InputNumberBox type="large" />
                                                        <Button
                                                            type="primary"
                                                            shape="round"
                                                            icon={
                                                                <FaShoppingCart />
                                                            }
                                                            className={
                                                                addToCartBtn
                                                            }
                                                            size={20}
                                                        >
                                                            Thêm vào giỏ hàng
                                                        </Button>
                                                    </Space>
                                                </div>
                                                <div>
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        icon={
                                                            <FaShoppingCart />
                                                        }
                                                        className={buyNowBtn}
                                                        size={20}
                                                    >
                                                        Mua ngay
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Space
                                                        style={{
                                                            marginTop: "20px"
                                                        }}
                                                    >
                                                        <Button danger>
                                                            Quà tặng
                                                        </Button>
                                                        <p
                                                            style={{
                                                                marginBottom:
                                                                    "0"
                                                            }}
                                                        >
                                                            dũa, bông cồn, cây
                                                            đẩy móng, keo, miếng
                                                            dán
                                                        </p>
                                                    </Space>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={12}>
                                    <Description />
                                </Col>
                                <Col sm={12}>
                                    <div className={productRelation}>
                                        <h4 className={relationTitle}>
                                            Sản phẩm tương tự
                                        </h4>
                                        <Row className="gx-3 gy-5">
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <CateFilter />
                            <>
                                <ProductSuggest />
                            </>
                        </Col>
                    </Row>
                </Container>
            </ConfigProvider>
        </div>
    );
}

export default ProductDetailPage;
