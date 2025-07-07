import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
    getNailCategory,
    createNailDesignTemplate
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
                        <div className="">
                            <Skeleton width={350} height={30} />
                        </div>
                        <div className="mt-3">
                            <Skeleton width={350} height={30} />
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="gx-3 mt-4">
                <div className="d-flex gap-4">
                    <Skeleton width={100} height={100} />
                    <Skeleton width={100} height={100} />
                    <Skeleton width={100} height={100} />
                    <Skeleton width={100} height={100} />
                    <Skeleton width={100} height={100} />
                </div>
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
function DesignCreate({ setChange, change }) {
    const [loading, setLoading] = useState(true);
    const [loadingCloud, setLoadingCloud] = useState(false);
    const [images, setImages] = useState(["", "", "", "", "", ""]);
    const [url, setUrl] = useState("");
    const [type, setType] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCate, setCurrentCate] = useState([]);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };

    const handleChange = (index, info) => {
        const file = info.file.originFileObj;
        if (file) {
            getBase64(file, (url) => {
                setImages((prev) => {
                    let arr = [...prev];
                    arr[index] = url;
                    return arr;
                });
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
    useEffect(() => {
        setLoading(true);
        getNailCategory()
            .then((res) => {
                const formattedCategories = res.result.items.map((item) => ({
                    label: item.name, // Đặt tên category thành label
                    value: item.id // Đặt id category thành value
                }));
                setCategories(formattedCategories);
                setCurrentCate(formattedCategories[0] ?? "");
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }, []);

    const uploadImage = async (listImage) => {
        setLoading(true);
        let uploadedUrls = [];
        let index = 0;
        for (const image of listImage) {
            if (!image) continue; // Bỏ qua ảnh rỗng

            const data = new FormData();
            data.append("file", image);
            data.append(
                "upload_preset",
                import.meta.env.VITE_CLOUDINARY_PRESET
            );
            data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

            try {
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
                index += 1;
                uploadedUrls.push(res.secure_url);
                if (
                    (currentCate.value === 1 || currentCate.label === "item") &&
                    index == 2
                ) {
                    setLoading(false);
                    return uploadedUrls;
                } // Lưu URL ảnh đã upload
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }

        setLoading(false);
        return uploadedUrls; // Trả về danh sách URL
    };

    const handleSubmit = async (value) => {
        setLoading(true);
        try {
            const uploadedUrls = await uploadImage(images); // Đợi upload xong
            const data = {
                name: value.name,
                categoryId: currentCate.value,
                images: uploadedUrls.join(",") // Nối danh sách URL thành chuỗi
            };

            await createNailDesignTemplate(data) // Gửi dữ liệu lên server
                .then((res) => {
                    if (res.code == 200) {
                        openNotificationWithIcon(
                            "success",
                            "Thêm mẫu",
                            "Thêm mẫu thành công"
                        );
                        setChange(!change);
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "Thêm mẫu",
                            res.message
                        );
                    }
                });
        } catch (error) {
            openNotificationWithIcon("error", "Thêm mẫu", "Thêm mẫu thất bại");
        }
        setLoading(false);
    };

    const handleChangeType = (fileList) => {
        const objCate = (key) => categories.find((item) => item.value === key);
        setCurrentCate(objCate(fileList)); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
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
                            onChange={(fileList) => handleChange(0, fileList)}
                        >
                            {images[0] ? (
                                <img
                                    src={images[0]}
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
                            }} // Căn trái label
                            name="type"
                            label="Type"
                            rules={[{ required: true }]}
                            // Chiếm 1 phần trong 3 phần
                        >
                            <Select
                                onChange={handleChangeType}
                                defaultValue={currentCate.label ?? "màu"}
                                style={{ width: "100%" }}
                                placeholder="Select type"
                                options={categories}
                            />
                        </Form.Item>
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
                <div
                    className="d-flex w-100"
                    style={{ display: "flex", gap: "25px", height: "150px" }}
                >
                    {currentCate.value === 1 ||
                    currentCate.label === "màu" ||
                    currentCate.label === "color" ? (
                        <>
                            <Form.Item
                                name="Image"
                                label="first nail"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(1, fileList)
                                    }
                                >
                                    {images[1] ? (
                                        <img
                                            src={images[1]}
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
                            <Form.Item
                                name="Image"
                                label="second nail"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(2, fileList)
                                    }
                                >
                                    {images[2] ? (
                                        <img
                                            src={images[2]}
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
                            <Form.Item
                                name="Image"
                                label="third nail"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(3, fileList)
                                    }
                                >
                                    {images[3] ? (
                                        <img
                                            src={images[3]}
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
                            <Form.Item
                                name="Image"
                                label="fourth nail"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(4, fileList)
                                    }
                                >
                                    {images[4] ? (
                                        <img
                                            src={images[4]}
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
                            <Form.Item
                                name="Image"
                                label="fifth nail"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(5, fileList)
                                    }
                                >
                                    {images[5] ? (
                                        <img
                                            src={images[5]}
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
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name="Image"
                                label="icon"
                                layout="vertical"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="design-child"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(fileList) =>
                                        handleChange(1, fileList)
                                    }
                                >
                                    {images[1] ? (
                                        <img
                                            src={images[1]}
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
                        </>
                    )}
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="py-3">
                        Tạo thiết kế
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default DesignCreate;
