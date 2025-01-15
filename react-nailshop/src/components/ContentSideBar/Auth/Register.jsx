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
function Register() {
    const [isRegister, setIsRegister] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
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
        firstName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        lastName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
        ),
        otp: Yup.string().required("Yêu cầu nhập trường này")
    });

    const initForm = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        otp: ""
    };

    const formik = useFormik({
        initialValues: initForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            console.log(isRegister);
            if (isRegister) {
                registerHandle(values);
            }

            if (!isRegister) {
                loginHandle(values);
            }
        }
    });

    const registerHandle = async (values) => {
        try {
            setIsLoading(true);
            const data = await register(values.otp, {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password
            });
            openNotificationWithIcon(
                "success",
                "Đăng ký thành công",
                data.message
            );
        } catch (error) {
            openNotificationWithIcon(
                "error",
                "Đăng ký không thành công",
                error.response.data.message
            );
        } finally {
            setIsLoading(false);
            setIsRegister(false);
        }
    };

    const loginHandle = async (values) => {
        console.log("re");

        await login({
            email: values.email,
            password: values.password
        })
            .then((res) => {
                openNotificationWithIcon(
                    "success",
                    "Đăng nhập thành công",
                    res.message
                );
                setIsLoading(false);
            })
            .catch((err) => {
                openNotificationWithIcon(
                    "error",
                    "Đăng nhập không thành công",
                    err.response.data.message
                );
                setIsLoading(false);
            });
    };

    const handleToggle = () => {
        //change content
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
                <div className={title}>SIGN IN</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="position-relative mb-5">
                        <InputCommon
                            id="email"
                            formik={formik}
                            label={"Email"}
                            isRequire={true}
                            className="mb-0"
                        />
                        <span
                            className={classNames(sendMailBtn, {
                                [disableSend]:
                                    isSendingOtp ||
                                    !formik.values.email ||
                                    !!formik.errors.email
                            })}
                            onClick={
                                isSendingOtp ||
                                !formik.values.email ||
                                !!formik.errors.email
                                    ? null
                                    : handleSendOtp
                            }
                        >
                            Receive otp
                        </span>
                    </div>
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
                    <div className="mb-4">
                        <div className={labelInput}>
                            Otp<span>*</span>
                        </div>
                        <OtpInput
                            length={6}
                            autoFocus={false}
                            value={formik.values.otp}
                            inputType={"numeric"} // Default is numeric. Options are numeric, alphabetic or alphanumeric
                            onBlur={formik.handleBlur} // Formik handler, used to handle onBlur events
                            onChange={formik.handleChange} // Formik handler, used to handle change events
                            setFieldError={formik.setFieldError} // Formik handler, used to handle error rendering
                            setFieldTouched={formik.setFieldTouched}
                        />
                        {formik.errors.otp && formik.touched.otp && (
                            <div className={errorText}>{formik.errors.otp}</div>
                        )}
                    </div>
                    <Button content={"REGISTER"} type={"submit"} />
                </form>
                <Button
                    content={"Already have an account"}
                    style={{ marginTop: "10px" }}
                    isPrimary={false}
                    onClick={() => setType("login")}
                />
            </div>
        </>
    );
}

export default Register;
