import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { getCampaignDetail, updateCampaign } from "@/apis/campaignService";
import { useParams } from "react-router-dom";

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
const CampaignUpdate = () => {
    const { id } = useParams();
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
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const campainRes = await getCampaignDetail(id);

                form.setFieldsValue({
                    name: campainRes.result.name,
                    description: campainRes.result.description,
                    dateTime: [
                        dayjs(campainRes.result.startTime),
                        dayjs(campainRes.result.endTime)
                    ],
                    status: campainRes.result.status
                });
                setProductIds(campainRes.result.products.map((p) => p.id));
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [id]);

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
            const response = await updateCampaign(id, data);
            openNotificationWithIcon(
                "success",
                "Cập nhật thành công",
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
                <h6 className="text-center">Tạo chiến dịch mới</h6>
            </Col>
            <Col sm={12} className="mt-5">
                <Form
                    {...formItemLayout}
                    size="large"
                    form={form}
                    variant={"outlined"}
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
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col sm={12}>
                <ProductManage
                    onProductSelection={handleProductSelection}
                    initCheckList={productIds}
                />
            </Col>
        </Row>
    );
};
export default CampaignUpdate;
