import styles from "../styles.module.scss";
import OrderItem from "./OrderItem";
import { Divider, Button } from "antd";

function MyOrder() {
    const {
        orderHeader,
        orderCode,
        orderDate,
        orderStatus,
        orderFooter,
        footerTitle,
        totalPrice,
        buyAgainBtn,
        footerPrice,
        contactBtn
    } = styles;
    return (
        <>
            <div className={orderHeader}>
                <div>
                    <span className={orderCode}>#33122332323</span>
                    <p className={orderDate}>Order date: 20/10/2024</p>
                </div>
                <div>
                    <span className={orderStatus}>COMPLETE</span>
                </div>
            </div>
            <Divider className="my-1" />
            <div>
                <OrderItem />
                <OrderItem />
                <OrderItem />
            </div>
            <div className={orderFooter}>
                <div className={footerPrice}>
                    <span className={footerTitle}>Order total:</span>
                    <span className={totalPrice}>320.000d</span>
                </div>
                <div>
                    <Button type="default" className={buyAgainBtn}>
                        Buy Again
                    </Button>
                    <Button type="default" className={contactBtn}>
                        Contact Sale
                    </Button>
                </div>
            </div>
        </>
    );
}

export default MyOrder;
