import {
    Radio,
    Space,
    Tooltip,
    Select,
    Input,
    notification,
    Steps
} from "antd";
const { TextArea } = Input;
import InputCommon from "./InputComon/InputComon";
import { AuthContext } from "@contexts/AuthContext";
import styles from "./styles.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import PurchaseSummary from "./PurchaseSummary/PurchaseSummary";
import { useContext, useEffect, useState } from "react";
import { purchaseMethod } from "./constants";
import { getShipFee, getLeadtime } from "@/apis/shipmentService";
import { getProfile } from "@/apis/userService";
import { getShopInfo } from "@/apis/shopService";
import { getPaymentInfo } from "@/apis/paymentService";
import { createOrder } from "@/apis/orderService";
import { getProvince, getDistrict, getWard } from "@/apis/giaohanhnhanhService";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    createPaymentQR,
    getStatusPaymentQR,
    cancelPaymentQR
} from "@/apis/paymentService";
import { removeVoucher, removeItem } from "@redux/slice/cartSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
const steps = [
    {
        title: "Giỏ hàng"
    },
    {
        title: "Chi tiết thanh toán"
    },
    {
        title: "Đơn hàng hoàn tất"
    }
];
const service_type_id = 2;
function CheckoutPage() {
    const { list, listBuy, totalCheckout, voucher } = useSelector(
        (state) => state.cart
    );
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [orderLoading, setOrderLoading] = useState(false);
    const {
        purchaseBtn,
        labelSelect,
        containerInput,
        labelInput,
        boxInput,
        inputForm,
        errorText
    } = styles;
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [shipFee, setShipFee] = useState(null);
    const [shipDate, setShipDay] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shopInfo, setShopInfo] = useState(null);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const { authenticated } = useContext(AuthContext);
    const [initForm, setInitForm] = useState({
        name: "",
        phone: "",
        provinceId: null,
        districtId: null,
        wardId: null,
        provinceName: "",
        districtName: "",
        wardName: "",
        detail: "",
        paymentId: ""
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title
    }));
    useEffect(() => {
        if (!authenticated || listBuy.length === 0) {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                // Gọi API song song
                const [
                    provinceRes,
                    shopInfoRes,
                    paymentMethodRes,
                    userInfoRes
                ] = await Promise.all([
                    getProvince(),
                    getShopInfo(),
                    getPaymentInfo(),
                    getProfile()
                ]);

                // Xử lý kết quả
                const formattedProvinces = provinceRes.data.map((province) => ({
                    value: province.ProvinceID.toString(),
                    label: province.ProvinceName
                }));
                setProvince(formattedProvinces);
                setShopInfo(shopInfoRes.result);
                setPaymentMethod(paymentMethodRes.result);

                setInitForm((prev) => ({
                    ...prev,
                    name: userInfoRes.result.name ?? "",
                    phone: userInfoRes.result.phone ?? "",
                    paymentId: paymentMethodRes.result?.[0].id || ""
                }));
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [authenticated, listBuy, navigate]);

    useEffect(() => {
        const fetchApiDistrict = async () => {
            if (!initForm.provinceId) return;
            try {
                const res = await getDistrict(initForm.provinceId);
                const formattedOptions = res.data.map((district) => ({
                    value: district.DistrictID.toString(),
                    label: district.DistrictName
                }));

                setDistrict(formattedOptions);
            } catch (error) {}
        };
        setWard([]);
        setDistrict([]);
        setInitForm((prev) => ({
            ...prev,
            districtId: null,
            wardId: null
        }));
        fetchApiDistrict();
    }, [initForm.provinceId]);

    useEffect(() => {
        const fetchApiWard = async () => {
            if (!initForm.districtId) return;
            try {
                const res = await getWard(initForm.districtId);
                const formattedOptions = res.data.map((ward) => ({
                    value: ward.WardCode.toString(),
                    label: ward.WardName
                }));
                setWard(formattedOptions);
            } catch (error) {
                console.error(error);
            }
        };
        setWard([]);
        setInitForm((prev) => ({
            ...prev,
            wardId: null
        }));
        setShipFee(null);
        fetchApiWard();
    }, [initForm.districtId]);

    const getNumberDay = (leadtime) => {
        const leadtimeDate = new Date(leadtime * 1000);
        const currentDate = new Date();
        const timeDifference = leadtimeDate - currentDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        return Math.floor(daysDifference);
    };

    useEffect(() => {
        const fetchApiGetShipFee = async () => {
            const formData = {
                service_type_id: service_type_id,
                from_district_id: shopInfo.district_id,
                from_ward_code: shopInfo.ward_code + "",
                to_district_id: parseInt(initForm.districtId),
                to_ward_code: initForm.wardId,
                length: shopInfo.boxLength,
                width: shopInfo.boxWidth,
                height: shopInfo.boxHeight,
                weight: shopInfo.boxWeight,
                insurance_value: totalCheckout
            };
            await getShipFee(shopInfo.token, shopInfo.shop_id, formData)
                .then((res) => {
                    setShipFee(res.data.total);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const fetchApiGetLeadTime = async () => {
            console.log("initForm.districtId" + initForm.districtId);

            const formData = {
                service_type_id: service_type_id,
                from_district_id: shopInfo.district_id,
                from_ward_code: shopInfo.ward_code + "",
                to_district_id: parseInt(initForm.districtId),
                to_ward_code: initForm.wardId
            };
            await getLeadtime(shopInfo.token, formData)
                .then((res) => {
                    setShipDay(getNumberDay(res.data.leadtime));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (initForm.wardId && initForm.districtId) {
            fetchApiGetShipFee();
            fetchApiGetLeadTime();
        } else {
            setShipDay(null);
            setShipFee(null);
        }
    }, [initForm.wardId]);

    const handleChangePayment = (e) => {
        setInitForm((prev) => ({
            ...prev,
            paymentId: e.target.value
        }));
    };

    const handleChangeProvince = (value) => {
        const provinceChoose = province.find((item) => item.value === value);
        setInitForm((prev) => ({
            ...prev,
            provinceId: provinceChoose?.value ?? "",
            provinceName: provinceChoose?.label ?? "",
            districtId: "",
            wardId: "",
            districtName: "",
            wardName: ""
        }));
    };

    const handleChangeDistrict = (value) => {
        const districtChoose = district.find((item) => item.value === value);
        // let data = districtChoose?.label ?? "";
        // setFormData((prev) => {
        //     return { ...prev, district: data, ward: "" };
        // });
        // setCurrentDistrictId(value);
        setInitForm((prev) => ({
            ...prev,
            districtId: districtChoose?.value ?? "",
            districtName: districtChoose?.label ?? "",
            wardId: "",
            wardName: ""
        }));
    };

    const handleChangeWard = (value) => {
        const wardChoose = ward.find((item) => item.value === value);
        // let data = wardChoose?.label ?? "";
        // setFormData((prev) => {
        //     return { ...prev, ward: data };
        // });
        // setCurrentWardId(value);
        setInitForm((prev) => ({
            ...prev,
            wardId: wardChoose?.value ?? "",
            wardName: wardChoose?.label ?? ""
        }));
    };

    const handleOrderRequest = () => {
        for (const key in initForm) {
            if (!initForm[key]) {
                openNotificationWithIcon(
                    "warning",
                    "Nhập đầy đủ thông tin",
                    "Yêu cầu nhập đầy đủ thông tin"
                );
                return;
            }
        }

        fetchApiOrder(initForm);
    };

    const fetchApiOrder = async (data) => {
        const items = [];
        for (const item of listBuy) {
            items.push({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                designId: item.designId
            });
        }
        const formData = {
            receiver_name: data.name,
            phone: data.phone,
            province_id: data.provinceId,
            district_id: data.districtId,
            ward_code: data.wardId,
            province_name: data.provinceName,
            district_name: data.districtName,
            ward_name: data.wardName,
            detail: data.detail,
            coupon_code: voucher?.code || "",
            payment_id: data.paymentId,
            items: items
        };
        setOrderLoading(true);
        await createOrder(formData)
            .then((res) => {
                if (res.code == 200) {
                    const orderId = res.result.id;

                    if (formData.payment_id == 1) {
                        createPaymentQR(orderId)
                            .then((res) => {
                                navigate("/payment", {
                                    state: { result: true }
                                });
                            })
                            .catch((err) => {
                                navigate("/order-result", {
                                    state: { result: "error" }
                                });
                            });
                    } else {
                        navigate("/order-result", {
                            state: { result: "success" }
                        });
                    }
                } else {
                    openNotificationWithIcon(
                        "error",
                        "Xảy ra lỗi",
                        res.message
                    );
                    if (res.message === "Voucher đã hết lượt sử dụng") {
                        dispatch(removeVoucher());
                    }
                }
            })
            .catch((err) => {
                navigate("/order-result", {
                    state: { result: "error" }
                });
            });
        setOrderLoading(false);
    };

    const onChangeStep = (value) => {
        if (value === 0) {
            navigate("/cart");
        }
    };
    return (
        <Container>
            {contextHolder}
            {loading ? (
                <></>
            ) : (
                <>
                    <Steps
                        current={current}
                        style={{
                            marginBottom: "40px",
                            marginTop: "40px"
                        }}
                        onChange={onChangeStep}
                        items={items}
                    />
                    <Row>
                        <Col sm={6}>
                            <h5>Thông tin thanh toán</h5>
                            <form>
                                <Row>
                                    <div className={containerInput}>
                                        <div className={labelInput}>
                                            Họ và tên
                                        </div>
                                        <div className={boxInput}>
                                            <Input
                                                name="name"
                                                className={inputForm}
                                                placeholder="Tên người nhận hàng"
                                                value={initForm.name}
                                                onChange={(e) =>
                                                    setInitForm((prev) => ({
                                                        ...prev,
                                                        name: e.target.value
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mt-4">
                                    <div className={containerInput}>
                                        <div className={labelInput}>
                                            Số điện thoại
                                        </div>
                                        <div className={boxInput}>
                                            <Input
                                                name="phone"
                                                className={inputForm}
                                                placeholder="Số điện thoại người nhận"
                                                value={initForm.phone}
                                                onChange={(e) =>
                                                    setInitForm((prev) => ({
                                                        ...prev,
                                                        phone: e.target.value
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mt-4">
                                    <Col sm={12}>
                                        <label
                                            htmlFor="province"
                                            className={labelSelect}
                                        >
                                            Tỉnh/Thành phố
                                        </label>
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
                                                        (
                                                            optionB?.label ?? ""
                                                        ).toLowerCase()
                                                    )
                                            }
                                            onChange={handleChangeProvince}
                                            options={province}
                                            value={initForm.provinceId}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6} className="mt-4">
                                        <label
                                            htmlFor="district"
                                            className={labelSelect}
                                        >
                                            Quận/Huyện
                                        </label>
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
                                                        (
                                                            optionB?.label ?? ""
                                                        ).toLowerCase()
                                                    )
                                            }
                                            onChange={handleChangeDistrict}
                                            options={district}
                                            value={initForm.districtId}
                                            disabled={!initForm.provinceId}
                                        />
                                    </Col>
                                    <Col sm={6} className="mt-4">
                                        <label
                                            htmlFor="ward"
                                            className={labelSelect}
                                        >
                                            Xã/Phường
                                        </label>
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
                                                        (
                                                            optionB?.label ?? ""
                                                        ).toLowerCase()
                                                    )
                                            }
                                            onChange={handleChangeWard}
                                            options={ward}
                                            value={initForm.wardId}
                                            disabled={!initForm.districtId}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col sm={12}>
                                        <label
                                            htmlFor="detail"
                                            className={labelSelect}
                                        >
                                            Địa chỉ chi tiết
                                        </label>
                                        <TextArea
                                            id="detail"
                                            name="detail"
                                            size="large"
                                            rows={4}
                                            value={initForm.detail}
                                            onChange={(e) =>
                                                setInitForm((prev) => ({
                                                    ...prev,
                                                    detail: e.target.value
                                                }))
                                            }
                                            placeholder="Nhập địa chỉ cụ thể (số nhà, đường, thôn/xóm, ...)"
                                        />
                                    </Col>
                                </Row>
                                {shipDate && (
                                    <Row className="mt-4">
                                        <Col sm={12}>
                                            <label
                                                htmlFor="detail"
                                                className={labelSelect}
                                            >
                                                <FaPeopleCarryBox
                                                    fontSize={40}
                                                />{" "}
                                                <span className="ms-3">
                                                    Dự kiến nhận hàng sau{" "}
                                                    <strong>{shipDate}</strong>{" "}
                                                    ngày
                                                </span>
                                            </label>
                                        </Col>
                                    </Row>
                                )}
                                <Row className="mt-4">
                                    <div className="fs-6 mt-1">
                                        Phương thức thanh toán
                                    </div>

                                    <Radio.Group
                                        onChange={handleChangePayment}
                                        value={initForm.paymentId}
                                    >
                                        <Space direction="vertical">
                                            {paymentMethod &&
                                                paymentMethod.map((item) => {
                                                    return (
                                                        <Radio
                                                            value={item.id}
                                                            className="fs-6"
                                                        >
                                                            <Tooltip
                                                                placement="right"
                                                                title={
                                                                    item.description
                                                                }
                                                            >
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </Tooltip>
                                                        </Radio>
                                                    );
                                                })}
                                        </Space>
                                    </Radio.Group>
                                </Row>
                            </form>
                        </Col>
                        <Col sm={6}>
                            <h5 className="mt-sm-0 mt-5">Đơn hàng của bạn</h5>
                            <PurchaseSummary
                                shipFee={shipFee}
                                orderLoading={orderLoading}
                                handleOrderRequest={handleOrderRequest}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default CheckoutPage;
