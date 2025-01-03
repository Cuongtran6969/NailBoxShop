import { Button, Card, Image, Modal } from "antd";
import { Container, Table } from "react-bootstrap";
import styles from "../styles.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
import CountdownTimer from "@components/CoutdownTimer/CountdownTimer";
import Logo_MB from "@icons/images/Logo_MB.png";
import { useState } from "react";
function Payment({ info, countTime, hanleCancelPayment }) {
    const { qrTitle } = styles;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancelConfirm = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title="Xóa sản phẩm"
                open={isModalOpen}
                onOk={hanleCancelPayment}
                onCancel={handleCancelConfirm}
            >
                <p>Bạn có muốn loại hủy thanh toán đơn hàng này</p>
            </Modal>
            <Container>
                <div className="">
                    <Card>
                        <p className="text-center text-danger fs-6">
                            QUÉT MÃ QR SAU ĐỂ TỰ ĐỘNG ĐIỀN THÔNG TIN
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <span>
                                {" "}
                                <CountdownTimer targetDate={countTime} />
                            </span>
                        </div>
                        <div className="p-5 text-center d-flex justify-content-center flex-column align-items-center">
                            <img
                                src={info.qrImage}
                                className="border"
                                style={{ width: "300px" }}
                            />
                            <span>
                                <img
                                    src={Logo_MB}
                                    alt=""
                                    style={{ width: "60px" }}
                                />
                            </span>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                type="primary"
                                shape="round"
                                icon={<DownloadOutlined />}
                                size={24}
                            >
                                Download
                            </Button>
                        </div>
                        <div className="w-100 mx-auto mt-3 w-sm-75">
                            <h5 className="text-center">
                                Thông tin chuyển khoản ngân hàng
                            </h5>
                            <h6 className="text-center text-danger fw-bold my-3">
                                Vui lòng chuyển đúng nội dung {info.orderCode}{" "}
                                để chúng tôi có thể xác nhận thanh toán
                            </h6>
                            <Table
                                bordered
                                hover
                                size="sm"
                                className="w-100  w-sm-75"
                                style={{ margin: "0 auto" }}
                            >
                                <tbody>
                                    <tr>
                                        <td className={qrTitle}>NGÂN HÀNG:</td>
                                        <td>{info.bankName}</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>
                                            CHỦ TÀI KHOẢN:
                                        </td>
                                        <td>{info.accountName}</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>SỐ TK:</td>
                                        <td>{info.bankCode}</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>SỐ TIỀN:</td>
                                        <td>
                                            {new Intl.NumberFormat(
                                                "vi-VN"
                                            ).format(info.totalPrice)}
                                            ₫
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                type="primary"
                                danger
                                onClick={() => setIsModalOpen(true)}
                            >
                                Hủy thanh toán
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default Payment;
