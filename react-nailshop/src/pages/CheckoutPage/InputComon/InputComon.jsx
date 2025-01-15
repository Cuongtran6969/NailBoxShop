import styles from "../styles.module.scss";
import { Input } from "antd";
function InputCommon({ label, placeholder = "", value = "" }) {
    const { containerInput, labelInput, boxInput } = styles;
    return (
        <div className={containerInput}>
            <div className={labelInput}>{label}</div>
            <div className={boxInput}>
                <Input placeholder={placeholder} value={value} />
            </div>
        </div>
    );
}

export default InputCommon;
