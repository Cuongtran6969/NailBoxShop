import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
    getNailCategory,
    createNailDesignTemplate,
    createNailCateTemplate
} from "@/apis/nailDesignService";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Form, Input, Select, Upload, notification } from "antd";
import { Col, Row } from "react-bootstrap";
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return false;
    }
    return true;
};
const renderSkeletons = () => (
    <Row className="gx-3 gy-2 ">
        <Col sd={12}>
            <Row>
                <div className="d-flex gap-5">
                    <Skeleton width={150} height={150} />
                    <div>
                        <div className="mt-3">
                            <Skeleton width={350} height={30} />
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="gx-3 mt-4">
                <div className="my-3">
                    <Button
                        type="primary"
                        className="py-3"
                        style={{ opacity: 0.6 }}
                    >
                        Đang tạo...
                    </Button>
                </div>
            </Row>
        </Col>
    </Row>
);
function DesignCateManage({ setChange, change }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };

    const handleChange = (info) => {
        const file = info.file.originFileObj;
        if (file) {
            getBase64(file, (url) => {
                setImage(url);
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none"
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}
            >
                Upload
            </div>
        </button>
    );
    // useEffect(() => {
    //     setLoading(true);
    //     getNailCategory()
    //         .then((res) => {
    //             setCategories(res.items);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     setLoading(false);
    // }, []);

    const uploadImage = async (image) => {
        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_NAME
            }/image/upload`,
            {
                method: "POST",
                body: data
            }
        );
        const res = await response.json();
        setLoading(false);
        return res.secure_url;
    };

    const handleSubmit = async (value) => {
        setLoading(true);
        try {
            const uploadedUrls = await uploadImage(image);
            const data = {
                name: value.name,
                image: uploadedUrls
            };

            await createNailCateTemplate(data) // Gửi dữ liệu lên server
                .then((res) => {
                    if (res.code == 200) {
                        openNotificationWithIcon(
                            "success",
                            "Thêm thể loại",
                            "Thêm thể loại thành công"
                        );
                        setChange(!change);
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "Thêm thể loại",
                            res.message
                        );
                    }
                });
        } catch (error) {}
        setLoading(false);
    };

    if (loading) return <>{renderSkeletons()}</>;
    return (
        <>
            {contextHolder}
            <Form form={form} wrapperCol={12} onFinish={handleSubmit}>
                <div
                    className="d-flex w-100"
                    style={{ display: "flex", gap: "32px" }}
                >
                    <Form.Item name="Image">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="maindesign"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {image ? (
                                <img
                                    src={image}
                                    alt="avatar"
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                    <div style={{ flex: "1" }}>
                        <Form.Item
                            labelCol={{
                                flex: "80px",
                                style: { textAlign: "left" }
                            }}
                            name="name"
                            label="Name"
                            rules={[{ required: true }]}
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="py-3">
                        Tạo thể loại
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default DesignCateManage;
