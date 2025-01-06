import React, { useEffect, useState } from "react";
import { Form, Upload, Button, notification } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";
import { getShopInfo, updateBanner } from "@/apis/shopService";

function SettingShopPage() {
    const [fileList, setFileList] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const notificationKey = "banner-loading";

    const openLoadingNotification = () => {
        api.info({
            key: notificationKey,
            message: "Đang xử lý...",
            description: "Hệ thống đang tải dữ liệu hoặc lưu banner.",
            duration: 0, // Giữ thông báo hiển thị cho đến khi tắt
            placement: "top"
        });
    };

    const updateNotification = (type, message, description) => {
        api[type]({
            key: notificationKey,
            message,
            description,
            duration: 3, // Tự động tắt sau 3 giây
            placement: "top"
        });
    };

    const fetchApiShopInfo = async () => {
        setLoading(true);
        openLoadingNotification();
        try {
            const res = await getShopInfo();
            const formattedOldImages = res.result.banners
                .split(",")
                .map((url) => url.trim());
            setOldImages(formattedOldImages);

            const formattedFileList = formattedOldImages.map((url, index) => ({
                uid: `old-${index}`,
                url,
                name: `Image-${index + 1}`
            }));
            setFileList(formattedFileList);

            updateNotification(
                "success",
                "Tải dữ liệu thành công",
                "Thông tin shop đã được tải."
            );
        } catch (err) {
            console.error(err);
            updateNotification(
                "error",
                "Tải dữ liệu thất bại",
                "Không thể tải thông tin shop."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        openLoadingNotification();

        const formData = new FormData();
        formData.append(
            "banner",
            new Blob([JSON.stringify({ oldImages })], {
                type: "application/json"
            })
        );
        fileList.forEach((file) => {
            if (!file.url) {
                formData.append("images", file.originFileObj);
            }
        });

        try {
            await updateBanner(formData);
            updateNotification(
                "success",
                "Cập nhật thành công",
                "Banner đã được lưu."
            );
        } catch (err) {
            console.error(err);
            updateNotification(
                "error",
                "Cập nhật thất bại",
                "Không thể lưu banner."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApiShopInfo();
    }, []);

    return (
        <>
            {contextHolder}
            <Row>
                <Col sm={6}>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal"
                        style={{ maxWidth: 800 }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item name="productImages" label="Product Picture">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={({ fileList }) =>
                                    setFileList(fileList)
                                }
                                onRemove={(file) => {
                                    if (file.uid.startsWith("old-")) {
                                        setOldImages((prev) =>
                                            prev.filter(
                                                (url) => url !== file.url
                                            )
                                        );
                                    }
                                    setFileList((prev) =>
                                        prev.filter(
                                            (item) => item.uid !== file.uid
                                        )
                                    );
                                }}
                                beforeUpload={() => false}
                            >
                                <button
                                    style={{ border: 0, background: "none" }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 14, offset: 2 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default SettingShopPage;
