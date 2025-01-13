import { Container, Row, Col } from "react-bootstrap";
import OrderProcess from "@cartPages/OrderProcess/OrderProcess";
import { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import PaymentResult from "@cartPages/PaymentResult/PaymentResult";
import OrderResult from "@cartPages/OrderResult/OrderResult";
import { useDispatch, useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const steps = [
    {
        title: "Giỏ hàng"
    },
    {
        title: "Chi tiết thanh toán"
    },
    {
        title: "Đơn hàng hoàn tất"
        // content: <PaymentResult />
        // content: (
        //     // <OrderResult
        //     //     status={"success"}
        //     //     title={"Chuyển khoản thành công"}
        //     //     subTitle={
        //     //         "Mã giao dịch: 2017182818828182881 Vui lòng để ý điện thoại của bạn để nhận hàng."
        //     //     }
        //     // />
        //     <OrderResult
        //         status={"error"}
        //         title={"Chuyển khoản thất bại"}
        //         subTitle={
        //             "Đơn hàng của bạn giao dịch thất bại, thời gian giao dịch hết hạn"
        //         }
        //     />
        // )
    }
];
function CartPage() {
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const { list, listBuy, totalCheckout } = useSelector((state) => state.cart);
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title
    }));
    const onChangeStep = (value) => {
        if (value == 1 && listBuy.length > 0) {
            navigate("/checkout");
        }
    };

    return (
        <>
            <Container
                style={{
                    background: "#ffff",
                    paddingTop: "20px",
                    borderRadius: "10px",
                    paddingBottom: "20px"
                }}
            >
                {list.length == 0 && (
                    <>
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <GiShoppingCart
                                style={{
                                    fontSize: "150px",
                                    opacity: 0.6
                                }}
                            />
                            <div className="fs-5">
                                Giỏ hàng{" "}
                                <strong className="text-danger">trống!</strong>
                            </div>
                            <p className="fs-6 text-secondary mt-3">
                                Bạn cần thêm sản phẩm vào giỏ hàng để mua
                            </p>
                            <Button
                                type="primary"
                                className="mt-5"
                                onClick={() => navigate("/")}
                            >
                                Mua sắm ngay
                            </Button>
                        </div>
                    </>
                )}
                {list.length > 0 && (
                    <>
                        <Steps
                            current={current}
                            style={{
                                marginBottom: "40px",
                                marginTop: "40px"
                            }}
                            items={items}
                            onChange={onChangeStep}
                        />
                        <div>
                            <OrderProcess />
                        </div>
                    </>
                )}
            </Container>
        </>
    );
}

export default CartPage;
