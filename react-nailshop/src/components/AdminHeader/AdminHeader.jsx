import { Row, Col, Container } from "react-bootstrap";
import { Input, Space, Dropdown } from "antd";
const { Search } = Input;
import { IoSearchOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import { logout } from "@/apis/authService";
function AminHeader() {
    const { container, searchBox, userInfo, userName, userRole } = styles;
    const { user } = useContext(AuthContext);
    const handleLogout = async () => {
        const token = Cookies.get("accessToken");
        if (!token) {
            console.log("No token found");
            navigate("/");
            return;
        }
        try {
            await logout(token);
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("userId");
            await refresh();
            navigate("/", { state: { logoutMessage: "Logout thành công" } });
        } catch (err) {
            console.log("Logout error: ", err);
        }
    };
    const items = [
        {
            key: "1",
            label: <a href="/profile">Thông tin cá nhân</a>
        },
        {
            key: "2",
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                >
                    Đăng xuất
                </a>
            )
        }
    ];

    return (
        <div className={container}>
            <Row style={{ alignItems: "center" }}>
                <Col sm={10}></Col>
                <Col sm={2}>
                    <div className={userInfo}>
                        <Dropdown
                            menu={{
                                items
                            }}
                            placement="bottom"
                            arrow={{
                                pointAtCenter: true
                            }}
                        >
                            <img
                                src={
                                    user.avatar ??
                                    "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_640.png"
                                }
                                alt=""
                            />
                        </Dropdown>
                        <div>
                            <h5 className={userName}>{user.name}</h5>
                            <span className={userRole}>{user.role}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AminHeader;
