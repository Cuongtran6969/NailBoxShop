import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import FastDeliver from "@icons/images/fastDeliver.png";
import { BsFillSendFill } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import Logo from "@icons/images/nailLaBoxLogo.png";
function Footer() {
    const {
        footer,
        footerMain,
        footerTitle,
        footerSubTitle,
        emailInput,
        inputField,
        sendBtn,
        footerImage,
        footerImg,
        footerInfo,
        logo,
        footerText,
        chat,
        socialIcons
    } = styles;
    return (
        <footer className={footer}>
            <Container>
                <Row>
                    {/* Cột chính */}
                    <Col lg={6} md={12} className={footerMain}>
                        <h2 className={footerTitle}>Start using Avo today.</h2>
                        <p className={footerSubTitle}>
                            NO CREDIT CARD REQUIRED
                        </p>
                        <div className={emailInput}>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={inputField}
                            />
                            <button className={sendBtn}>
                                <BsFillSendFill />
                            </button>
                        </div>
                    </Col>

                    {/* Cột phải */}
                    <Col lg={6} md={12} className={footerImage}>
                        <img
                            src={FastDeliver}
                            alt="Ship It"
                            className={footerImg}
                        />
                    </Col>
                </Row>

                {/* Footer thông tin */}
                <Row className={footerInfo}>
                    <Col sm={4}>
                        <div className={logo}>
                            <img src={Logo} alt="" />
                            <span>NailLaBox</span>
                        </div>
                        <p className={footerText}>
                            Make the right data-driven decisions that move your
                            business.
                        </p>
                    </Col>
                    <Col sm={2} className="mt-3 mt-sm-0">
                        <ul>
                            <li>About</li>
                            <li>Jobs</li>
                            <li>Docs</li>
                        </ul>
                    </Col>
                    <Col sm={2} className="mt-3 mt-sm-0">
                        <ul>
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </Col>
                    <Col sm={4} className={chat}>
                        <h5>Let's chat!</h5>
                        <p>homieGroupfpt@gmail.com</p>
                        <div className={socialIcons}>
                            <a href="">
                                <FaInstagram style={{ fontSize: "25px" }} />
                            </a>
                            <a href="">
                                <FaFacebook style={{ fontSize: "25px" }} />
                            </a>
                            <a href="">
                                <FaTiktok style={{ fontSize: "25px" }} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
