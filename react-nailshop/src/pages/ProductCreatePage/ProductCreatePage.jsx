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

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i
    });
}
const handleChange = (value) => {
    console.log(`selected ${value}`);
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

    return (
        <div>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                form={form}
                style={{ maxWidth: 800 }}
                autoComplete="off"
            >
                <Form.Item
                    label="Picture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        multiple={true}
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
                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Price">
                    <InputNumber min={1} defaultValue={100000} />
                </Form.Item>
                <Form.Item label="Stock">
                    <InputNumber min={1} defaultValue={10} />
                </Form.Item>
                <Form.Item label="Select">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: "100%"
                        }}
                        placeholder="Please select"
                        defaultValue={[]}
                        // onChange={handleChange}
                        options={categories}
                    />
                    {/* <Select>
                    {categories.map((option) => (
                        <Select.Option value={option.id} key={option.id}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select> */}
                </Form.Item>
                {/* New Design Field Section */}
                <Form.Item label="Designs">
                    <Form.List name="designs">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(
                                    ({
                                        key,
                                        name,
                                        fieldKey,
                                        fieldData,
                                        ...restField
                                    }) => (
                                        <Card
                                            size="small"
                                            title={`Design ${name + 1}`}
                                            key={key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => remove(name)}
                                                />
                                            }
                                        >
                                            {/* Image Upload */}
                                            <Form.Item
                                                {...restField}
                                                name={[name, "image"]}
                                                label="Design Image"
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                            >
                                                <Upload
                                                    action="/upload.do"
                                                    listType="picture-card"
                                                    multiple={false}
                                                >
                                                    <PlusOutlined />
                                                    <div>Upload</div>
                                                </Upload>
                                            </Form.Item>
                                            {/* Design Name */}
                                            <Form.Item
                                                {...restField}
                                                name={[name, "designName"]}
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
                                    icon={<PlusOutlined />}
                                >
                                    Add Design
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item label="TextArea">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Discount">
                    <InputNumber min={0} defaultValue={0} />
                </Form.Item>
                <Form.Item label="IsActive" valuePropName="checked">
                    <Switch />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item wrapperCol={{ span: 14, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                {/* Debug: Display form values */}
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>
                                {JSON.stringify(form.getFieldsValue(), null, 2)}
                            </pre>
                        </Typography>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductCreatePage;
