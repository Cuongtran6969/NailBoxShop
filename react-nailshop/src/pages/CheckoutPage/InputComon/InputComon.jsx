import styles from "../styles.module.scss";
import { Input } from "antd";
function InputCommon({ label }) {
    const { containerInput, labelInput, boxInput } = styles;
    return (
        <div className={containerInput}>
            <div className={labelInput}>{label}</div>
            <div className={boxInput}>
                <Input placeholder="Name" />
            </div>
        </div>
    );
}

export default InputCommon;
