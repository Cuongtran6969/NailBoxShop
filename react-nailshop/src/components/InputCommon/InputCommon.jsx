import styles from "./styles.module.scss";
import { TiEye } from "react-icons/ti";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { Input, Typography } from "antd";
const { Title } = Typography;
function InputCommon({
    label,
    type,
    isRequire = false,
    isOtp = false,
    ...props
}) {
    const { container, labelInput, boxInput, showIcon, errMsg } = styles;
    const isPassword = type === "password";
    const { formik, id } = props;
    const [showPassword, setShowPassword] = useState(false);
    const isError = formik.errors[id] && formik.touched[id];
    const messageErr = formik.errors[id];

    const isShowTextPassword =
        type === "password" && showPassword ? "text" : type;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={container}>
            <div className={labelInput}>
                {label}
                {isRequire && <span>*</span>}
            </div>
            <div className={boxInput}>
                {isOtp ? (
                    <Input.OTP
                        formatter={(str) => str.toUpperCase()}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values[id]}
                    />
                ) : (
                    <input
                        type={isShowTextPassword}
                        {...props}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values[id]}
                    />
                )}
                {isPassword && (
                    <div className={showIcon} onClick={handleShowPassword}>
                        {showPassword ? <IoMdEyeOff /> : <TiEye />}
                    </div>
                )}
                {isError && <div className={errMsg}>{messageErr}</div>}
            </div>
        </div>
    );
}

export default InputCommon;
