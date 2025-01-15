import { getProvince, getDistrict, getWard } from "@/apis/giaohanhnhanhService";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    notification,
    Skeleton
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getShopInfo, updateShopInfo } from "@/apis/shopService";

const ShopManage = () => {
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [initForm, setInitForm] = useState({
        name: "",
        shop_id: "",
        token: "",
        description: "",
        phone: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_code: "",
        ward_name: "",
        bank_code: "",
        bank_name: "",
        bank_account_name: "",
        boxLength: "",
        boxWidth: "",
        boxHeight: "",
        boxWeight: ""
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
    useEffect(() => {
        const getInfoInit = async () => {
            try {
                setLoading(true);
                const resShopInfo = await getShopInfo();
                setInitForm(resShopInfo.result);

                const res = await getProvince();
                const provincesData = res.data.map((province) => ({
                    value: province.ProvinceID.toString(),
                    label: province.ProvinceName
                }));
                console.log(provincesData);
                setProvince(provincesData);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        getInfoInit();
    }, []);

    useEffect(() => {
        const fetchApiDistrict = async () => {
            if (!initForm.province_id) return;
            try {
                const res = await getDistrict(initForm.province_id);
                const formattedOptions = res.data.map((district) => ({
                    value: district.DistrictID.toString(),
                    label: district.DistrictName
                }));
                setDistrict(formattedOptions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApiDistrict();
    }, [initForm.province_id]);

    useEffect(() => {
        const fetchApiWard = async () => {
            if (!initForm.district_id) return;
            try {
                const res = await getWard(initForm.district_id);
                const formattedOptions = res.data.map((ward) => ({
                    value: ward.WardCode.toString(),
                    label: ward.WardName
                }));
                setWard(formattedOptions);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApiWard();
    }, [initForm.district_id]);

    const handleUpdateShopInfo = async () => {
        console.log(initForm);
        await updateShopInfo(initForm)
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Cập nhật thành công",
                    "Thông tin được cập nhật thành công"
                );
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Cập nhật thất bại",
                    "Thông tin được cập nhật thất bại"
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
                onFinish={handleUpdateShopInfo}
                autoComplete="off"
            >
                {/* Shop name */}
                <Form.Item
                    label="Shop name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input shop name!"
                        }
                    ]}
                >
                    <Input
                        defaultValue={initForm.name}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }
                        value={initForm.name}
                    />
                </Form.Item>

                {/* Phone */}
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Phone!"
                        }
                    ]}
                >
                    <Input
                        defaultValue={initForm.phone}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                phone: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                {/* Bank info */}
                <Form.Item
                    label="Bank name"
                    name="bank_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your bank name!"
                        }
                    ]}
                >
                    <Input
                        defaultValue={initForm.bank_name}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                bank_name: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Số tài khoản ngân hàng"
                    name="bank_code"
                    rules={[
                        {
                            required: true,
                            message: "Please input your bank code!"
                        }
                    ]}
                >
                    <Input
                        defaultValue={initForm.bank_code}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                bank_code: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                {/* Token and ShopId */}
                <Form.Item
                    label="Token dvvc"
                    name="token"
                    rules={[
                        {
                            required: true,
                            message: "Please input your token shop!"
                        }
                    ]}
                >
                    <Input.Password
                        defaultValue={initForm.token}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                token: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Shop id"
                    name="shop_id"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Shop Id!"
                        }
                    ]}
                >
                    <Input
                        defaultValue={initForm.shop_id}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                shop_id: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                {/* Address fields */}
                <Row gutter={21}>
                    <Col span={5}></Col>
                    <Col span={16}>
                        <Form.Item
                            labelCol={{
                                span: 4
                            }}
                            label="Tỉnh/thành"
                            name="province_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                        >
                            <Select
                                id="province"
                                name="province"
                                showSearch
                                style={{ width: "100%" }}
                                size="large"
                                placeholder="Chọn tỉnh/thành phố"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                        )
                                }
                                onChange={(value, option) => {
                                    setDistrict([]);
                                    setWard([]);
                                    setInitForm({
                                        ...initForm,
                                        province_id: value,
                                        province_name: option.label,
                                        district_id: "",
                                        district_name: "",
                                        ward_code: "",
                                        ward_name: ""
                                    });
                                }}
                                options={province}
                                value={initForm.province_id}
                                defaultValue={initForm.province_name}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={21}>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            label="Quận/huyện"
                            name="district_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                        >
                            <Select
                                id="district"
                                name="district"
                                showSearch
                                style={{ width: "100%" }}
                                size="large"
                                placeholder="Chọn quận/huyện"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                        )
                                }
                                onChange={(value, option) => {
                                    setWard([]);
                                    setInitForm({
                                        ...initForm,
                                        district_id: value,
                                        district_name: option.label,
                                        ward_code: "",
                                        ward_name: ""
                                    });
                                }}
                                options={district}
                                value={initForm.district_id}
                                defaultValue={initForm.district_name}
                                disabled={!initForm.province_id}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            label="Phường/xã"
                            name="ward_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                        >
                            <Select
                                id="ward"
                                name="ward"
                                showSearch
                                style={{ width: "100%" }}
                                size="large"
                                placeholder="Chọn xã/phường"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                        )
                                }
                                onChange={(value, option) => {
                                    setInitForm({
                                        ...initForm,
                                        ward_code: value,
                                        ward_name: option.label
                                    });
                                }}
                                options={ward}
                                value={initForm.ward_code}
                                defaultValue={initForm.ward_name}
                                disabled={!initForm.district_id}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Dimensions */}
                <Row gutter={15}>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                            label="Chiều dài"
                            name="boxLength"
                        >
                            <InputNumber
                                defaultValue={initForm.boxLength}
                                onChange={(value) =>
                                    setInitForm((prev) => ({
                                        ...prev,
                                        boxLength: value
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                            label="Chiều rộng"
                            name="boxWidth"
                        >
                            <InputNumber
                                defaultValue={initForm.boxWidth}
                                onChange={(value) =>
                                    setInitForm((prev) => ({
                                        ...prev,
                                        boxWidth: value
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                            label="Chiều cao"
                            name="boxHeight"
                        >
                            <InputNumber
                                defaultValue={initForm.boxHeight}
                                onChange={(value) =>
                                    setInitForm((prev) => ({
                                        ...prev,
                                        boxHeight: value
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{
                                span: 8
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input!"
                                }
                            ]}
                            label="Cân nặng"
                            name="boxWeight"
                        >
                            <InputNumber
                                defaultValue={initForm.boxWeight}
                                onChange={(value) =>
                                    setInitForm((prev) => ({
                                        ...prev,
                                        boxWeight: value
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please input your description!"
                        }
                    ]}
                >
                    <TextArea
                        defaultValue={initForm.description}
                        onChange={(e) =>
                            setInitForm((prev) => ({
                                ...prev,
                                description: e.target.value
                            }))
                        }
                    />
                </Form.Item>

                {/* Submit button */}
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

export default ShopManage;
