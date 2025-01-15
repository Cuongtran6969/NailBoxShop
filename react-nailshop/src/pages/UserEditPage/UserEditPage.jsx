import InputCommon from "@components/InputCommon/InputCommon";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import {
    Divider,
    Upload,
    Typography,
    notification,
    Button,
    Select,
    Skeleton
} from "antd";
const { Title } = Typography;
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { updateUser, getUserById } from "@/apis/userService";
import { useParams } from "react-router-dom";
const defaultAvatar =
    "https://res.cloudinary.com/doslvje9p/image/upload/v1735407308/avatar-trang-4_bnhcac.jpg";
function UserEditPage() {
    const { id } = useParams();
    const [avatarUpdate, setAvatarUpdate] = useState({
        avatar: null,
        file: null
    });
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatar: "",
        role: ""
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

    const getUserInfo = async () => {
        setLoading(true);
        await getUserById(id)
            .then((res) => {
                console.log(res);
                setUserInfo(res.result);
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false);
    };

    useEffect(() => {
        getUserInfo();
    }, [id]);

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
        console.log("herr");
        try {
            const formData = new FormData();
            formData.append(
                "user",
                new Blob(
                    [
                        JSON.stringify({
                            userId: id,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            phone: values.phone,
                            roleId: values.role
                        })
                    ],
                    { type: "application/json" }
                )
            );
            if (avatarUpdate.file) {
                formData.append("file", avatarUpdate.file);
            }

            const res = await updateUser(formData);
            if (res?.code === 200) {
                await getUserInfo(); // Tải lại thông tin người dùng
                openNotificationWithIcon("success", "Thành công", res.message);
                setAvatarUpdate({
                    avatar: null,
                    file: null
                });
            } else {
                openNotificationWithIcon(
                    "error",
                    "Thất bại",
                    res.message || "Cập nhật thất bại"
                );
            }
        } catch (error) {
            console.error("Update error:", error);
            openNotificationWithIcon(
                "error",
                "Thất bại",
                "Có lỗi xảy ra khi cập nhật"
            );
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAvatarUpdate({ avatar: fileURL, file: file });
        }
    };
    const handleChange = (value) => {
        formik.setFieldValue("role", value);
    };

    return (
        <>
            {contextHolder}
            {loading ? (
                <div className={container}>
                    <div className="d-flex align-items-center mb-3">
                        <Skeleton.Avatar
                            active
                            size={64}
                            className={avatarBox}
                        />
                        <Skeleton.Input
                            active
                            style={{ width: 200, marginLeft: 16 }}
                        />
                    </div>
                    <Divider />
                    <form>
                        <div className="position-relative mb-5">
                            <Skeleton.Input
                                active
                                style={{ width: 1000, height: 40 }}
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <Skeleton.Input
                                active
                                style={{ width: 800, height: 40 }}
                            />
                            <Skeleton.Input
                                active
                                style={{ width: 800, height: 40 }}
                            />
                        </div>
                        <div className="mb-4">
                            <Skeleton.Input
                                active
                                style={{ width: 1000, height: 40 }}
                            />
                        </div>
                        <div className="mb-4">
                            <Skeleton.Input
                                active
                                style={{ width: 1000, height: 40 }}
                            />
                        </div>
                        <Skeleton.Button
                            active
                            block
                            style={{ width: 200, height: 40 }}
                        />
                    </form>
                </div>
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

                        <div className="">
                            <Select
                                value={formik.values.role.id}
                                defaultValue={{
                                    value: 2,
                                    label: "USER"
                                }}
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    marginBottom: "20px"
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 1,
                                        label: "ADMIN"
                                    },
                                    {
                                        value: 3,
                                        label: "STAFF"
                                    },
                                    {
                                        value: 2,
                                        label: "USER"
                                    }
                                ]}
                            />
                            {formik.errors.role && (
                                <div className="text-danger">
                                    {formik.errors.role}
                                </div>
                            )}
                        </div>

                        <Button
                            type="primary"
                            htmlType={"submit"}
                            className={saveInfoBtn}
                        >
                            Lưu
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UserEditPage;
