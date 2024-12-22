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
    Spin,
    message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductDesign from "./ProductDesign"; // Import the new DesignManagement component
import DesignAdmin from "./DesignAdmin";
import { Row, Col } from "react-bootstrap";

const { TextArea } = Input;

const ProductAdminDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [designs, setDesigns] = useState([]);
    const [designList, setDesignList] = useState([]);
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [productRes, categoryRes] = await Promise.all([
                    getProductDetail(id),
                    getCategory()
                ]);

                const pictures = productRes.result.pictures || "";
                const formattedFileList = pictures
                    .split(",")
                    .map((url, index) => ({
                        uid: index.toString(),
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
                    isActive: productRes.result.isActive
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

    const updateDesign = async (updatedDesign) => {};

    const handleSubmit = async (values) => {
        console.log("Product Data Submitted:", values);
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
    if (loading) {
        return <Spin tip="Loading..." />;
    }

    return (
        <Row>
            <Col sm={6}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    style={{ flex: 1 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Product Images">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
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
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} />
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
                        <Select mode="multiple" options={categories} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
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
        </Row>
    );
};

export default ProductAdminDetail;
