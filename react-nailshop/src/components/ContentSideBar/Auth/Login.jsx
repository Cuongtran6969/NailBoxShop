import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import Button from "@components/Button/Button";
import { notification } from "antd";
import { login } from "@/apis/authService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SideBarContext } from "@contexts/SideBarProvider";
import { AuthContext } from "@contexts/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { setType, setIsOpen } = useContext(SideBarContext);
    const { authenticated, refresh } = useContext(AuthContext);
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
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
        setIsLoading(true);
        await login({
            email: values.email,
            password: values.password
        })
            .then((res) => {
                if (res.code == 401) {
                    openNotificationWithIcon(
                        "error",
                        "Đăng nhập không thành công",
                        "Email hoặc password chưa chính xác"
                    );
                    console.log("runherrr");
                } else if (res.code == 200) {
                    openNotificationWithIcon(
                        "success",
                        "Đăng nhập thành công",
                        "Chào bạn đến với website NailLabox"
                    );
                    const { userId, accessToken, refreshToken } = res.result;
                    Cookies.set("accessToken", accessToken);
                    Cookies.set("refreshToken", refreshToken);
                    Cookies.set("userId", userId);
                    setIsOpen(false);
                    refresh();
                }
            })
            .catch((err) => {
                console.log(err);
                console.log("runherrr");
                openNotificationWithIcon(
                    "error",
                    "Đăng nhập không thành công",
                    err
                );
            });
        setIsLoading(false);
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

                    {/* <div className={boxRememberMe}>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </div> */}
                    <Button
                        content={isLoading ? "...Loading" : "LOGIN"}
                        type={isLoading ? "" : "submit"}
                    />
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
