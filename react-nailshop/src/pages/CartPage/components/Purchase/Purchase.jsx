import { Radio, Space, Tooltip } from "antd";
import InputCommon from "./InputComon/InputComon";
import SelectCommon from "./SelectCommon/SelectCommon";
import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";
import PurchaseSummary from "./PurchaseSummary/PurchaseSummary";
import { useState } from "react";
import { purchaseMethod } from "./constants";
function Purchase() {
    const { purchaseBtn } = styles;
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    return (
        <div>
            <Row>
                <Col sm={6}>
                    <h5>Thông tin thanh toán</h5>
                    <Row>
                        <InputCommon label="Họ và tên" />
                    </Row>
                    <Row>
                        <InputCommon label="Số điện thoại" />
                    </Row>
                    <Row>
                        <SelectCommon label="Tỉnh" />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <SelectCommon label="Huyện" />
                        </Col>
                        <Col sm={6}>
                            <SelectCommon label="Xã" />
                        </Col>
                    </Row>
                    <Row>
                        <InputCommon label="Địa chỉ cụ thể / Ghi chú" />
                    </Row>
                    <Row>
                        <div className="fs-6 mt-1">Phương thức thanh toán</div>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                {purchaseMethod.map((item) => {
                                    return (
                                        <Radio
                                            value={item.value}
                                            className="fs-6"
                                        >
                                            <Tooltip
                                                placement="right"
                                                title={item.suggest}
                                            >
                                                <span>{item.title}</span>
                                            </Tooltip>
                                        </Radio>
                                    );
                                })}
                            </Space>
                        </Radio.Group>
                    </Row>
                </Col>
                <Col sm={6}>
                    <h5 className="mt-sm-0 mt-5">Đơn hàng của bạn</h5>
                    <PurchaseSummary />
                </Col>
            </Row>
        </div>
    );
}

export default Purchase;
