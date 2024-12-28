import {
    getProvince,
    getDistrict,
    getWard
} from "@/apis/giaohanhnhanhService.js";
import { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
const { TextArea } = Input;
import styles from "../styles.module.scss";
function MyAddress() {
    const {
        addressForm,
        formGroup,
        provinceSelect,
        districtSelect,
        wardSelect,
        detailAdd
    } = styles;
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [currentProvinceId, setCurrentProvinceId] = useState(null);
    const [currentDistrictId, setCurrentDistrictId] = useState(null);
    const [currentWardId, setCurrentWardId] = useState(null);
    const [detailAddress, setDetailAddress] = useState("");

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

        fetchApiDistrict();
        setDistrict([]);
        setWard([]);
        setCurrentDistrictId(null);
        setCurrentWardId(null);
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

        fetchApiWard();
        setWard([]);
        setCurrentWardId(null);
    }, [currentDistrictId]);

    const handleChangeProvince = (value) => {
        setCurrentProvinceId(value);
    };

    const handleChangeDistrict = (value) => {
        setCurrentDistrictId(value);
    };

    const handleChangeWard = (value) => {
        setCurrentWardId(value);
    };

    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
    };

    return (
        <div className={addressForm}>
            {/* Province Select */}
            <div className={formGroup}>
                <label htmlFor="province-select" className={provinceSelect}>
                    Tỉnh/Thành phố
                </label>
                <Select
                    id="province-select"
                    showSearch
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Chọn tỉnh/thành phố"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={handleChangeProvince}
                    options={province}
                    value={currentProvinceId}
                />
            </div>

            <div className="d-flex justify-content-between mt-5">
                {/* District Select */}
                <div className="w-50 me-2">
                    <label htmlFor="district-select" className={districtSelect}>
                        Quận/Huyện
                    </label>
                    <Select
                        id="district-select"
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
                    <label htmlFor="ward-select" className={wardSelect}>
                        Xã/Phường
                    </label>
                    <Select
                        id="ward-select"
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
            <div className="mt-5">
                <label htmlFor="detail-address" className={detailAdd}>
                    Địa chỉ chi tiết
                </label>
                <TextArea
                    id="detail-address"
                    size="large"
                    rows={4}
                    placeholder="Nhập địa chỉ cụ thể (số nhà, đường, thôn/xóm, ...)"
                    value={detailAddress}
                    onChange={handleDetailAddressChange}
                />
            </div>
            <div className="mt-5">
                <Button type="primary">Thay địa chỉ</Button>
            </div>
        </div>
    );
}

export default MyAddress;
