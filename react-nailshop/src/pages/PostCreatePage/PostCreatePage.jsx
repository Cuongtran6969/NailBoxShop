import { useEffect, useState } from "react";
import Editor from "@components/Editor/Editor";
import styles from "./styles.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, notification } from "antd";
import { createPost, getPostDetail, updatePost } from "@/apis/postService";
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function PostCreatePage() {
    const [form] = Form.useForm();
    const { container } = styles;
    const [content, setContent] = useState("");
    const [fileList, setFileList] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const fetchApiCreate = async (data) => {
        await createPost(data)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Tạo bài viết",
                    "Tạo bài viết thành công"
                );
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Tạo bài viết",
                    "Tạo bài viết thất bại"
                );
            });
    };

    const handleSubmit = (value) => {
        console.log(value);

        const formData = new FormData();

        formData.append(
            "post",
            new Blob(
                [
                    JSON.stringify({
                        title: value.title,
                        description: value.description,
                        content: content
                    })
                ],
                { type: "application/json" }
            )
        );

        formData.append("image", value.image[0].originFileObj);

        fetchApiCreate(formData);
    };
    const handleRemoveImage = () => {
        setFileList([]);
    };
    return (
        <div className={container}>
            {contextHolder}
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
                        maxCount={1}
                        listType="picture-card"
                        multiple={true}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        onRemove={handleRemoveImage}
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
                    <Editor
                        onChange={(e) => setContent(e.markdown)}
                        initialValue={content}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo bài viết
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PostCreatePage;
