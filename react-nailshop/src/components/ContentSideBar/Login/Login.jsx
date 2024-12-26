import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useState } from "react";
import Button from "@components/Button/Button";
import { Input, Typography } from "antd";
const { Title } = Typography;
function Login() {
    const { container, title, boxRememberMe, lostPassword, sendMailBtn } =
        styles;
    const [isRegister, setIsRegister] = useState(false);

    const handleToggle = () => {
        setIsRegister(!isRegister);
    };
    return (
        <>
            <div className={container}>
                <div className={title}>
                    {isRegister ? "SIGN UP" : "SIGN IN"}
                </div>
                <form>
                    <div className="position-relative mb-5">
                        <InputCommon
                            label={"Email"}
                            isRequire={true}
                            className="mb-0"
                        />
                        {isRegister && (
                            <p className={sendMailBtn}>Reciver otp</p>
                        )}
                    </div>
                    {isRegister && (
                        <div className="d-flex justify-content-between">
                            <InputCommon
                                id="firstName"
                                label={"First Name"}
                                isRequire={true}
                            />
                            <InputCommon
                                id="firstName"
                                label={"First Name"}
                                isRequire={true}
                            />
                        </div>
                    )}
                    <InputCommon
                        label={"Mật khẩu"}
                        type={"password"}
                        isRequire={true}
                    />
                    {isRegister && (
                        <>
                            <InputCommon
                                id="cfPassword"
                                label={"Nhập lại mật khẩu"}
                                type={"password"}
                                isRequire={true}
                            />
                            <InputCommon
                                label={"Otp"}
                                isOtp={true}
                                isRequire={true}
                            />
                        </>
                    )}
                    {!isRegister && (
                        <div className={boxRememberMe}>
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </div>
                    )}

                    <Button
                        content={isRegister ? "REGISTER" : "LOGIN"}
                        type={"submit"}
                        // onClick={() => toast.success("Success")}
                    />
                </form>
                <Button
                    content={
                        isRegister
                            ? "Already have an account"
                            : "Don't have an account?"
                    }
                    style={{ marginTop: "10px" }}
                    isPrimary={false}
                    onClick={handleToggle}
                />
                {!isRegister && (
                    <div className={lostPassword}>Lost your password</div>
                )}
            </div>
        </>
    );
}

export default Login;
