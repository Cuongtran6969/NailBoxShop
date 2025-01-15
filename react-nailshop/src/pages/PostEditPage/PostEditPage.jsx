import { useEffect, useState } from "react";
import Editor from "@components/Editor/Editor";
import styles from "./styles.module.scss";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, notification } from "antd";
import { createPost, getPostDetail, updatePost } from "@/apis/postService";
import { useParams } from "react-router-dom";
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function PostCreatePage() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { container } = styles;
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [fileList, setFileList] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };

    const [oldImage, setOldImages] = useState("");
    useEffect(() => {
        if (id) {
            setLoading(true);
            getPostDetail(id)
                .then((res) => {
                    form.setFieldsValue({
                        title: res.result.title,
                        description: res.result.description
                    });
                    setOldImages(res.result.image);
                    const formattedFileList = {
                        uid: `0`,
                        url: res.result.image,
                        name: `Image`
                    };
                    setFileList([formattedFileList]);
                    setContent(res.result.content);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        }
    }, [id]);

    const fetchApiUpdate = async (data) => {
        await updatePost(data)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Cập nhật bài viết",
                    "Cập nhật bài viết thành công"
                );
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Cập nhật bài viết",
                    "Cập nhật bài viết thất bại"
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
                        id: id,
                        title: value.title,
                        description: value.description,
                        content: content,
                        image: oldImage
                    })
                ],
                { type: "application/json" }
            )
        );

        fileList.forEach((file) => {
            formData.append("image", file.originFileObj);
        });

        fetchApiUpdate(formData);
    };
    const handleRemoveImage = () => {
        setFileList([]);
    };
    return (
        <div className={container}>
            {contextHolder}
            {loading ? (
                <></>
            ) : (
                <>
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
                        <Form.Item name="image" label="Picture">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={({ fileList }) =>
                                    setFileList(fileList)
                                }
                                onRemove={handleRemoveImage}
                                beforeUpload={() => false}
                                maxCount={1}
                                min
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
                                Cập nhật bài viết
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
}

export default PostCreatePage;
