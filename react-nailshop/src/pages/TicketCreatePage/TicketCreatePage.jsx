import { getProvince, getDistrict, getWard } from "@/apis/giaohanhnhanhService";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
    notification,
    Skeleton
} from "antd";
const { RangePicker } = DatePicker;
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getShopInfo, updateShopInfo } from "@/apis/shopService";
import { createVoucher } from "@/apis/voucherService";
const TicketCreatePage = () => {
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [initForm, setInitForm] = useState({
        type: "",
        amount: "",
        number: "",
        dateTime: ""
    });
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };

    const handleCreateVoucher = async (values) => {
        console.log(initForm);
        const data = {
            type: values.type,
            amount: values.amount,
            number: values.number,
            startTime: values.dateTime[0].format("YYYY-MM-DDTHH:mm:ss"),
            endTime: values.dateTime[1].format("YYYY-MM-DDTHH:mm:ss")
        };
        await createVoucher(data)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Tạo mã voucher thành công",
                    "Danh sách các mã voucher được tạo thành công"
                );
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Tạo mã voucher thất bại",
                    "Xảy ra lỗi"
                );
            });
    };
    if (loading) {
        return <Skeleton width={800} />;
    }

    return (
        <>
            {contextHolder}
            <Form
                labelAlign="left"
                name="basic"
                labelCol={{
                    span: 5
                }}
                wrapperCol={{
                    span: 16
                }}
                style={{
                    maxWidth: 900
                }}
                initialValues={initForm}
                onFinish={handleCreateVoucher}
                autoComplete="off"
            >
                <Form.Item
                    name="type"
                    label="Thể loại"
                    rules={[{ required: true }]}
                >
                    <Select
                        allowClear
                        style={{
                            width: "100%"
                        }}
                        placeholder="Select categories"
                        options={[
                            {
                                label: "Giảm giá đơn hàng",
                                value: "DISCOUNT"
                            },
                            {
                                label: "Miễn phí vận chuyển",
                                value: "FREE_SHIP"
                            }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Giá trị"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input your amount!"
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="number"
                    rules={[
                        {
                            required: true,
                            message: "Please input number!"
                        }
                    ]}
                >
                    <InputNumber />
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
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default TicketCreatePage;
