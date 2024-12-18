import OrderItem from "@cartPages/OrderItem/OrderItem";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "antd";
import styles from "../../styles.module.scss";

function OrderProcess() {
    const { carts } = styles;
    return (
        <div className={carts}>
            <Row className="gy-3">
                <OrderItem />
                <Divider plain></Divider>
                <OrderItem />
            </Row>
        </div>
    );
}

export default OrderProcess;
