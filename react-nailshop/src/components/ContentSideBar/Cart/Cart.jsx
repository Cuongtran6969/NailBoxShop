import styles from "./styles.module.scss";
import ButtonDefault from "@components/Button/Button";
import { notification } from "antd";
import Cookies from "js-cookie";
import CartItem from "./CartItem";
import { Button, ConfigProvider, Flex } from "antd";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";

function Cart() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const { container, title, cartContent, cartBody, cartFooter } = styles;
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    return (
        <>
            {contextHolder}
            <div className={container}>
                <div className={title}>CART</div>
                <div className={cartContent}>
                    <div>
                        <div className="d-flex justify-content-center">
                            <HiOutlineShoppingBag size={150} opacity={0.3} />
                        </div>
                        <div className="fs-6 text-center mt-2 text-black">
                            Chưa có sản phẩm trong giỏ hàng.
                        </div>
                        <div className="text-center mt-5">
                            <Button
                                size="large"
                                color="default"
                                variant="solid"
                                className="p-3"
                            >
                                Quay trở lại cửa hàng
                            </Button>
                        </div>
                    </div>
                    {/* <div className={cartBody}>
                        <CartItem />
                    </div>
                    <div className={cartFooter}>
                        <ButtonDefault content={"Xem giỏ hàng"} isPrimary={false} />
                        <ButtonDefault
                            content={"Thanh toán"}
                            style={{ marginTop: "10px" }}
                        />
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Cart;
