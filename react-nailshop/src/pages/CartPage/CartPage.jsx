import { Container, Row, Col } from "react-bootstrap";
import OrderProcess from "@cartPages/OrderProcess/OrderProcess";
import { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import CartTotal from "@cartPages/CartTotal/CartTotal";
import Purchase from "@cartPages/Purchase/Purchase";
import PaymentResult from "@cartPages/PaymentResult/PaymentResult";
import OrderResult from "@cartPages/OrderResult/OrderResult";
const steps = [
    {
        title: "Giỏ hàng",
        content: <OrderProcess />
    },
    {
        title: "Chi tiết thanh toán",
        content: <Purchase />
    },
    {
        title: "Đơn hàng hoàn tất",
        // content: <PaymentResult />
        content: (
            // <OrderResult
            //     status={"success"}
            //     title={"Chuyển khoản thành công"}
            //     subTitle={
            //         "Mã giao dịch: 2017182818828182881 Vui lòng để ý điện thoại của bạn để nhận hàng."
            //     }
            // />
            <OrderResult
                status={"error"}
                title={"Chuyển khoản thất bại"}
                subTitle={
                    "Đơn hàng của bạn giao dịch thất bại, thời gian giao dịch hết hạn"
                }
            />
        )
    }
];
function CartPage() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title
    }));

    return (
        <>
            <Container>
                <Steps
                    current={current}
                    style={{ marginBottom: "40px", marginTop: "40px" }}
                    items={items}
                />
                <div>{steps[current].content}</div>
                <div
                    style={{
                        marginTop: 24
                    }}
                >
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() =>
                                message.success("Processing complete!")
                            }
                        >
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: "0 8px"
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </Container>
            <CartTotal />
        </>
    );
}

export default CartPage;
