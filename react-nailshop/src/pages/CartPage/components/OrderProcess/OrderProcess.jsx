import OrderItem from "@cartPages/OrderItem/OrderItem";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "antd";
import styles from "../../styles.module.scss";
import { useSelector } from "react-redux";
function OrderProcess() {
    const { carts } = styles;
    const { list, total } = useSelector((state) => state.cart);
    console.log(list);

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
        </div>
    );
}

export default OrderProcess;
