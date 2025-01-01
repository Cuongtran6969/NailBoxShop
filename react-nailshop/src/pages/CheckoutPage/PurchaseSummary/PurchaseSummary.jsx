import PurchaseItem from "../PurchaseItem/PurchaseItem";
import { Button, Card, Divider, Menu, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BiSolidDiscount } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import styles from "../styles.module.scss";
import SubMenu from "antd/es/menu/SubMenu";
import { useSelector } from "react-redux";
import { useState } from "react";
function PurchaseSummary({ shipFee }) {
    const { list, listBuy, totalCheckout, totalAfterVoucher, voucher } =
        useSelector((state) => state.cart);
    const parseMoneyFormat = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    const { purchaseBtn } = styles;
    return (
        <>
            <Card style={{ marginTop: "30px" }}>
                <Menu mode="inline" style={{ width: "100%" }}>
                    {/* SubMenu cho Loại sản phẩm */}
                    <SubMenu title="Danh sách đặt hàng">
                        {listBuy
                            .slice()
                            .reverse()
                            .map((item, index) => {
                                return (
                                    <>
                                        <Menu.Item
                                            key={index}
                                            style={{ height: "90px" }}
                                        >
                                            <PurchaseItem data={item} />
                                        </Menu.Item>
                                    </>
                                );
                            })}
                    </SubMenu>
                </Menu>
            </Card>
            <Card className="mt-2">
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold">Tổng tiền hàng</span>
                    <span> {parseMoneyFormat(totalCheckout)}₫</span>
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <FaShippingFast color="red" />
                        <span className="ms-2">Ship Fee</span>
                    </span>
                    {shipFee ? (
                        <span>{parseMoneyFormat(shipFee)}₫</span>
                    ) : (
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="small"
                        />
                    )}
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <BiSolidDiscount color="orange" />
                        <span className="ms-2">Voucher</span>
                    </span>
                    {voucher && voucher.amount == 0 && (
                        <span>
                            <span className="me-3 fw-medium">
                                Miễn phí vận chuyển
                            </span>
                            {shipFee && "-" + parseMoneyFormat(shipFee)}₫
                        </span>
                    )}
                    {voucher && voucher.amount > 0 && (
                        <span>
                            -
                            {parseMoneyFormat(
                                voucher.amount * 0.01 * totalCheckout
                            )}
                            ₫
                        </span>
                    )}
                </div>

                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <span className="fs-5">Tổng</span>
                    </span>
                    {shipFee ? (
                        <span className="fs-5 fw-bold">
                            {/* amount == 0 mean have is free ship */}
                            {/* ko co voucher hoac la voucher amount > 0 deu phai co ship */}
                            {voucher && voucher.amount == 0
                                ? parseMoneyFormat(totalAfterVoucher)
                                : parseMoneyFormat(totalAfterVoucher + shipFee)}
                            ₫
                        </span>
                    ) : (
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="small"
                        />
                    )}
                </div>
                <div>
                    <Button
                        color="default"
                        variant="solid"
                        className={purchaseBtn}
                    >
                        Thanh Toán
                    </Button>
                </div>
            </Card>
        </>
    );
}

export default PurchaseSummary;
