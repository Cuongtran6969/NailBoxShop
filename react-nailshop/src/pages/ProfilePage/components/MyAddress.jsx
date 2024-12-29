import {
    getProvince,
    getDistrict,
    getWard
} from "@/apis/giaohanhnhanhService.js";
import { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
const { TextArea } = Input;
import styles from "../styles.module.scss";
import ListAddress from "./ListAddress";
import { notification } from "antd";
import {
    getMyAddress,
    createAddress,
    updateAddress,
    deleteAddress
} from "@/apis/addressService";
function MyAddress() {
    const {
        addressForm,
        formGroup,
        provinceSelect,
        districtSelect,
        wardSelect,
        detailAdd,
        formMess
    } = styles;
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [currentProvinceId, setCurrentProvinceId] = useState(null);
    const [currentDistrictId, setCurrentDistrictId] = useState(null);
    const [currentWardId, setCurrentWardId] = useState(null);
    const [detail, setDetail] = useState("");
    const [formData, setFormData] = useState({
        province: "",
        district: "",
        ward: "",
        detail: ""
    });
    const [api, contextHolder] = notification.useNotification();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            duration: 3
        });
    };
    const [updateData, setUpdateData] = useState({
        id: "",
        index: ""
    });

    useEffect(() => {
        if (updateData.id && updateData.index) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [updateData]);

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
        if (!isUpdate) {
            setWard([]);
            setDistrict([]);
            setCurrentDistrictId(null);
            setCurrentWardId(null);
        }

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
        if (!isUpdate) {
            setWard([]);
            setCurrentWardId(null);
        }

        fetchApiWard();
    }, [currentDistrictId]);

    const handleChangeProvince = (value) => {
        const provinceChoose = province.find((item) => item.value === value);
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

    const handleSubmitForm = async () => {
        console.log("herr");
        try {
            const response = await createAddress(formData);
            if (response.code == 201) {
                openNotificationWithIcon(
                    "success",
                    "Thành công",
                    "Thêm địa chỉ mới thành công"
                );
                setIsChange(!isChange);
            } else {
                openNotificationWithIcon("error", "Thất bại", response.message);
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Đã xảy ra lỗi không xác định.";
            openNotificationWithIcon("error", "Thất bại", errorMessage);
        }
    };

    const handleSubmitFormUpdate = async () => {
        console.log("herr");
        try {
            const response = await updateAddress(updateData.id, formData);
            if (response.code == 201) {
                openNotificationWithIcon(
                    "success",
                    "Thành công",
                    "Cập nhật địa chỉ thành công"
                );
                setIsChange(!isChange);
                setUpdateData({ id: "", index: "" });
            } else {
                openNotificationWithIcon("error", "Thất bại", response.message);
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Đã xảy ra lỗi không xác định.";
            openNotificationWithIcon("error", "Thất bại", errorMessage);
        }
    };

    return (
        <>
            {contextHolder}
            <div className={addressForm}>
                {/* Province Select */}
                <div className={formGroup}>
                    <label htmlFor="province" className={provinceSelect}>
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
                </div>

                <div className="d-flex justify-content-between mt-4">
                    {/* District Select */}
                    <div className="w-50 me-2">
                        <label htmlFor="district" className={districtSelect}>
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
                    </div>

                    {/* Ward Select */}
                    <div className="w-50 ms-2">
                        <label htmlFor="ward" className={wardSelect}>
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
                    </div>
                </div>

                {/* Detail Address */}
                <div className="mt-4">
                    <label htmlFor="detail" className={detailAdd}>
                        Địa chỉ chi tiết
                    </label>
                    <TextArea
                        id="detail"
                        size="large"
                        rows={4}
                        value={detail}
                        onChange={(e) => handleChangeDetail(e.target.value)}
                        placeholder="Nhập địa chỉ cụ thể (số nhà, đường, thôn/xóm, ...)"
                    />
                </div>
                <div className="mt-3 mb-5">
                    <Button
                        type="primary"
                        onClick={() => handleSubmitForm()}
                        disabled={
                            !(
                                formData.district &&
                                formData.province &&
                                formData.ward &&
                                formData.detail
                            )
                        }
                    >
                        Thêm địa chỉ
                    </Button>
                    {updateData.id && updateData.index + 1 && (
                        <Button
                            className="ms-3"
                            type="primary"
                            onClick={() => handleSubmitFormUpdate()}
                            disabled={
                                !(
                                    formData.district &&
                                    formData.province &&
                                    formData.ward &&
                                    formData.detail
                                )
                            }
                        >
                            Thay địa chỉ {updateData.index + 1}
                        </Button>
                    )}
                </div>
            </div>
            <ListAddress
                isChange={isChange}
                displayMess={openNotificationWithIcon}
                setUpdateData={setUpdateData}
            />
        </>
    );
}

export default MyAddress;
