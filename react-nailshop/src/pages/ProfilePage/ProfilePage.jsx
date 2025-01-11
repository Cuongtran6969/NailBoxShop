import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SideBar from "@pages/ProfilePage/components/SideBar";
import UserInfo from "@pages/ProfilePage/components/UserInfo";
import MyOrder from "@pages/ProfilePage/components/MyOrder";
import { LuMoveLeft } from "react-icons/lu";
import { Container, Col, Row } from "react-bootstrap";
import { Divider, Drawer } from "antd";
import { logout } from "@/apis/authService";
import { AuthContext } from "@contexts/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState("left");
    const navigate = useNavigate();
    const [isNavVisible, setNavVisible] = useState(true);
    const [type, setType] = useState("myInfo");
    const [content, setContent] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [drawerStatus, setDrawerStatus] = useState(false);
    const { authenticated, refresh } = useContext(AuthContext);

    useEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
            if (window.innerWidth <= 768) {
                setDrawerStatus(true);
            }
        }
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
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

    const handleRenderContent = (value) => {
        switch (value) {
            case "myOrder":
                return <MyOrder />;
            case "myAddress":
                return <MyAddress />;
            case "logout":
                handleLogout();
                return "";
            default:
                return <UserInfo />;
        }
    };

    useEffect(() => {
        if (drawerStatus) {
            onClose();
        }
        setContent(handleRenderContent(type));
    }, [type]);

    const {
        appContainer,
        toggleBtn,
        navContent,
        mainContent,
        full,
        profileDetails,
        leftNav,
        visible,
        hidden,
        toggleIcon,
        headerMenu,
        containerContent,
        contentBorder
    } = styles;

    const toggleNav = () => {
        setNavVisible(!isNavVisible);
    };

    return (
        <Container>
            {drawerStatus && (
                <Drawer
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                    width={280}
                    style={{ background: "#f8f9fa" }}
                >
                    <SideBar
                        toggleNav={onClose}
                        setType={setType}
                        type={type}
                    />
                </Drawer>
            )}

            <div className={appContainer}>
                {isNavVisible && (
                    <div
                        className={classNames(leftNav, {
                            [visible]: isNavVisible
                        })}
                    >
                        <SideBar
                            toggleNav={toggleNav}
                            setType={setType}
                            type={type}
                        />
                    </div>
                )}

                {/* Nội dung chính */}
                <div
                    className={classNames(mainContent, {
                        [full]: !isNavVisible,
                        [contentBorder]: !isNavVisible
                    })}
                >
                    {!isNavVisible && (
                        <>
                            <div className={headerMenu} onClick={toggleNav}>
                                <span className="me-2">
                                    <LuMoveLeft />
                                </span>
                                <span>Setting</span>
                            </div>
                            <Divider className="m-0" />
                        </>
                    )}
                    {width <= 768 && (
                        <>
                            <div className={headerMenu} onClick={showDrawer}>
                                <span className="me-2">
                                    <LuMoveLeft />
                                </span>
                                <span>Setting</span>
                            </div>
                            <Divider className="m-0" />
                        </>
                    )}
                    {isNavVisible && <div style={{ height: "54px" }}></div>}
                    <div className={containerContent}>{content}</div>
                </div>
            </div>
        </Container>
    );
}

export default ProfilePage;
