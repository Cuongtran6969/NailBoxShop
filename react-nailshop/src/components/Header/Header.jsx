import styles from "./styles.module.scss";
import Logo from "@icons/images/nailLaBoxLogo.png";
import { dataBoxIcon, dataMenu } from "./constants";
import BoxIcon from "./BoxIcon/BoxIcon";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Container, Row, Col } from "react-bootstrap";
import { SideBarContext } from "@contexts/SideBarProvider";
import { AuthContext } from "@contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Dropdown, notification } from "antd";
import { useSelector } from "react-redux";
import SearchBoxHeader from "@components/SearchBoxHeader/SearchBoxHeader";
import { HeaderSearchContext } from "@contexts/HeaderSearchProvider";
import { logout } from "@/apis/authService";
import Cookies from "js-cookie";
function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        headerText,
        headerLogo,
        conatinerBoxIcon,
        searchBox,
        headerNavUser,
        headerNavCart
    } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { authenticated, refresh, setUser } = useContext(AuthContext);
    const { list } = useSelector((state) => state.cart);
    const { keyword, setKeyword } = useContext(HeaderSearchContext);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mess, desc) => {
        api[type]({
            message: mess,
            description: desc,
            placement: "top"
        });
    };
    useEffect(() => {
        if (!location.pathname.startsWith("/search")) {
            setKeyword(""); // Xóa từ khóa
        }
    }, [location.pathname]);
    const countCart = list.reduce((sum, item) => sum + item.quantity, 0);
    const hanleOpenSideBar = (type) => {
        if (type === "login" && authenticated) {
            navigate("/profile");
        } else if (type == "cart" && location.pathname === "/cart") {
            return;
        } else {
            console.log("hell");
            setIsOpen(true);
            setType(type);
        }
    };

    const handleLogout = async () => {
        console.log("logout");

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
            setUser(null);
            await refresh();
            openNotificationWithIcon(
                "success",
                "Thông báo",
                "Đăng xuất thành công"
            );
            navigate("/");
        } catch (err) {
            console.log("Logout error: ", err);
        }
    };

    const items = [
        {
            key: "1",
            label: (
                <a
                    onClick={handleLogout}
                    className="fs-6 px-3 py-1 text-center"
                >
                    Đăng xuất
                </a>
            )
        }
    ];
    return (
        <>
            {contextHolder}
            <div className={headerText}>
                Nail La Box - Nâng niu bàn tay phái đẹp.
            </div>
            <Container className="py-2">
                <Row style={{ alignItems: "center" }}>
                    <Col lg={4} md={3}>
                        <Row style={{ alignItems: "center" }}>
                            <Col
                                sm={4}
                                className="d-md-none col-4 d-block d-flex text-start"
                                // style={{ display: "flex", textAlign: "start" }}
                            >
                                <div className={conatinerBoxIcon}>
                                    {dataBoxIcon.map((item, index) => {
                                        return (
                                            <BoxIcon
                                                key={index}
                                                type={item.type}
                                                href={item.href}
                                            />
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col lg={4} sm={4} className="col-4">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <img
                                        src={Logo}
                                        className={headerLogo}
                                        onClick={() => navigate("/")}
                                    />
                                </div>
                            </Col>
                            <Col
                                lg={8}
                                className="d-lg-flex d-none text-start"
                                // style={{ display: "flex", textAlign: "start" }}
                            >
                                <div className={conatinerBoxIcon}>
                                    {dataBoxIcon.map((item, index) => {
                                        return (
                                            <BoxIcon
                                                key={index}
                                                type={item.type}
                                                href={item.href}
                                            />
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col
                                sm={4}
                                lg={4}
                                className="col-4 justify-content-end d-md-none d-flex"
                            >
                                <div className={conatinerBoxIcon}>
                                    <FaUser
                                        className={headerNavUser}
                                        onClick={() =>
                                            hanleOpenSideBar("login")
                                        }
                                    />
                                    <Badge count={countCart}>
                                        <IoCart
                                            className={headerNavCart}
                                            onClick={() =>
                                                hanleOpenSideBar("cart")
                                            }
                                        />
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        lg={4}
                        md={7}
                        className="text-center d-flex justify-content-center mt-md-0 mt-3 justify-content-md-start"
                    >
                        <SearchBoxHeader />
                        {/* <div className={searchBox}>
                            <input placeholder="Nhập từ khóa tìm kiếm..." />
                            <MdSearch
                                style={{ fontSize: "30px", padding: "5px" }}
                            />
                        </div> */}
                    </Col>
                    <Col
                        lg={4}
                        sm={2}
                        className="justify-content-end d-lg-flex d-none"
                    >
                        <div className={conatinerBoxIcon}>
                            {authenticated && (
                                <Dropdown
                                    size="middle"
                                    menu={{
                                        items
                                    }}
                                    placement="bottom"
                                >
                                    <FaUser
                                        className={headerNavUser}
                                        onClick={() =>
                                            hanleOpenSideBar("login")
                                        }
                                    />
                                </Dropdown>
                            )}{" "}
                            {!authenticated && (
                                <FaUser
                                    className={headerNavUser}
                                    onClick={() => hanleOpenSideBar("login")}
                                />
                            )}
                            <Badge count={countCart}>
                                <IoCart
                                    className={headerNavCart}
                                    onClick={() => hanleOpenSideBar("cart")}
                                />
                            </Badge>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Header;
