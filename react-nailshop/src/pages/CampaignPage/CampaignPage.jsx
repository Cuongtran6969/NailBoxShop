import React, { useEffect, useState } from "react";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Spin,
    Switch,
    Alert,
    notification
} from "antd";
import Marquee from "react-fast-marquee";
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
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            CHÚ Ý: Tạo chiến dịch để hiện thị ở trang chính, mục
                            đích làm nổi bật các sản phẩm cần bán ra.
                        </Marquee>
                    }
                />
            </Col>
            <Col sm={12} className="mt-5">
                <Form
                    size="large"
                    {...formItemLayout}
                    form={form}
                    variant={"outlined"}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Tên chiến dịch"
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
                        label="Mô tả"
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
                        label="Thời gian diễn ra"
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
                        label="Số lượng"
                        rules={[
                            {
                                required: false
                            }
                        ]}
                    >
                        <span className="fs-6">
                            {" "}
                            <strong>{productIds.length}</strong> Sản phẩm được
                            chọn cho chiến dịch này
                        </span>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái hoạt động"
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
                            Thêm
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
