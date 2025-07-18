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
import { useContext, useEffect, useState } from "react";
import DiscountTicket from "@components/DiscountTicket/DiscountTicket";
import ShareSocial from "@components/ShareSocial/ShareSocial";
import {
    Select,
    Space,
    ConfigProvider,
    Button,
    Flex,
    Breadcrumb,
    Image
} from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";
import { FaShoppingCart } from "react-icons/fa";
import CateFilter from "@components/CateFilter/CateFilter";
import ProductSuggest from "@components/ProductSuggest/ProductSuggest";
import Description from "@productPages/CollapseDesc/Description";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/apis/productService";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    buyNowToCart,
    clearOrderStatus
} from "@redux/slice/cartSlice";
import { notification } from "antd";
const ProductDetailPage = () => {
    const { orderError, orderSuccess } = useSelector((state) => state.cart);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };
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
        activeImg,
        productStock
    } = styles;
    const [currentImage, setCurrentImage] = useState("");
    const [images, setImages] = useState([]);
    const [currentSize, setCurrentSize] = useState("S");
    const [currentDesign, setCurrentDesign] = useState();
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [orderData, setOrderData] = useState({
        productId: "",
        productName: "",
        size: "",
        quantity: 1,
        stock: 1,
        designId: "",
        designName: "",
        pciture: "",
        price: "",
        discount: "",
        size: ""
    });

    const handleChoose = (checkedKeys) => {
        // Cập nhật tags với cả id và name
        checkedKeys.map((id) => {
            const category = categories.find((cate) => cate.id === id);
            navigate(`/search`, {
                state: { id, name: category?.name || id }
            });
        });
    };
    const renderSkeletons = () => (
        <Row className="gx-3 gy-2">
            <Col className="col-12">
                <div className="text-end mt-3">
                    <Skeleton width="40%" height={30} />
                </div>
            </Col>
            <Col md={4}>
                <Skeleton
                    width="100%"
                    height={350}
                    style={{ marginTop: "30px" }}
                />
                <Row className="gx-3 mt-2">
                    <div className="col-3">
                        <Skeleton width="100%" height={90} />
                    </div>
                    <div className="col-3">
                        <Skeleton width="100%" height={90} />
                    </div>
                    <div className="col-3">
                        <Skeleton width="100%" height={90} />
                    </div>
                    <div className="col-3">
                        <Skeleton width="100%" height={90} />
                    </div>
                </Row>
            </Col>
            <Col md={5}>
                <Skeleton width="80%" count={2} style={{ marginTop: "10px" }} />
                <Skeleton
                    width="30%"
                    height={40}
                    style={{ marginTop: "20px" }}
                />
                <Skeleton width="15%" style={{ marginTop: "20px" }} />
                <Skeleton
                    width="60%"
                    height={40}
                    style={{ marginTop: "10px" }}
                />
                <Skeleton width="15%" style={{ marginTop: "20px" }} />
                <Skeleton
                    width="60%"
                    height={40}
                    style={{ marginTop: "10px" }}
                />
                <Skeleton width="20%" style={{ marginTop: "20px" }} />
                <Skeleton
                    width="60%"
                    height={40}
                    style={{ marginTop: "10px" }}
                />
                <Skeleton
                    width="50%"
                    height={45}
                    style={{ marginTop: "30px", marginLeft: "30px" }}
                />
            </Col>
            <Col md={3}>
                <Skeleton style={{ marginTop: "5px" }} />
                <Skeleton height={250} style={{ marginTop: "10px" }} />
                <Skeleton height={600} style={{ marginTop: "10px" }} />
            </Col>
        </Row>
    );
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                if (data.result == null) {
                    navigate("/");
                    return;
                }

                let pictures = data.result.pictures
                    ? data.result.pictures.split(",")
                    : [];
                let designs = data.result.designs ? data.result.designs : [];
                let firstPicture;
                designs.forEach((design, index) => {
                    if (design.picture) {
                        if (index === 0) {
                            firstPicture = design.picture;
                        }
                        pictures.push(design.picture);
                    }
                });
                setProduct(data.result);
                setImages(pictures);
                setCurrentImage(firstPicture || pictures[0]);
                setOrderData({
                    ...orderData,
                    productId: id,
                    productName: data.result.name,
                    size: "S",
                    designId: designs[0]?.id,
                    designName: designs[0]?.name,
                    price: data.result.price,
                    discount: data.result.discount,
                    pciture: firstPicture ?? pictures[0],
                    stock: data.result.stock,
                    size: data.result.size ? data.result.size.split(",")[0] : ""
                });
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
            setLoading(false);
        };
        fetchInitialData();
    }, [id]);
    useEffect(() => {
        if (orderError) {
            openNotificationWithIcon("error", "Thất bại", orderError);
            dispatch(clearOrderStatus());
        }

        if (orderSuccess) {
            openNotificationWithIcon("success", "Thành công", orderSuccess);
            dispatch(clearOrderStatus());
        }
    }, [orderError, orderSuccess, dispatch]);

    useEffect(() => {
        setOrderData({
            ...orderData,
            quantity: currentQuantity
        });
    }, [currentQuantity]);

    const handleChangeImage = (src) => {
        setCurrentImage(src);
    };

    const handleChangeOption = (value) => {
        const picture =
            product.designs.find((design) => design.id === value)?.picture ||
            null;
        setCurrentImage(picture);
        let design = product.designs.find((design) => design.id == value);
        setOrderData({
            ...orderData,
            designId: design.id,
            designName: design.name,
            pciture: design.picture
        });
        // setCurrentDesign(value);
    };
    const handleChooseSize = (value) => {
        setOrderData({
            ...orderData,
            size: value
        });
    };
    const isCurrentSize = (size) => {
        return orderData.size === size;
    };
    const addToCartHandle = () => {
        dispatch(
            addToCart({
                ...orderData
            })
        );
    };

    const handleBuyNow = () => {
        dispatch(
            addToCart({
                ...orderData
            })
        );
        dispatch(
            buyNowToCart({
                ...orderData
            })
        );
        navigate("/cart");
    };
    return (
        <div>
            {contextHolder}
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
                    {loading ? (
                        renderSkeletons()
                    ) : (
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
                                                                    <a href="/">
                                                                        Home
                                                                    </a>
                                                                )
                                                            },
                                                            {
                                                                title: (
                                                                    <a href="/search?type=Nail Box">
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
                                                        {images.map(
                                                            (image, index) => {
                                                                return (
                                                                    <SwiperSlide
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
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
                                                            }
                                                        )}
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
                                                    <h3
                                                        className={productTitle}
                                                    >
                                                        {product.name}
                                                    </h3>
                                                    <div
                                                        className={
                                                            productPriceBox
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                currentPrice
                                                            }
                                                        >
                                                            {new Intl.NumberFormat(
                                                                "vi-VN"
                                                            ).format(
                                                                Math.floor(
                                                                    product.price -
                                                                        product.price *
                                                                            0.01 *
                                                                            product.discount
                                                                )
                                                            )}
                                                            <span
                                                                className={
                                                                    priceSymbol
                                                                }
                                                            >
                                                                ₫
                                                            </span>
                                                        </span>
                                                        <p
                                                            className={
                                                                rootPrice
                                                            }
                                                        >
                                                            {new Intl.NumberFormat(
                                                                "vi-VN"
                                                            ).format(
                                                                product.price
                                                            )}
                                                            <span
                                                                className={
                                                                    priceSymbol
                                                                }
                                                            >
                                                                ₫
                                                            </span>
                                                        </p>
                                                        <DiscountTicket
                                                            value={
                                                                product.discount
                                                            }
                                                            isAnimation={false}
                                                        />
                                                    </div>
                                                    {product.designs.length >
                                                        0 && (
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
                                                                    size={
                                                                        "large"
                                                                    }
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
                                                                    value={
                                                                        orderData.designId
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
                                                    {product.size && (
                                                        <div
                                                            className={
                                                                productSize
                                                            }
                                                        >
                                                            <p
                                                                style={{
                                                                    marginBottom: 3
                                                                }}
                                                            >
                                                                Kích cỡ:{" "}
                                                            </p>
                                                            <Flex
                                                                wrap
                                                                gap="small"
                                                            >
                                                                {product.size
                                                                    .split(",")
                                                                    .map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <Button
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    ghost={isCurrentSize(
                                                                                        item
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        handleChooseSize(
                                                                                            item
                                                                                        )
                                                                                    }
                                                                                    type={
                                                                                        isCurrentSize(
                                                                                            item
                                                                                        )
                                                                                            ? "primary"
                                                                                            : ""
                                                                                    }
                                                                                    className={
                                                                                        sizeBtn
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </Button>
                                                                            );
                                                                        }
                                                                    )}
                                                            </Flex>
                                                        </div>
                                                    )}

                                                    <div
                                                        className={
                                                            productQuantity
                                                        }
                                                    >
                                                        <p
                                                            style={{
                                                                marginBottom: 3
                                                            }}
                                                        >
                                                            Số lượng
                                                        </p>
                                                        <Space>
                                                            <InputNumberBox
                                                                type="large"
                                                                quantity={
                                                                    currentQuantity
                                                                }
                                                                max={
                                                                    product.stock
                                                                }
                                                                changeQuantity={
                                                                    setCurrentQuantity
                                                                }
                                                            />
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
                                                                onClick={
                                                                    addToCartHandle
                                                                }
                                                            >
                                                                Thêm vào giỏ
                                                                hàng
                                                            </Button>
                                                        </Space>
                                                        <p
                                                            className={
                                                                productStock
                                                            }
                                                        >
                                                            Còn {product.stock}{" "}
                                                            sản phẩm
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            type="primary"
                                                            shape="round"
                                                            icon={
                                                                <FaShoppingCart />
                                                            }
                                                            className={
                                                                buyNowBtn
                                                            }
                                                            size={20}
                                                            onClick={
                                                                handleBuyNow
                                                            }
                                                        >
                                                            Mua ngay
                                                        </Button>
                                                    </div>
                                                    {/* <div>
                                                        <Space
                                                            style={{
                                                                marginTop:
                                                                    "20px"
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
                                                                dũa, bông cồn,
                                                                cây đẩy móng,
                                                                keo, miếng dán
                                                            </p>
                                                        </Space>
                                                    </div> */}
                                                    <div>
                                                        <ShareSocial />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12}>
                                        <Description
                                            text={product.description}
                                        />
                                    </Col>
                                    <Col sm={12}>
                                        <div className={productRelation}>
                                            <h4 className={relationTitle}>
                                                {/* Sản phẩm tương tự */}
                                            </h4>
                                            <Row className="gx-3 gy-5"></Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={3}>
                                <CateFilter
                                    handleChoose={(checkedKeys) =>
                                        handleChoose(checkedKeys)
                                    }
                                    updateCategories={setCategories}
                                />
                                <>
                                    <ProductSuggest />
                                </>
                            </Col>
                        </Row>
                    )}
                </Container>
            </ConfigProvider>
        </div>
    );
};

export default ProductDetailPage;
