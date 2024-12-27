import { Button, Card, Image } from "antd";
import { Container, Table } from "react-bootstrap";
import styles from "../../styles.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
function PaymentResult() {
    const { qrTitle } = styles;
    return (
        <div>
            <Container>
                <div className="">
                    <Card>
                        <p className="text-center text-danger fs-6">
                            QUÉT MÃ QR SAU ĐỂ TỰ ĐỘNG ĐIỀN THÔNG TIN
                        </p>
                        <div className="p-5 text-center d-flex justify-content-center">
                            <Image
                                src="https://api.vietqr.io/image/970422-083838383999-cv2vf00.jpg?accountName=TRAN%20VAN%20CUONG&amount=200000"
                                className="border"
                            />
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
                                Vui lòng chuyển đúng nội dung WCORDER202 để
                                chúng tôi có thể xác nhận thanh toán
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
                                        <td>MB Bank</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>
                                            CHỦ TÀI KHOẢN:
                                        </td>
                                        <td>TRAN VAN CUONG</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>SỐ TK:</td>
                                        <td>083838383999</td>
                                    </tr>
                                    <tr>
                                        <td className={qrTitle}>SỐ TIỀN:</td>
                                        <td>NAP5716FUO</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default PaymentResult;
