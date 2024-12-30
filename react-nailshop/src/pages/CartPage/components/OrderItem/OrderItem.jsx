import { Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { PiResizeFill } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { Button, Modal, Checkbox } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import InputNumberBox from "@components/InputNumberBox/InputNumberBox";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "@redux/slice/cartSlice";

const { confirm } = Modal;
function OrderItem({ data }) {
    const [quantity, setQuantity] = useState(data.quantity);

    useEffect(() => {
        //change in redux
        console.log("run heeee");
        dispatch(
            updateQuantity({
                key: data.key,
                quantity
            })
        );
    }, [quantity]);

    const dispatch = useDispatch();
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
                        <img src={data.pciture} />
                    </div>
                </Col>
                <Col sm={8} md={9} className="col-8">
                    <Row>
                        <Col sm={9} className="px-0">
                            <div>
                                <h4 className={title}>
                                    <span className={titleValue}>
                                        {data.productName}
                                    </span>
                                </h4>
                                <div className={categrory}>
                                    <div className={cateValue}>
                                        <GoDotFill className={iconDot} />
                                        <span>{data.designName}</span>
                                    </div>
                                    <div className={cateValue}>
                                        <PiResizeFill className={iconSize} />
                                        <span>Size {data.size}</span>
                                    </div>
                                    <div className={removeBtnHehind}>
                                        <MdDelete />
                                    </div>
                                </div>
                                <div className={removeBtn}>
                                    <span onClick={showDeleteConfirm}>
                                        Remove
                                    </span>
                                </div>
                                <div className={itemPriceBox}>
                                    <span className={itemPrice}>
                                        {data.price -
                                            0.01 * data.discount * data.price}
                                        ₫
                                    </span>
                                    <span className={originPrice}>
                                        {data.price}₫
                                    </span>
                                    <Button
                                        type="primary"
                                        icon={<BiSolidDiscount />}
                                        className={discount}
                                    >
                                        {data.discount}%
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3} className={totalItemBox}>
                            <div className={totalItemPrice}>
                                <span className={totalItemPricevalue}>
                                    {data.price -
                                        0.01 * data.discount * data.price}
                                    <span class={priceSymbol}>₫</span>
                                </span>
                            </div>
                            <div className={boxBehind}>
                                <div>
                                    <span className={originPriceBehind}>
                                        {data.price -
                                            0.01 * data.discount * data.price}
                                        ₫
                                    </span>
                                    <span className={itemPriceBehind}>
                                        {data.price -
                                            0.01 * data.discount * data.price}
                                        ₫
                                    </span>
                                </div>
                                <p className={discountBehind}>
                                    Discount {data.discount}%
                                </p>
                            </div>
                            <div className={quantityBox}>
                                <InputNumberBox
                                    type="small"
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default OrderItem;
