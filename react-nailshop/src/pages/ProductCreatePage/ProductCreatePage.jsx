import React, { useEffect, useState } from "react";
import { getCategory } from "@/apis/categoryService";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    notification,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Upload
} from "antd";
import { createProduct } from "@/apis/productService";
import Editor from "@components/Editor/Editor";
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const sizeOption = [
    {
        label: "S",
        value: "S"
    },
    {
        label: "M",
        value: "M"
    },
    {
        label: "L",
        value: "L"
    },
    {
        label: "XL",
        value: "XL"
    }
];
const ProductCreatePage = () => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    useEffect(() => {
        getCategory().then((res) => {
            const formattedCategories = res.result.map((category) => ({
                label: category.name, // Đặt tên category thành label
                value: category.id // Đặt id category thành value
            }));
            setCategories(formattedCategories);
        });
    }, []);
    const renderSkeletons = () => (
        <Row className="gx-3 gy-2 " style={{ marginLeft: "150px" }}>
            <Col sd={12}>
                <Row>
                    <div className="d-flex">
                        <Skeleton
                            width={100}
                            height={100}
                            style={{ marginTop: "30px" }}
                        />
                    </div>
                </Row>
                <Row className="gx-3 mt-2">
                    <div className="mt-3">
                        <Skeleton width="40%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="10%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="10%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="40%" height={35} />
                    </div>

                    <div className="mt-3">
                        <Skeleton width="40%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="40%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="40%" height={80} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="10%" height={35} />
                    </div>
                    <div className="mt-3">
                        <Skeleton width="10%" height={35} />
                    </div>
                    <div className="mt-5">
                        <Skeleton width="5%" height={35} />
                    </div>
                </Row>
            </Col>
        </Row>
    );
    const handleSubmit = async (values) => {
        const formData = new FormData();
        console.log(values);
        if (!values.productImages || values.productImages?.length == 0) {
            openNotificationWithIcon(
                "warning",
                "Thiếu thông tin",
                "Cần thêm ảnh cho sản phẩm"
            );
            return;
        }
        for (let design of values.designs || []) {
            if (!design.image || !design.designName) {
                openNotificationWithIcon(
                    "warning",
                    "Thiếu thông tin cho design",
                    "Cần thêm đầy đủ ảnh và tên của các mẫu"
                );
                return; // Dừng hàm nếu thiếu thông tin cho design
            }
            if (design.image?.[0]) {
                formData.append("designImages", design.image[0].originFileObj);
            }
        }

        formData.append(
            "product",
            new Blob(
                [
                    JSON.stringify({
                        name: values.name,
                        price: values.price,
                        stock: values.stock,
                        description: content,
                        discount: values.discount,
                        isActive: values.isActive,
                        designs: values.designs?.map((design) => ({
                            name: design.designName
                        })),
                        sold: 0,
                        categoryIds: values.categories,
                        size: values.size ? values.size.join() : ""
                    })
                ],
                { type: "application/json" }
            )
        );

        values.productImages?.forEach((file) => {
            formData.append("productImages", file.originFileObj);
        });
        values.designs?.forEach((design) => {
            if (design.image?.[0]) {
                formData.append("designImages", design.image[0].originFileObj);
            }
        });
        try {
            setLoading(true);
            await createProduct(formData)
                .then((res) => {
                    openNotificationWithIcon(
                        "success",
                        "Tạo sản phẩm",
                        "Tạo sản phẩm thành công"
                    );
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        "error",
                        "Tạo sản phẩm",
                        "Tạo sản phẩm thất bại"
                    );
                });
        } catch (error) {
            openNotificationWithIcon(
                "error",
                "Tạo sản phẩm",
                "Tạo sản phẩm thất bại"
            );
        }
        setLoading(false);
    };

    return (
        <div>
            {contextHolder}
            {loading ? (
                renderSkeletons()
            ) : (
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    form={form}
                    style={{ maxWidth: 800 }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="productImages"
                        label="Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture-card"
                            multiple={true}
                            beforeUpload={() => false}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none"
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8
                                    }}
                                >
                                    Upload
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Số lượng"
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item
                        name="categories"
                        label="Categories"
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: "100%"
                            }}
                            placeholder="Select categories"
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item
                        name="size"
                        label="Size"
                        rules={[{ required: false }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: "100%"
                            }}
                            placeholder="Select size"
                            options={sizeOption}
                        />
                    </Form.Item>
                    <Form.Item label="Thiết kế">
                        <Form.List name="designs">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        ({ key, name, ...restField }) => (
                                            <Card
                                                size="small"
                                                title={`Design ${key + 1}`}
                                                key={key}
                                                extra={
                                                    <CloseOutlined
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                    />
                                                }
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "image"]}
                                                    label="Design Image"
                                                    valuePropName="fileList"
                                                    getValueFromEvent={normFile}
                                                >
                                                    <Upload
                                                        listType="picture-card"
                                                        beforeUpload={() =>
                                                            false
                                                        }
                                                    >
                                                        <PlusOutlined />
                                                        <div>Upload</div>
                                                    </Upload>
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "designName"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Yêu cầu nhập tên thiết kế "
                                                        }
                                                    ]}
                                                    label="Design Name"
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Card>
                                        )
                                    )}
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        Add Design
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Editor
                            onChange={(e) => setContent(e.markdown)}
                            initialValue={content}
                        />
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Giảm giá"
                        initialValue={0}
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} value={0} defaultValue={0} />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="Hoạt động"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch defaultChecked={false} />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item wrapperCol={{ span: 14, offset: 2 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default ProductCreatePage;
