import { Tooltip } from "antd";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import messager_icon from "@icons/images/messager_icon.png";

function Introduction({ captureDesign }) {
    return (
        <Container className="mt-5 w-100">
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Hướng Dẫn</Card.Title>
                            <div
                                className="p-4 mb-3 text-dark rounded"
                                style={{
                                    backgroundColor: "rgb(226, 237, 247)"
                                }}
                            >
                                <h5 className="text-start">Bước 1</h5>
                                <p className="text-muted">
                                    Chọn màu sơn và các item trang trí
                                </p>
                            </div>
                            <div
                                className="p-4 mb-3 text-dark rounded"
                                style={{
                                    backgroundColor: "rgb(226, 237, 247)"
                                }}
                            >
                                <h5 className="text-start">Bước 2</h5>
                                <div className="text-muted">
                                    <span>Tải ảnh thiết kế</span>

                                    <div>
                                        <button
                                            className="fs-6 btn btn-primary mt-1"
                                            onClick={captureDesign}
                                        >
                                            Xuất ảnh thiết kế
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="p-4 text-dark rounded"
                                style={{
                                    backgroundColor: "rgb(226, 237, 247)"
                                }}
                            >
                                <h5 className="text-start">Bước 3</h5>
                                <div className="text-muted">
                                    <span>
                                        Gửi ảnh để qua messager để được tư vấn
                                    </span>
                                    <span
                                        style={{
                                            width: "50px",
                                            display: "block",
                                            margin: "0 auto"
                                        }}
                                    >
                                        <Tooltip
                                            title="Hãy gửi về fanpage Nail La Box"
                                            placement="bottom"
                                        >
                                            <a
                                                href="https://www.facebook.com/naillabox"
                                                target="blank"
                                                className="d-block"
                                            >
                                                <img
                                                    src={messager_icon}
                                                    alt=""
                                                />
                                            </a>
                                        </Tooltip>
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Introduction;
