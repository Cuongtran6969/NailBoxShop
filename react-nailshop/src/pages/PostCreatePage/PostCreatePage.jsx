import { useState } from "react";
import Editor from "./Editor";
import styles from "./styles.module.scss";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function PostCreatePage() {
    const [form] = Form.useForm();
    const { container } = styles;
    const [html, setHtml] = useState("");

    const handleSubmit = (value) => {
        console.log(value);
        console.log("html" + html);
    };

    return (
        <div className={container}>
            <Form
                form={form}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 18
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="image"
                    label="Picture"
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
                <Form.Item name="title" label="Tiêu đề bài viết">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <Input />
                </Form.Item>
                <Form.Item label="Bài viết">
                    <Editor onChange={(e) => setHtml(e.html)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save bài viết
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PostCreatePage;
