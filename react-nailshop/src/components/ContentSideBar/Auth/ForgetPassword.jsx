import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import Button from "@components/Button/Button";
import { Input, Typography, notification } from "antd";
const { Title } = Typography;
import {
    sendOtpRegister,
    register,
    login,
    sendOtpResetPassword,
    resetPassword
} from "@/apis/authService";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import OtpInput from "formik-otp-input";
import { SideBarContext } from "@contexts/SideBarProvider";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSendOtp, setIsSendOtp] = useState(true);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { setType } = useContext(SideBarContext);
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
        errorText,
        labelInput
    } = styles;

    const validateForm = Yup.object({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Yêu cầu nhập email"),
        password: Yup.string()
            .min(6, "Password ít nhất 6 ký tự")
            .max(10, "Yêu cầu không quá 10 ký tự")
            .required("Yêu cầu nhập trường này"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
        ),
        otp: Yup.string().required("Yêu cầu nhập trường này")
    });

    const initForm = {
        email: ""
    };

    const resetPasswordForm = {
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    };

    const formik = useFormik({
        initialValues: isSendOtp ? initForm : resetPasswordForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {}
    });

    const sendOtpHandle = async () => {
        setIsSendingOtp(true);
        const email = formik.values.email;
        try {
            const res = await sendOtpResetPassword(email);
            console.log();
            if (res.code == 200) {
                openNotificationWithIcon(
                    "success",
                    "Gửi Otp thành công",
                    "Vui lòng kiểm tra email để lấy OTP"
                );
                setIsSendOtp(false);
            } else if (res.code == 404) {
                openNotificationWithIcon(
                    "error",
                    "Gửi Otp thất bại",
                    "Tài khoản không tồn tại"
                );
            }
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

    const resetPasswordHandle = async () => {
        setIsLoading(true);
        try {
            const res = await resetPassword({
                email: formik.values.email,
                password: formik.values.password,
                otp: formik.values.otp
            });
            if (res.code == 200) {
                openNotificationWithIcon(
                    "success",
                    "Reset thành công",
                    "Vui lòng đăng nhập lại, để truy cập"
                );
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setType("login");
            } else {
                openNotificationWithIcon(
                    "error",
                    "Có lỗi xảy ra",
                    "Vui lòng thực hiện lại, hoặc liên hệ chúng tôi"
                );
            }
        } catch (error) {
            openNotificationWithIcon(
                "error",
                "Có lỗi xảy ra",
                "Vui lòng thực hiện lại, hoặc liên hệ chúng tôi"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div className={container}>
                <div className={title}>Reset password</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="position-relative mb-5">
                        <InputCommon
                            id="email"
                            formik={formik}
                            label={"Email"}
                            isRequire={true}
                            className="mb-0"
                        />
                    </div>
                    {!isSendOtp ? (
                        <>
                            <InputCommon
                                formik={formik}
                                label={"Mật khẩu"}
                                type={"password"}
                                id="password"
                                isRequire={true}
                            />
                            <InputCommon
                                formik={formik}
                                id="confirmPassword"
                                label={"Nhập lại mật khẩu"}
                                type={"password"}
                                isRequire={true}
                            />
                            <InputCommon
                                formik={formik}
                                label={"Otp"}
                                type={"number"}
                                id="otp"
                                isRequire={true}
                            />
                        </>
                    ) : (
                        ""
                    )}
                    {isSendOtp ? (
                        <Button
                            content={
                                isSendingOtp ? "Đang gửi OTP..." : "Nhận OTP"
                            }
                            // type={!isSendingOtp ? "" : "submit"}
                            onClick={sendOtpHandle}
                        />
                    ) : (
                        <Button
                            content={"Thay đổi mật khẩu"}
                            type={"submit"}
                            onClick={resetPasswordHandle}
                        />
                    )}
                </form>
                <Button
                    content={"Don't have an account?"}
                    style={{ marginTop: "10px" }}
                    isPrimary={false}
                    onClick={() => setType("register")}
                />
            </div>
        </>
    );
}

export default Login;
