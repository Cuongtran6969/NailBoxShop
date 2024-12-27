import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useState } from "react";
import Button from "@components/Button/Button";
import { Input, Typography, notification } from "antd";
const { Title } = Typography;
import { sendOtpRegister, register } from "@/apis/authService";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import OtpInput from "formik-otp-input";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };
    const {
        container,
        title,
        boxRememberMe,
        lostPassword,
        sendMailBtn,
        disableSend,
        errorText
    } = styles;

    const validateForm = Yup.object({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Yêu cầu nhập email"),
        firstName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        lastName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        password: Yup.string()
            .min(5, "Password ít nhất 5 ký tự")
            .max(10, "Yêu cầu không quá 10 ký tự")
            .required("Yêu cầu nhập trường này"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
        ),
        otp: Yup.string().required("Yêu cầu nhập trường này")
    });
    const initForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    };

    const formik = useFormik({
        initialValues: initForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            if (isRegister) {
                registerHandle(values);
            } else {
            }
        }
    });

    const registerHandle = async (values) => {
        console.log("run......");

        try {
            setIsLoading(true);
            const data = await register(values.otp, {
                email: values.email,
                firstName: values.firstname,
                lastName: values.lastname,
                password: values.password
            });
            console.log(data);
            setIsRegister(false);
            openNotificationWithIcon(
                "success",
                data.message,
                "Đăng ký thành công"
            );
        } catch (error) {
            openNotificationWithIcon(
                "error",
                error.message,
                "Đăng ký không thành công"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = () => {
        setIsRegister(!isRegister);
    };

    const handleSendOtp = async () => {
        setIsSendingOtp(true);
        console.log("here");
        const email = formik.values.email;
        try {
            const res = await sendOtpRegister(email);
            openNotificationWithIcon(
                "success",
                res.message,
                "Vui lòng kiểm tra email để lấy OTP"
            );
        } catch (error) {
            openNotificationWithIcon(
                "error",
                "Có lỗi xảy ra",
                error.message || "Không thể gửi OTP"
            );
        } finally {
            setIsSendingOtp(false);
        }
    };
    return (
        <>
            {contextHolder}
            <div className={container}>
                <div className={title}>
                    {isRegister ? "SIGN UP" : "SIGN IN"}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="position-relative mb-5">
                        <InputCommon
                            id="email"
                            formik={formik}
                            label={"Email"}
                            isRequire={true}
                            className="mb-0"
                        />
                        {isRegister && (
                            <span
                                className={classNames(sendMailBtn, {
                                    [disableSend]:
                                        isSendingOtp ||
                                        !formik.values.email ||
                                        !!formik.errors.email
                                })}
                                onClick={isSendingOtp ? null : handleSendOtp}
                            >
                                Reciver otp
                            </span>
                        )}
                    </div>
                    {isRegister && (
                        <div className="d-flex justify-content-between">
                            <InputCommon
                                formik={formik}
                                id="firstName"
                                label={"First Name"}
                                isRequire={true}
                            />
                            <InputCommon
                                formik={formik}
                                id="lastName"
                                label={"Last Name"}
                                isRequire={true}
                            />
                        </div>
                    )}
                    <InputCommon
                        formik={formik}
                        label={"Mật khẩu"}
                        type={"password"}
                        id="password"
                        isRequire={true}
                    />
                    {isRegister && (
                        <>
                            <InputCommon
                                formik={formik}
                                id="confirmPassword"
                                label={"Nhập lại mật khẩu"}
                                type={"password"}
                                isRequire={true}
                            />
                            <OtpInput
                                length={6}
                                value={formik.values.otp}
                                inputType={"numeric"} // Default is numeric. Options are numeric, alphabetic or alphanumeric
                                autoFocus={true} // Default is true. Will auto-focus first digit if true
                                onBlur={formik.handleBlur} // Formik handler, used to handle onBlur events
                                onChange={formik.handleChange} // Formik handler, used to handle change events
                                setFieldError={formik.setFieldError} // Formik handler, used to handle error rendering
                                setFieldTouched={formik.setFieldTouched}
                            />
                            {formik.errors.otp && formik.touched.otp && (
                                <div className={errorText}>
                                    {formik.errors.otp}
                                </div>
                            )}
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
