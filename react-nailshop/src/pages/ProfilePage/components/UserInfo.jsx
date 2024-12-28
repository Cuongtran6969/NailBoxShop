import InputCommon from "@components/InputCommon/InputCommon";
import styles from "../styles.module.scss";
import { useContext, useState } from "react";
import { Image, Upload, Typography, notification, Button } from "antd";
const { Title } = Typography;
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { Divider } from "antd";
const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {}
};
function UserInfo() {
    const {
        container,
        title,
        avatarBox,
        lostPassword,
        sendMailBtn,
        disableSend,
        errorText,
        labelInput,
        uploadBtn,
        userName,
        saveInfoBtn
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
        email: "cuong@gmail.com",
        firstName: "cuong",
        lastName: "tran",
        phone: ""
    };

    const formik = useFormik({
        initialValues: initForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            console.log(isRegister);
        }
    });
    return (
        <>
            <div className={container}>
                <div>
                    <div className="d-flex align-items-center">
                        <div>
                            <div className={avatarBox}>
                                <Image
                                    src={
                                        "https://res.cloudinary.com/doslvje9p/image/upload/v1734768054/upload/file_a02c3h.jpg"
                                    }
                                />
                            </div>
                            <p className={userName}>cuongtran</p>
                        </div>
                        <div className="ms-4">
                            <Upload {...props}>
                                <Button
                                    icon={<UploadOutlined />}
                                    className={uploadBtn}
                                >
                                    Thay đổi ảnh
                                </Button>
                            </Upload>
                        </div>
                    </div>
                </div>
                <Divider />
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
                    <div className="d-flex justify-content-between">
                        <div className="w-50 me-1">
                            <InputCommon
                                formik={formik}
                                id="firstName"
                                label={"First Name"}
                                isRequire={true}
                            />
                        </div>
                        <div className="w-50 ms-1">
                            <InputCommon
                                formik={formik}
                                id="lastName"
                                label={"Last Name"}
                                isRequire={true}
                            />
                        </div>
                    </div>
                    <div className="">
                        <InputCommon
                            id="phone"
                            formik={formik}
                            label={"Phone"}
                            isRequire={true}
                            className="mb-0"
                        />
                    </div>
                    <Button type="primary" className={saveInfoBtn}>
                        Lưu
                    </Button>
                </form>
            </div>
        </>
    );
}

export default UserInfo;
