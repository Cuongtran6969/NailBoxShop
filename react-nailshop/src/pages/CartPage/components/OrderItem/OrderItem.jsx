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
import {
    updateQuantity,
    removeItem,
    changeListBuy
} from "@redux/slice/cartSlice";
import { useSelector } from "react-redux";
const { confirm } = Modal;
function OrderItem({ data }) {
    const dispatch = useDispatch();

    const handleChangeQuantity = (quantity) => {
        dispatch(
            updateQuantity({
                ...data,
                quantity
            })
        );
    };
    const { listBuy } = useSelector((state) => state.cart);

    const isChecked = listBuy.some(
        (item) =>
            item.productId === data.productId &&
            item.size === data.size &&
            item.designId === data.designId
    );

    const handleRemoveItem = () => {
        dispatch(
            removeItem({
                ...data
            })
        );
    };

    const parseMoneyFormat = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    const handeCheckBox = () => {
        dispatch(
            changeListBuy({
                ...data
            })
        );
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
                    <Checkbox checked={isChecked} onChange={handeCheckBox} />
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
                                    {data.designName && (
                                        <>
                                            <div className={cateValue}>
                                                <GoDotFill
                                                    className={iconDot}
                                                />
                                                <span>{data.designName}</span>
                                            </div>
                                        </>
                                    )}
                                    <div className={cateValue}>
                                        <PiResizeFill className={iconSize} />
                                        <span>Size {data.size}</span>
                                    </div>
                                    <div className={removeBtnHehind}>
                                        <MdDelete onClick={handleRemoveItem} />
                                    </div>
                                </div>
                                <div className={removeBtn}>
                                    <span onClick={handleRemoveItem}>
                                        Remove
                                    </span>
                                </div>
                                <div className={itemPriceBox}>
                                    <span className={originPrice}>
                                        {parseMoneyFormat(data.price)}₫
                                    </span>
                                    <span className={itemPrice}>
                                        {parseMoneyFormat(
                                            data.price -
                                                0.01 *
                                                    data.discount *
                                                    data.price
                                        )}
                                        ₫
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
                                    {parseMoneyFormat(
                                        (data.price -
                                            0.01 * data.discount * data.price) *
                                            data.quantity
                                    )}
                                    <span class={priceSymbol}>₫</span>
                                </span>
                            </div>
                            <div className={boxBehind}>
                                <div>
                                    <span className={originPriceBehind}>
                                        {parseMoneyFormat(data.price)}₫
                                    </span>
                                    <span className={itemPriceBehind}>
                                        {parseMoneyFormat(
                                            data.price -
                                                0.01 *
                                                    data.discount *
                                                    data.price
                                        )}
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
                                    quantity={data.quantity}
                                    changeQuantity={handleChangeQuantity}
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
