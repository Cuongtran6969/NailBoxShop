import styles from "./styles.module.scss";
import Logo from "@icons/images/nailLaBoxLogo.png";
import { dataBoxIcon, dataMenu } from "./constants";
import BoxIcon from "./BoxIcon/BoxIcon";
import { MdSearch } from "react-icons/md";
import { BiFontSize } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Container, Row, Col } from "react-bootstrap";
import { SideBarContext } from '@/contexts/SideBarProvider';
import { useContext } from "react";


function Header() {
    const {
        headerText,
        headerLogo,
        conatinerBoxIcon,
        searchBox,
        headerNavUser,
        headerNavCart,
        headerMenu,
        menuButton
    } = styles;

    const { isOpen, setIsOpen } = useContext(SideBarContext);
    // console.log(isOpen);


    return (
        <>
            <div className={headerText}>
                Nail Box Xinh - Nâng niu bàn tay phái đẹp.
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
                                    {dataBoxIcon.map((item) => {
                                        return (
                                            <BoxIcon
                                                type={item.type}
                                                href={item.href}
                                            />
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col lg={4} sm={4} className="col-4">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <img src={Logo} className={headerLogo} />
                                </div>
                            </Col>
                            <Col
                                lg={8}
                                className="d-lg-flex d-none text-start"
                            // style={{ display: "flex", textAlign: "start" }}
                            >
                                <div className={conatinerBoxIcon}>
                                    {dataBoxIcon.map((item) => {
                                        return (
                                            <BoxIcon
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
                                    <FaUser className={headerNavUser} />
                                    <IoCart className={headerNavCart} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        lg={4}
                        md={7}
                        className="text-center d-flex justify-content-center mt-md-0 mt-3 justify-content-md-start"
                    >
                        <div className={searchBox}>
                            <input placeholder="Nhập từ khóa tìm kiếm..." />
                            <MdSearch
                                style={{ fontSize: "30px", padding: "5px" }}
                            />
                        </div>
                    </Col>
                    <Col
                        lg={4}
                        sm={2}
                        className="justify-content-end d-lg-flex d-none"
                    >
                        <div className={conatinerBoxIcon}>
                            <FaUser className={headerNavUser} onClick={() => setIsOpen(!isOpen)} />
                            <IoCart className={headerNavCart} />
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center py-2">
                    {dataMenu.map((item, index) => (
                        <Col key={index} xs="auto" className="mb-2">
                            <a href={item.href} className={menuButton}>
                                {item.name}
                            </a>
                        </Col>
                    ))}
                </Row>

            </Container>
        </>
    );
}

export default Header;
