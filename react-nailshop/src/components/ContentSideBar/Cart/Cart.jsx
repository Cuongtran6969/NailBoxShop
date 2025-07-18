import styles from "./styles.module.scss";
import ButtonDefault from "@components/Button/Button";
import { notification } from "antd";
import Cookies from "js-cookie";
import CartItem from "./CartItem";
import { Button, ConfigProvider, Flex } from "antd";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { SideBarContext } from "@contexts/SideBarProvider";
import { useContext, useEffect } from "react";
import {
    removeItem,
    updateCartItem,
    removeVoucher,
    resetBuyOrder
} from "@redux/slice/cartSlice";
import { getProductById } from "@/apis/productService";
import { getVoucherByCode } from "@/apis/voucherService";
function Cart() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const { container, title, cartContent, cartBody, cartFooter } = styles;
    const { list, total, voucher } = useSelector((state) => state.cart);
    const { setIsOpen, setType } = useContext(SideBarContext);

    const updateCartFromAPI = async () => {
        if (voucher) {
            dispatch(removeVoucher());
        }
        for (let item of list) {
            const res = await getProductById(item.productId);
            const product = res.result;
            if (product.stock === 0) {
                dispatch(
                    removeItem({
                        ...item
                    })
                );
            } else {
                dispatch(
                    updateCartItem({
                        ...item
                    })
                );
            }
        }
    };
    useEffect(() => {
        updateCartFromAPI();
    }, []);

    const handleCheckout = () => {
        dispatch(resetBuyOrder());
        navigate("/checkout");
    };
    const directToViewCart = () => {
        setIsOpen(false);
        navigate("/cart");
    };
    return (
        <>
            {contextHolder}
            <div className={container}>
                <div className={title}>CART</div>
                <div className={cartContent}>
                    {list.length == 0 && (
                        <div>
                            <div className="d-flex justify-content-center">
                                <HiOutlineShoppingBag
                                    size={150}
                                    opacity={0.3}
                                />
                            </div>
                            <div className="fs-6 text-center mt-2 text-black">
                                Chưa có sản phẩm trong giỏ hàng.
                            </div>
                            <div className="text-center mt-5">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    size="large"
                                    color="default"
                                    variant="solid"
                                    className="p-3"
                                >
                                    Quay trở lại cửa hàng
                                </Button>
                            </div>
                        </div>
                    )}
                    {list.length > 0 && (
                        <>
                            <div className={cartBody}>
                                {list.map((cart, index) => {
                                    return (
                                        <>
                                            <CartItem data={cart} />
                                            {index < list.length - 1 && (
                                                <Divider />
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                            <div className={cartFooter}>
                                <ButtonDefault
                                    onClick={directToViewCart}
                                    content={"Xem giỏ hàng"}
                                    isPrimary={false}
                                />
                                <ButtonDefault
                                    content={"Thanh toán"}
                                    style={{ marginTop: "10px" }}
                                    onClick={handleCheckout}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
