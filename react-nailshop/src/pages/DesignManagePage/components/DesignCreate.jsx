import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getNailCategory } from "@/apis/nailDesignService";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload, notification } from "antd";
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

function DesignCreate() {
    const [loading, setLoading] = useState(false);
    const [loadingCloud, setLoadingCloud] = useState(false);
    const [images, setImages] = useState(["", "", "", "", "", ""]);
    const [url, setUrl] = useState("");
    const [type, setType] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCate, setCurrentCate] = useState([]);
    const [form] = Form.useForm();
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

    const uploadImage = async () => {
        setLoadingCloud(true);
        const data = new FormData();
        for (let image in images) {
            data.append("file", image);
            data.append("upload_preset", process.env.VITE_CLOUDINARY_PRESET);
            data.append("cloud_name", process.env.VITE_CLOUDINARY_NAME);
            // data.append("folder", "Cloudinary-React");
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data
                }
            );
            const res = await response.json();
            setUrl((prev) => {
                return [...prev, res.public_id];
            });
        }
        setLoadingCloud(false);
    };

    const handleSubmit = () => {};

    if (loading) return <>....</>;

    const handleChangeType = (value) => {
        console.log(value);
        const objCate = (key) => categories.find((item) => item.value === key);
        setCurrentCate(objCate(value)); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    };
    return (
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
                        onChange={(value) => handleChange(0, value)}
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
                            style={{ width: "30%" }}
                            placeholder="Select type"
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{
                            flex: "80px",
                            style: { textAlign: "left" }
                        }}
                        name="Name"
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input style={{ width: "30%" }} />
                    </Form.Item>
                </div>
            </div>
            <div
                className="d-flex w-100"
                style={{ display: "flex", gap: "25px", height: "150px" }}
            >
                {currentCate.value === 1 || currentCate.label === "color" ? (
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
                                onChange={(value) => handleChange(1, value)}
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
                                onChange={(value) => handleChange(2, value)}
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
                                onChange={(value) => handleChange(3, value)}
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
                                onChange={(value) => handleChange(4, value)}
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
                                onChange={(value) => handleChange(5, value)}
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
                        <Form.Item name="Image" label="icon" layout="vertical">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="design-child"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={(value) => handleChange(1, value)}
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
    );
}

export default DesignCreate;
