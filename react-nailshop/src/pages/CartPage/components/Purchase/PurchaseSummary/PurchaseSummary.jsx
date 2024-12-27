import PurchaseItem from "../PurchaseItem/PurchaseItem";
import { Button, Card, Divider, Menu, Row } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import styles from "../styles.module.scss";
import SubMenu from "antd/es/menu/SubMenu";
function PurchaseSummary() {
    const { purchaseBtn } = styles;
    return (
        <>
            <Card style={{ marginTop: "30px" }}>
                <Menu mode="inline" style={{ width: "100%" }}>
                    {/* SubMenu cho Loại sản phẩm */}
                    <SubMenu title="Danh sách đặt hàng">
                        <Menu.Item style={{ height: "90px" }}>
                            <PurchaseItem />
                        </Menu.Item>
                        <Menu.Item style={{ height: "90px" }}>
                            <PurchaseItem />
                        </Menu.Item>
                        <Menu.Item style={{ height: "90px" }}>
                            <PurchaseItem />
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Card>
            <Card className="mt-2">
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold">Tạm tính</span>
                    <span>456.000₫</span>
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <BiSolidDiscount color="orange" />
                        <span className="ms-2">Voucher</span>
                    </span>
                    <span>20%</span>
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <FaShippingFast color="red" />
                        <span className="ms-2">Shop Fee</span>
                    </span>
                    <span>20.000₫</span>
                </div>
                <div className="mt-3 d-flex align-items-center justify-content-between">
                    <span className="fw-bold d-flex align-items-center">
                        <span className="fs-5">Tổng</span>
                    </span>
                    <span className="fs-5 fw-bold">456.000₫</span>
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
