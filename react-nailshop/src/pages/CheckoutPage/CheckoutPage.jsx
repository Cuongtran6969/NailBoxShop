import { Radio, Space, Tooltip, Select, Input } from "antd";
const { TextArea } = Input;
import InputCommon from "./InputComon/InputComon";
// import SelectCommon from "./SelectCommon/SelectCommon";
import styles from "./styles.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import PurchaseSummary from "./PurchaseSummary/PurchaseSummary";
import { useEffect, useState } from "react";
import { purchaseMethod } from "./constants";
import { getShipFee } from "@/apis/shipmentService";
import { getProvince, getDistrict, getWard } from "@/apis/giaohanhnhanhService";
import { useSelector } from "react-redux";
function CheckoutPage() {
    const { list, listBuy, totalCheckout } = useSelector((state) => state.cart);
    const { purchaseBtn, labelSelect } = styles;
    const [value, setValue] = useState(1);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [detail, setDetail] = useState("");
    const [currentProvinceId, setCurrentProvinceId] = useState(null);
    const [currentDistrictId, setCurrentDistrictId] = useState(null);
    const [currentWardId, setCurrentWardId] = useState(null);
    const [shipFee, setShipFee] = useState(null);
    const [formData, setFormData] = useState({
        province: "",
        district: "",
        ward: "",
        detail: ""
    });
    const [shopInfo, setShopInfo] = useState({
        id: 1,
        district_id: 1847,
        ward_code: 291238,
        token: "0f7f0dee-c521-11ef-bc3f-4e8d0f51e688",
        shopId: 5556347,
        boxLength: 18,
        boxWidth: 12,
        boxHeight: 4,
        boxWeight: 200
    });

    useEffect(() => {
        const fetchApiProvince = async () => {
            try {
                const res = await getProvince();
                const formattedOptions = res.data.map((province) => ({
                    value: province.ProvinceID.toString(),
                    label: province.ProvinceName
                }));
                setProvince(formattedOptions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApiProvince();
    }, []);

    useEffect(() => {
        const fetchApiDistrict = async () => {
            if (!currentProvinceId) return;
            try {
                const res = await getDistrict(currentProvinceId);
                const formattedOptions = res.data.map((district) => ({
                    value: district.DistrictID.toString(),
                    label: district.DistrictName
                }));
                setDistrict(formattedOptions);
            } catch (error) {
                console.error(error);
            }
        };
        setWard([]);
        setDistrict([]);
        setCurrentDistrictId(null);
        setCurrentWardId(null);
        fetchApiDistrict();
    }, [currentProvinceId]);

    useEffect(() => {
        const fetchApiWard = async () => {
            if (!currentDistrictId) return;
            try {
                const res = await getWard(currentDistrictId);
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
        setCurrentWardId(null);
        fetchApiWard();
    }, [currentDistrictId]);

    useEffect(() => {
        const fetchApiGetShipFee = async () => {
            if (currentWardId != null) {
                const formData = {
                    service_type_id: 2,
                    from_district_id: shopInfo.district_id,
                    from_ward_code: shopInfo.ward_code + "",
                    to_district_id: parseInt(currentDistrictId),
                    to_ward_code: currentWardId,
                    length: shopInfo.boxLength,
                    width: shopInfo.boxWidth,
                    height: shopInfo.boxHeight,
                    weight: shopInfo.boxWeight,
                    insurance_value: totalCheckout
                };
                await getShipFee(shopInfo.token, shopInfo.shopId, formData)
                    .then((res) => {
                        console.log("success fee");
                        console.log(res);
                        setShipFee(res.data.total);
                    })
                    .catch((err) => {
                        console.log("fail fee");
                        console.log(err);
                    });
            } else {
                setShipFee(null);
            }
        };
        fetchApiGetShipFee();
    }, [currentWardId]);

    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

    const handleChangeProvince = (value) => {
        const provinceChoose = province.find((item) => item.value === value);
        //save name in db
        let data = provinceChoose?.label ?? "";
        setFormData((prev) => {
            return { ...prev, province: data, district: "", ward: "" };
        });
        setCurrentProvinceId(value);
    };

    const handleChangeDistrict = (value) => {
        const districtChoose = district.find((item) => item.value === value);
        let data = districtChoose?.label ?? "";
        setFormData((prev) => {
            return { ...prev, district: data, ward: "" };
        });
        setCurrentDistrictId(value);
    };

    const handleChangeWard = (value) => {
        const wardChoose = ward.find((item) => item.value === value);
        let data = wardChoose?.label ?? "";
        setFormData((prev) => {
            return { ...prev, ward: data };
        });
        setCurrentWardId(value);
    };

    const handleChangeDetail = (value) => {
        setFormData((prev) => {
            return { ...prev, detail: value };
        });
        setDetail(value);
    };

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <h5>Thông tin thanh toán</h5>
                    <Row>
                        <InputCommon label="Họ và tên" />
                    </Row>
                    <Row className="mt-4">
                        <InputCommon label="Số điện thoại" />
                    </Row>
                    <Row className="mt-4">
                        <Col sm={12}>
                            <label htmlFor="province" className={labelSelect}>
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                id="province"
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
                                onChange={handleChangeProvince}
                                options={province}
                                value={currentProvinceId}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} className="mt-4">
                            <label htmlFor="district" className={labelSelect}>
                                Quận/Huyện
                            </label>
                            <Select
                                id="district"
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
                                onChange={handleChangeDistrict}
                                options={district}
                                value={currentDistrictId}
                                disabled={!currentProvinceId}
                            />
                        </Col>
                        <Col sm={6} className="mt-4">
                            <label htmlFor="ward" className={labelSelect}>
                                Xã/Phường
                            </label>
                            <Select
                                id="ward"
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
                                onChange={handleChangeWard}
                                options={ward}
                                value={currentWardId}
                                disabled={!currentDistrictId}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm={12}>
                            <label htmlFor="detail" className={labelSelect}>
                                Địa chỉ chi tiết
                            </label>
                            <TextArea
                                id="detail"
                                size="large"
                                rows={4}
                                value={detail}
                                onChange={(e) =>
                                    handleChangeDetail(e.target.value)
                                }
                                placeholder="Nhập địa chỉ cụ thể (số nhà, đường, thôn/xóm, ...)"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <div className="fs-6 mt-1">Phương thức thanh toán</div>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                {purchaseMethod.map((item) => {
                                    return (
                                        <Radio
                                            value={item.value}
                                            className="fs-6"
                                        >
                                            <Tooltip
                                                placement="right"
                                                title={item.suggest}
                                            >
                                                <span>{item.title}</span>
                                            </Tooltip>
                                        </Radio>
                                    );
                                })}
                            </Space>
                        </Radio.Group>
                    </Row>
                </Col>
                <Col sm={6}>
                    <h5 className="mt-sm-0 mt-5">Đơn hàng của bạn</h5>
                    <PurchaseSummary shipFee={shipFee} />
                </Col>
            </Row>
        </Container>
    );
}

export default CheckoutPage;
