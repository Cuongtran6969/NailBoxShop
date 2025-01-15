import InputCommon from "@components/InputCommon/InputCommon";
import styles from "../styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { Divider, Upload, Typography, notification, Button } from "antd";
const { Title } = Typography;
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { updateInfo, getProfile } from "@/apis/userService";
const defaultAvatar =
    "https://res.cloudinary.com/doslvje9p/image/upload/v1735407308/avatar-trang-4_bnhcac.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function UserInfo() {
    const [avatarUpdate, setAvatarUpdate] = useState({
        avatar: null,
        file: null
    });
    const [loading, setLoading] = useState(true);
    const [updateTing, setUpdateTing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatar: ""
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc
        });
    };

    const {
        container,
        avatarBox,
        uploadBox,
        uploadBtn,
        hiddenUpload,
        userName,
        saveInfoBtn
    } = styles;
    const renderSkeletons = () => (
        <div>
            <div className="d-flex align-items-center">
                <Skeleton width={120} height={120} circle={true} />
                <Skeleton width={90} height={25} className="ms-3" />
            </div>
            <Skeleton width="100%" height={40} className="mt-4" />
            <Skeleton width="100%" height={40} className="mt-5" />
            <Skeleton width="100%" height={40} className="mt-5" />
            <Skeleton width="10%" height={40} className="mt-5" />
        </div>
    );
    const getUserInfo = async () => {
        setLoading(true);
        await getProfile()
            .then((res) => {
                console.log(res);
                setUserInfo({
                    email: res.result.email ?? "",
                    firstName: res.result.firstName ?? "",
                    lastName: res.result.lastName ?? "",
                    phone: res.result.phone ?? "",
                    avatar: res.result.avatar ?? defaultAvatar
                });
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false);
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    const validateForm = Yup.object({
        firstName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        lastName: Yup.string()
            .max(50, "Yêu cầu không quá 50 ký tự")
            .required("Yêu cầu nhập trường này"),
        phone: Yup.string().required("Yêu cầu nhập trường này")
    });

    const formik = useFormik({
        initialValues: userInfo,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            handleSubmitForm(values);
        },
        enableReinitialize: true
    });

    const handleSubmitForm = async (values) => {
        const formData = new FormData();
        formData.append(
            "user",
            new Blob(
                [
                    JSON.stringify({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phone: values.phone
                    })
                ],
                { type: "application/json" }
            )
        );
        if (avatarUpdate.file) {
            formData.append("file", avatarUpdate.file);
        }
        setUpdateTing(true);
        await updateInfo(formData)
            .then((res) => {
                console.log(res);
                const updateData = {
                    ...res.result,
                    avatar: res.result.avatar || defaultAvatar
                };
                if (res.code == 201) {
                    setUserInfo(updateData);
                    openNotificationWithIcon(
                        "success",
                        "Thành công",
                        "Cập nhật thông tin thành công"
                    );
                    setAvatarUpdate({
                        avatar: null,
                        file: null
                    });
                } else {
                    openNotificationWithIcon(
                        "error",
                        "Thất bại",
                        "Cập nhật thông tin thất bại"
                    );
                }
            })
            .catch((error) => {
                openNotificationWithIcon(
                    "error",
                    "Thất bại",
                    "Cập nhật thông tin thất bại"
                );
            });
        setUpdateTing(false);
        getUserInfo();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAvatarUpdate({ avatar: fileURL, file: file });
        }
    };

    return (
        <>
            {contextHolder}
            {loading ? (
                renderSkeletons()
            ) : (
                <div className={container}>
                    <div>
                        <div className="d-flex align-items-center">
                            <div>
                                <div className={avatarBox}>
                                    <img
                                        src={
                                            avatarUpdate.avatar ??
                                            userInfo.avatar
                                        }
                                    />
                                </div>
                                <p className={userName}>
                                    {userInfo.firstName +
                                        " " +
                                        userInfo.lastName}
                                </p>
                            </div>
                            <div className={uploadBox}>
                                <Button
                                    icon={<UploadOutlined />}
                                    className={uploadBtn}
                                >
                                    Thay đổi ảnh
                                </Button>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    className={hiddenUpload}
                                    onChange={handleFileUpload}
                                />
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
                                readOnly={true}
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
                        <Button
                            type="primary"
                            htmlType={"submit"}
                            className={saveInfoBtn}
                        >
                            {updateTing ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UserInfo;
