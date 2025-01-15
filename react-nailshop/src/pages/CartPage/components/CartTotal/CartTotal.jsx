import styles from "./styles.module.scss";
import { Container } from "react-bootstrap";
import {
    Divider,
    Input,
    Button,
    Checkbox,
    Modal,
    message,
    Popconfirm
} from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
    resetBuyOrder,
    removeOrderCart,
    applyVoucher,
    removeVoucher
} from "@redux/slice/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVoucherByCode } from "@/apis/voucherService";
import { IoCloseCircleSharp } from "react-icons/io5";

function CartTotal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list, listBuy, totalCheckout, totalAfterVoucher, voucher } =
        useSelector((state) => state.cart);
    const [voucherCode, setVoucherCode] = useState(voucher?.code ?? "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const {
        container,
        box,
        voucherBox,
        inputBox,
        tickerIcon,
        priceBox,
        voucherValue,
        buyBtn,
        applyDicountBtn,
        boxInput,
        removeTicketBtn,
        totalPrice,
        totalBuyNumber,
        chooseOrder
    } = styles;

    const warning = (mess) => {
        messageApi.open({
            type: "warning",
            content: mess
        });
    };
    const success = (mess) => {
        messageApi.open({
            type: "success",
            content: mess
        });
    };
    const showModal = () => {
        if (listBuy.length == 0) {
            warning("Vui lòng chọn sản phẩm");
        } else {
            setIsModalOpen(true);
        }
    };
    const confirm = (e) => {
        if (voucher) {
            dispatch(removeVoucher());
        }
        setVoucherCode("");
    };

    const handleChooseOrder = () => {
        dispatch(resetBuyOrder());
    };
    const handeRemoveCart = () => {
        dispatch(removeOrderCart());
        setIsModalOpen(false);
    };

    const handleCancelConfirm = () => {
        setIsModalOpen(false);
    };

    const handeToCheckout = () => {
        if (listBuy.length == 0) {
            warning("Bạn vẫn chưa chọn sản phẩm nào để mua.");
        } else {
            navigate("/checkout");
        }
    };

    const parseMoneyFormat = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    const handleApplyVoucher = () => {
        console.log(voucherCode);

        if (voucherCode) {
            getVoucherByCode(voucherCode)
                .then((res) => {
                    dispatch(applyVoucher(res.result, null));
                    console.log(res.result);

                    success("Áp dụng thành công");
                })
                .catch((err) => {
                    warning("Voucher không hợp lệ");
                });
        } else {
            warning("Voucher không hợp lệ");
        }
    };

    const handleRemoveVoucher = () => {
        setVoucherCode("");
        dispatch(removeVoucher());
    };
    return (
        <div className={container}>
            {contextHolder}
            <Modal
                title="Xóa sản phẩm"
                open={isModalOpen}
                onOk={handeRemoveCart}
                onCancel={handleCancelConfirm}
            >
                <p>Bạn có muốn loại bỏ {listBuy.length} sản phẩm này</p>
            </Modal>

            <Container className={box}>
                <div className={voucherBox}>
                    <span className={voucherValue}>
                        {voucher &&
                            (voucher.amount > 0
                                ? `Giảm ${voucher.amount}%`
                                : voucher.type)}
                    </span>
                    <BiSolidDiscount className={tickerIcon} />
                    <div className={boxInput}>
                        <Input
                            value={voucherCode}
                            className={inputBox}
                            onChange={(e) => setVoucherCode(e.target.value)}
                        />
                        {voucher && (
                            <Popconfirm
                                title="Hủy áp dụng mã giảm giá"
                                description="Bạn chắc chắn không muốn áp dụng mã này?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <IoCloseCircleSharp
                                    className={removeTicketBtn}
                                />
                            </Popconfirm>
                        )}
                        {!voucher && (
                            <IoCloseCircleSharp
                                className={removeTicketBtn}
                                onClick={() => setVoucherCode("")}
                            />
                        )}
                    </div>
                    <Button
                        type="primary"
                        className={applyDicountBtn}
                        onClick={handleApplyVoucher}
                    >
                        Áp dụng
                    </Button>
                </div>
                <Divider className="my-0" />
                <div className={priceBox}>
                    <div className="text-start w-50">
                        <div className="d-flex align-items-center">
                            <Checkbox
                                className="me-sm-3 me-1"
                                checked={
                                    listBuy.length > 0 &&
                                    list.length === listBuy.length
                                }
                                onChange={handleChooseOrder}
                            />
                            <span className={chooseOrder}>Tất Cả</span>
                            <span
                                className="ms-3 text-danger fs-6"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={showModal}
                            >
                                Xóa
                            </span>
                        </div>
                    </div>
                    <div className="text-end w-50">
                        <span className={totalBuyNumber}>
                            Tổng thanh toán ({listBuy.length} Sản phẩm):
                        </span>
                        <span className={totalPrice}>
                            {parseMoneyFormat(totalAfterVoucher)}₫
                        </span>
                        <Button
                            className={buyBtn}
                            style={{ width: "160px" }}
                            onClick={handeToCheckout}
                        >
                            Mua Hàng
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartTotal;
