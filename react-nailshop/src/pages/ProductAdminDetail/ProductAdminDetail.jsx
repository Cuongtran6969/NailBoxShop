import React, { useEffect, useState } from "react";
import {
    getProductDetail,
    updateProduct,
    deleteDesign
} from "@/apis/productService";
import { getCategory } from "@/apis/categoryService";
import { useParams } from "react-router-dom";
import {
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Upload,
    Button,
    notification,
    message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DesignAdmin from "./DesignAdmin";
import { Row, Col } from "react-bootstrap";
import Editor from "@components/Editor/Editor";
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

const ProductAdminDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [designs, setDesigns] = useState([]);
    const [designList, setDesignList] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [content, setContent] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [productRes, categoryRes] = await Promise.all([
                    getProductDetail(id),
                    getCategory()
                ]);

                const pictures = productRes.result.pictures || "";
                const formattedOldImages = pictures
                    .split(",")
                    .map((url) => url.trim());

                setOldImages(formattedOldImages);

                const formattedFileList = pictures
                    .split(",")
                    .map((url, index) => ({
                        uid: `old-${index}`,
                        url: url.trim(),
                        name: `Image-${index + 1}`
                    }));
                setFileList(formattedFileList);

                form.setFieldsValue({
                    name: productRes.result.name,
                    price: productRes.result.price,
                    stock: productRes.result.stock,
                    categories: productRes.result.categories.map((c) => c.id),
                    description: productRes.result.description,
                    discount: productRes.result.discount,
                    isActive: productRes.result.isActive,
                    size: productRes.result.size
                        ? productRes.result.size.split(",")
                        : []
                });

                setProduct(productRes.result);
                setDesignList(productRes.result.designs);

                const formattedCategories = categoryRes.result.map(
                    (category) => ({
                        label: category.name,
                        value: category.id
                    })
                );

                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    const handleSubmit = async (values) => {
        console.log(values);

        const formData = new FormData();
        if (
            values.productImages?.fileList.length == 0 &&
            oldImages.length == 0
        ) {
            openNotificationWithIcon(
                "warning",
                "Thiếu thông tin",
                "Cần thêm ảnh cho sản phẩm"
            );
            return;
        }
        formData.append(
            "product",
            new Blob(
                [
                    JSON.stringify({
                        id: id,
                        name: values.name,
                        price: values.price,
                        stock: values.stock,
                        description: content,
                        discount: values.discount,
                        isActive: values.isActive,
                        categoryIds: values.categories,
                        size: values.size.join(),
                        oldImages
                    })
                ],
                { type: "application/json" }
            )
        );

        fileList.forEach((file) => {
            formData.append("productImages", file.originFileObj);
        });
        try {
            setLoading(true);
            const response = await updateProduct(formData);
            console.log("Product update successfully:", response);
            message.success("Product update successfully");
        } catch (error) {
            console.error("Error creating product:", error);
            message.success("Error update product");
        }
        setLoading(false);
    };
    const handleRemoveImage = (file) => {
        if (file.uid.startsWith("old-")) {
            setOldImages((prev) => prev.filter((url) => url !== file.url));
        }
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    };

    const handleRemove = async (id, oldId) => {
        console.log(`deleteId: ${(id, oldId)}`);
        if (!(id + "").startsWith("newDesign-count")) {
            setLoading(true);
            try {
                const response = await deleteDesign(id);
                message.success(response.message);
                setDesignList((prev) =>
                    prev.filter(
                        (design) => design.id !== id && design.id !== oldId
                    )
                );
            } catch (error) {
                message.error("Error deleting design");
            } finally {
                setLoading(false);
            }
        } else {
            setDesignList((prev) => prev.filter((design) => design.id !== id));
        }
    };
    const handleAddDesign = () => {
        const newDesignCount =
            designList.filter((design) =>
                (design.id + "").startsWith("newDesign-count")
            ).length + 1;

        const newDesign = {
            id: `newDesign-count-${newDesignCount}`,
            name: "",
            picture: ""
        };

        setDesignList([...designList, newDesign]);
    };

    return (
        <div style={{ height: "90vh", overflowY: "scroll" }}>
            <Row>
                {contextHolder}
                {loading ? (
                    <></>
                ) : (
                    <>
                        <Col sm={6}>
                            <Form
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                                style={{ flex: 1 }}
                                onFinish={handleSubmit}
                            >
                                <Form.Item
                                    label="Product Images"
                                    name="productImages"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={({ fileList }) =>
                                            setFileList(fileList)
                                        }
                                        onRemove={handleRemoveImage}
                                        beforeUpload={() => false}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>
                                                Upload
                                            </div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    label="Product Name"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber min={0} />
                                </Form.Item>
                                <Form.Item
                                    name="stock"
                                    label="Stock"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber min={0} />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Editor
                                        onChange={(e) => setContent(e.markdown)}
                                        initialValue={content}
                                    />
                                </Form.Item>
                                <Form.Item name="discount" label="Discount">
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                                <Form.Item
                                    name="isActive"
                                    label="Active"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                                <Form.Item name="categories" label="Categories">
                                    <Select
                                        mode="multiple"
                                        options={categories}
                                    />
                                </Form.Item>
                                <Form.Item name="size" label="Size">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        placeholder="Select size"
                                        options={sizeOption}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Update info
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            {designList.map((design) => {
                                console.log(design);

                                return (
                                    <DesignAdmin
                                        key={design.id}
                                        design={design}
                                        productId={id}
                                        handleRemove={handleRemove}
                                    />
                                );
                            })}
                            <Button
                                type="dashed"
                                style={{ marginTop: "1rem" }}
                                block
                                onClick={handleAddDesign}
                            >
                                Add Design
                            </Button>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
};

export default ProductAdminDetail;
