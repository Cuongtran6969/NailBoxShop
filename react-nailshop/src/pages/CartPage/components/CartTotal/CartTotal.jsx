import styles from "./styles.module.scss";
import { Container } from "react-bootstrap";
import { Divider, Input, Button, Checkbox } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
function CartTotal() {
    const {
        container,
        box,
        voucherBox,
        inputBox,
        tickerIcon,
        priceBox,
        buyBtn,
        applyDicountBtn,
        totalPrice,
        totalBuyNumber,
        chooseOrder
    } = styles;
    return (
        <div className={container}>
            <Container className={box}>
                <div className={voucherBox}>
                    <BiSolidDiscount className={tickerIcon} />
                    <Input className={inputBox} />
                    <Button type="primary" className={applyDicountBtn}>
                        Áp dụng
                    </Button>
                </div>
                <Divider className="my-0" />
                <div className={priceBox}>
                    <div className="text-start w-25">
                        <div className="d-flex align-items-center">
                            <Checkbox className="me-sm-3 me-1" />
                            <span className={chooseOrder}>Tất Cả</span>
                            <span className="ms-3 text-danger fs-6 d-none d-sm-block">
                                Xóa
                            </span>
                        </div>
                    </div>
                    <div className="text-end w-75">
                        <span className={totalBuyNumber}>
                            Tổng thanh toán (1 Sản phẩm):
                        </span>
                        <span className={totalPrice}>₫7.900</span>
                        <Button className={buyBtn}>Mua Hàng</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartTotal;
