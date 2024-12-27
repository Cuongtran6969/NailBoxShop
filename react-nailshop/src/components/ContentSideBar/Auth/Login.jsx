import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import Button from "@components/Button/Button";
import { Typography, notification } from "antd";
import { login } from "@/apis/authService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SideBarContext } from "@contexts/SideBarProvider";
import Cookies from "js-cookie";
function Login() {
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
        password: Yup.string().required("Yêu cầu nhập trường này")
    });
    const initForm = {
        email: "",
        password: ""
    };

    const formik = useFormik({
        initialValues: initForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            loginHandle(values);
        }
    });

    const loginHandle = async (values) => {
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

                const { userId, accessToken, refreshToken } = res.result;
                Cookies.set("accessToken", accessToken);
                Cookies.set("refreshToken", refreshToken);
                Cookies.set("userId", userId);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);

                openNotificationWithIcon(
                    "error",
                    "Đăng nhập không thành công",
                    err
                );
                setIsLoading(false);
            });
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
                    </div>
                    <InputCommon
                        formik={formik}
                        label={"Mật khẩu"}
                        type={"password"}
                        id="password"
                        isRequire={true}
                    />

                    <div className={boxRememberMe}>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <Button content={"LOGIN"} type={"submit"} />
                </form>
                <Button
                    content={"Don't have an account?"}
                    style={{ marginTop: "10px" }}
                    isPrimary={false}
                    onClick={() => setType("register")}
                />
                <div
                    className={lostPassword}
                    onClick={() => setType("forgetPassword")}
                >
                    forget password
                </div>
            </div>
        </>
    );
}

export default Login;
