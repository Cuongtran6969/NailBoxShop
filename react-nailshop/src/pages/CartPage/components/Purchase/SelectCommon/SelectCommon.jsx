import styles from "../styles.module.scss";
import { Select, Space } from "antd";
function SelectCommon({ label }) {
    const { containerSelect, labelSelect } = styles;
    return (
        <div className={containerSelect}>
            <div className={labelSelect}>{label}</div>
            <Select
                defaultValue="lucy"
                style={{ width: "100%", height: "40px" }}
                options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true }
                ]}
            />
        </div>
    );
}

export default SelectCommon;
