import React, { useEffect, useState } from "react";
import {
    Card,
    Form,
    Input,
    Upload,
    Button,
    Spin,
    Popconfirm,
    message
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import {
    updateDesign,
    deleteDesign,
    createDesign
} from "@/apis/productService";

function DesignAdmin({ design, productId, handleRemove }) {
    const [fileLists, setFileLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form

    useEffect(() => {
        let fileImage = [
            {
                uid: design.id,
                url: design.picture,
                name: `Design-${design.id}`
            }
        ];
        setFileLists(fileImage);

        // Đặt giá trị mặc định cho form
        form.setFieldsValue({
            id: design.id,
            oldId: design.id,
            name: design.name
        });
    }, [design, form]);

    const handleUploadChange = (info) => {
        const updatedFileList = [...info.fileList];
        setFileLists(updatedFileList);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append(
            "design",
            new Blob(
                [
                    JSON.stringify({
                        id: values.id,
                        name: values.name
                    })
                ],
                { type: "application/json" }
            )
        );

        const file = fileLists[0]?.originFileObj;
        formData.append("image", file);

        try {
            let response;
            if ((values.id + "").startsWith("newDesign-count")) {
                response = await createDesign(productId, formData);
            } else {
                response = await updateDesign(formData);
            }

            console.log(response);

            // Cập nhật file list và form fields sau khi update thành công
            const updatedDesign = response.result;
            let fileImage = [
                {
                    uid: updatedDesign.id,
                    url: updatedDesign.picture,
                    name: `Design-${updatedDesign.id}`
                }
            ];
            setFileLists(fileImage);

            // Cập nhật giá trị cho các trường trong form
            form.setFieldsValue({
                id: updatedDesign.id,
                name: updatedDesign.name
            });

            message.success(response.message);
        } catch (error) {
            message.error("Error updating design");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    return (
        <Card
            key={design.id}
            size="small"
            title={`Design ${design.id}`}
            extra={
                <Popconfirm
                    placement="leftBottom"
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() =>
                        handleRemove(
                            form.getFieldValue("id"),
                            form.getFieldValue("oldId")
                        )
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <CloseOutlined style={{ color: "red" }} />
                </Popconfirm>
            }
        >
            <Form
                form={form} // Liên kết form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item label="Design Id" name="id" hidden>
                    <Input readOnly /> {/* Để ID không thể chỉnh sửa */}
                </Form.Item>
                <Form.Item label="Design Image" name="image">
                    <Upload
                        listType="picture-card"
                        fileList={fileLists}
                        maxCount={1}
                        showUploadList={{ showRemoveIcon: false }}
                        beforeUpload={() => false}
                        onChange={(info) => handleUploadChange(info)}
                    >
                        <PlusOutlined />
                        <div>Update</div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Design Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {design.id ? "Update Design" : "Create New Design"}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default DesignAdmin;
