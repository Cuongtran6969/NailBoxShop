import { Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { PiResizeFill } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { Button, Modal, Checkbox } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import InputNumberBox from "@components/InputNumberBox/InputNumberBox";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";

const { confirm } = Modal;
function OrderItem() {
    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this task?",
            icon: <ExclamationCircleFilled />,
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    };

    const {
        itemImage,
        title,
        titleValue,
        categrory,
        cateValue,
        iconDot,
        iconSize,
        removeBtn,
        cateName,
        price,
        itemPrice,
        originPrice,
        itemPriceBox,
        discount,
        totalItemPrice,
        totalItemPricevalue,
        priceSymbol,
        quantityBox,
        totalItemBox,
        boxBehind,
        itemPriceBehind,
        originPriceBehind,
        discountBehind,
        removeBtnHehind
    } = styles;
    return (
        <div>
            <Row style={{ alignItems: "center" }}>
                <Col sm={1} md={1} className="col-1 p-0 text-center">
                    <Checkbox />
                </Col>
                <Col sm={3} md={2} className="col-3 ps-0">
                    <div className={itemImage}>
                        <img src="https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-4-300x300.webp" />
                    </div>
                </Col>
                <Col sm={8} md={9} className="col-8">
                    <Row>
                        <Col sm={9} className="px-0">
                            <div>
                                <h4 className={title}>
                                    <span className={titleValue}>
                                        Combo 2 bộ Nail box Trắng gạo + Cute
                                        đính bướm
                                    </span>
                                    <span>
                                        <Button
                                            type="primary"
                                            className={cateName}
                                        >
                                            Nail box xinh
                                        </Button>
                                    </span>
                                </h4>
                                <div className={categrory}>
                                    <div className={cateValue}>
                                        <GoDotFill className={iconDot} />
                                        <span>Mẫu 1</span>
                                    </div>
                                    <div className={cateValue}>
                                        <PiResizeFill className={iconSize} />
                                        <span>Size S</span>
                                    </div>
                                    <div className={removeBtnHehind}>
                                        <MdDelete />
                                    </div>
                                </div>
                                <div
                                    className={removeBtn}
                                    onClick={showDeleteConfirm}
                                >
                                    <span>Remove</span>
                                </div>
                                <div className={itemPriceBox}>
                                    <span className={itemPrice}>122.000₫</span>
                                    <span className={originPrice}>
                                        222.000₫
                                    </span>
                                    <Button
                                        type="primary"
                                        icon={<BiSolidDiscount />}
                                        className={discount}
                                    >
                                        20%
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3} className={totalItemBox}>
                            <div className={totalItemPrice}>
                                <span className={totalItemPricevalue}>
                                    388.000
                                    <span class={priceSymbol}>₫</span>
                                </span>
                            </div>
                            <div className={boxBehind}>
                                <div>
                                    <span className={originPriceBehind}>
                                        222.000₫
                                    </span>
                                    <span className={itemPriceBehind}>
                                        122.000₫
                                    </span>
                                </div>
                                <p className={discountBehind}>Discount 5%</p>
                            </div>
                            <div className={quantityBox}>
                                <InputNumberBox type="small" />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default OrderItem;
