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
import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { getProductById } from "@/apis/productService";
const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
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
        relationTitle,
        activeImg
    } = styles;
    const [currentImage, setCurrentImage] = useState("");
    const [images, setImages] = useState([]);
    const [currentSize, setCurrentSize] = useState("S");

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                console.log("Fetching product data for id:", id);
                const data = await getProductById(id);
                console.log(data);

                let pictures = data.result.pictures
                    ? data.result.pictures.split(",")
                    : [];
                let designs = data.result.designs ? data.result.designs : [];
                designs.forEach((design) => {
                    if (design.picture) {
                        pictures.push(design.picture);
                    }
                });
                setProduct(data.result);
                setImages(pictures);
                setCurrentImage(pictures[0]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
            setLoading(false);
        };
        fetchInitialData();
    }, [id]);

    const handleChangeImage = (src) => {
        setCurrentImage(src);
    };

    const handleChangeOption = (value) => {
        const picture =
            product.designs.find((design) => design.id === value)?.picture ||
            null;
        setCurrentImage(picture);
    };
    const handleChooseSize = (value) => {
        setCurrentSize(value);
    };
    const isCurrentSize = (size) => {
        return currentSize === size;
    };
    if (loading) return <div>Loading...</div>;
    console.log("Images:", images);
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
                                                    {images.map((image) => {
                                                        return (
                                                            <SwiperSlide>
                                                                <div
                                                                    onClick={() =>
                                                                        handleChangeImage(
                                                                            image
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        className={classNames(
                                                                            {
                                                                                [activeImg]:
                                                                                    image ===
                                                                                    currentImage
                                                                            }
                                                                        )}
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        );
                                                    })}
                                                </Swiper>
                                            </div>
                                        </Col>
                                        <Col sm={7}>
                                            <div className={productContent}>
                                                <a
                                                    className={productType}
                                                    href=""
                                                >
                                                    {/* {product.categories} */}
                                                </a>
                                                <h3 className={productTitle}>
                                                    {product.name}
                                                </h3>
                                                <div
                                                    className={productPriceBox}
                                                >
                                                    <span
                                                        className={currentPrice}
                                                    >
                                                        {new Intl.NumberFormat(
                                                            "vi-VN"
                                                        ).format(
                                                            product.price -
                                                                product.price *
                                                                    0.01 *
                                                                    product.discount
                                                        )}
                                                        <span
                                                            className={
                                                                priceSymbol
                                                            }
                                                        >
                                                            ₫
                                                        </span>
                                                    </span>
                                                    <p className={rootPrice}>
                                                        {new Intl.NumberFormat(
                                                            "vi-VN"
                                                        ).format(product.price)}
                                                        <span
                                                            className={
                                                                priceSymbol
                                                            }
                                                        >
                                                            ₫
                                                        </span>
                                                    </p>
                                                    <DiscountTicket
                                                        value={product.discount}
                                                        isAnimation={false}
                                                    />
                                                </div>
                                                {product.designs.length > 0 && (
                                                    <div
                                                        className={
                                                            productOptions
                                                        }
                                                    >
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
                                                                defaultValue={
                                                                    product
                                                                        .designs[0]
                                                                        .name
                                                                }
                                                                style={{
                                                                    width: 353,
                                                                    height: 40
                                                                }}
                                                                onChange={
                                                                    handleChangeOption
                                                                }
                                                                options={[
                                                                    ...product.designs.map(
                                                                        (
                                                                            design
                                                                        ) => ({
                                                                            value: design.id,
                                                                            label: design.name
                                                                        })
                                                                    )
                                                                ]}
                                                            />
                                                        </Space>
                                                    </div>
                                                )}
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
                                            {/* <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} />
                                            <ProductItem numberDisplay={4} /> */}
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
};

export default ProductDetailPage;
