import React, { useEffect, useState } from "react";
import { getCategory } from "@/apis/categoryService";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Space,
    Typography,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Upload
} from "antd";
// api
import { createProduct } from "@/apis/productService";
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ProductCreatePage = () => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategory().then((res) => {
            const formattedCategories = res.result.map((category) => ({
                label: category.name, // Đặt tên category thành label
                value: category.id // Đặt id category thành value
            }));
            setCategories(formattedCategories);
        });
    }, []);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        console.log(
            "Design names:",
            values.designs.map((design) => design.designName)
        );

        formData.append(
            "product",
            new Blob(
                [
                    JSON.stringify({
                        name: values.name,
                        price: values.price,
                        stock: values.stock,
                        description: values.description,
                        discount: values.discount,
                        isActive: values.isActive,
                        designs: values.designs?.map((design) => ({
                            name: design.designName
                        })),
                        categoryIds: values.categories
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
            // const response = await createProduct(formData);
            // console.log("Product created successfully:", response.data);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div>
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
                    label="Product Picture"
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
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={1} defaultValue={100000} />
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={1} defaultValue={10} />
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
                <Form.Item label="Designs">
                    <Form.List name="designs">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card
                                        size="small"
                                        title={`Design ${key + 1}`}
                                        key={key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => remove(name)}
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
                                                beforeUpload={() => false}
                                            >
                                                <PlusOutlined />
                                                <div>Upload</div>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "designName"]}
                                            label="Design Name"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Card>
                                ))}
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
                <Form.Item name="description" label="Description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="discount"
                    label="Discount"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={0} defaultValue={0} />
                </Form.Item>
                <Form.Item
                    name="isActive"
                    label="Is Active"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item wrapperCol={{ span: 14, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductCreatePage;
