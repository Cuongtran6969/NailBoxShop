import React, { useState } from "react";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Spin,
    Switch,
    message,
    notification
} from "antd";
import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined
} from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";
import ProductManage from "@pages/ProductManage/ProductManage";
const { RangePicker } = DatePicker;
import { createCampaign } from "@/apis/campaignService";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 14
        }
    }
};
const CampaignPage = () => {
    const [form] = Form.useForm();
    const [productIds, setProductIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const variant = Form.useWatch("variant", form);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const handleSubmit = async (values) => {
        if (productIds.length == 0) {
            openNotificationWithIcon(
                "warning",
                "Có lỗi xảy ra",
                "Vui lòng chọn sản phẩm cho chiến dịch này"
            );
            return;
        }
        setLoading(true);
        const data = {
            name: values.name,
            description: values.description,
            startTime: values.dateTime[0].format("YYYY-MM-DDTHH:mm:ss"),
            endTime: values.dateTime[1].format("YYYY-MM-DDTHH:mm:ss"),
            status: values.status,
            productIds: productIds
        };
        try {
            const response = await createCampaign(data);
            openNotificationWithIcon(
                "success",
                "Tạo thành công",
                response.message
            );
        } catch (error) {
            openNotificationWithIcon("error", "Xảy ra lỗi", error);
        }
        setLoading(false);
    };
    const handleProductSelection = (selectedProductIds) => {
        setProductIds(selectedProductIds); // Update the productIds state
    };

    return (
        <Row>
            {contextHolder}
            <Col sm={12}>
                <h3 className="text-center">Campaign</h3>
            </Col>
            <Col sm={12}>
                <Form
                    {...formItemLayout}
                    form={form}
                    variant={"outlined"}
                    style={{
                        maxWidth: 600
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please name!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please description!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="RangePicker"
                        name="dateTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input!"
                            }
                        ]}
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Is Active"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col sm={12}>
                <ProductManage onProductSelection={handleProductSelection} />
            </Col>
        </Row>
    );
};
export default CampaignPage;
