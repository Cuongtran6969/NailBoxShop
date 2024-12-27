import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import Button from "@components/Button/Button";
import { Input, Typography, notification } from "antd";
const { Title } = Typography;
import { sendOtpRegister, register, login } from "@/apis/authService";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import OtpInput from "formik-otp-input";
import { SideBarContext } from "@contexts/SideBarProvider";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSendOtp, setIsSendOtp] = useState(true);
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
        onSubmit: async (values) => {
            loginHandle(values);
        }
    });

    const sendOtpHandle = async () => {
        // setIsSendingOtp(true);
        console.log("here");
        // const email = formik.values.email;
        // try {
        //     const res = await sendOtpRegister(email);
        //     openNotificationWithIcon(
        //         "success",
        //         res.message,
        //         "Vui lòng kiểm tra email để lấy OTP"
        //     );
        // } catch (error) {
        //     openNotificationWithIcon(
        //         "error",
        //         "Có lỗi xảy ra",
        //         error.message || "Không thể gửi OTP"
        //     );
        // } finally {
        //     setIsSendingOtp(false);
        // }
    };

    const resetPasswordHandle = async () => {
        // setIsSendingOtp(true);
        console.log("here");
        // const email = formik.values.email;
        // try {
        //     const res = await sendOtpRegister(email);
        //     openNotificationWithIcon(
        //         "success",
        //         res.message,
        //         "Vui lòng kiểm tra email để lấy OTP"
        //     );
        // } catch (error) {
        //     openNotificationWithIcon(
        //         "error",
        //         "Có lỗi xảy ra",
        //         error.message || "Không thể gửi OTP"
        //     );
        // } finally {
        //     setIsSendingOtp(false);
        // }
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
                    {isSendOtp ?? (
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
                        </>
                    )}
                    <Button content={"RECEIVE OTP"} type={"submit"} />
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
