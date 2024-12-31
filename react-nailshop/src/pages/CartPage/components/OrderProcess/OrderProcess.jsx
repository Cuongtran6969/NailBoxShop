import OrderItem from "@cartPages/OrderItem/OrderItem";
import CartTotal from "@cartPages/CartTotal/CartTotal";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "antd";
import styles from "../../styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
function OrderProcess() {
    const { carts } = styles;
    const { list, listBuy, totalCheckout } = useSelector((state) => state.cart);
    console.log(totalCheckout);

    return (
        <div className={carts}>
            <Row className="gy-3">
                {list.map((item, index) => {
                    return (
                        <>
                            <OrderItem data={item} />
                            {index <= list.length - 1 && (
                                <Divider plain></Divider>
                            )}
                        </>
                    );
                })}
            </Row>
            <CartTotal />
        </div>
    );
}

export default OrderProcess;
