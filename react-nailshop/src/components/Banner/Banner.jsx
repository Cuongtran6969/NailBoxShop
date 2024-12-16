import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col } from "react-bootstrap";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import styles from "./styles.module.scss";
function Banner() {
    const { bannerItem, listBanner, rightBanner } = styles;
    return (
        <Container>
            <Row style={{ rowGap: "10px" }}>
                <Col sm={8} className="pe-sm-0">
                    <div className={listBanner}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                        >
                            <SwiperSlide>
                                <div className={bannerItem}>
                                    <img
                                        src="https://img.lazcdn.com/us/domino/1bc16d03-c245-46b8-8414-3530b5d52f1f_VN-1976-688.jpg_2200x2200q80.jpg_.avif"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={bannerItem}>
                                    <img
                                        src="https://img.lazcdn.com/us/domino/9e1d30ca-6859-406d-b79f-37a08b7ec567_VN-1976-688.jpg_2200x2200q80.jpg_.avif"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={bannerItem}>
                                    <img
                                        src="https://img.lazcdn.com/us/domino/648f34a9-e9a6-47f6-85ea-36a5647d1b63_VN-1976-688.jpg_2200x2200q80.jpg_.avif"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </Col>
                <Col sm={4} className="d-none d-sm-block">
                    <Row style={{ height: "100%", rowGap: "10px" }}>
                        <Col sm={12}>
                            <div className={rightBanner}>
                                <img
                                    src="https://cf.shopee.vn/file/vn-11134258-7ras8-m3ps3uupojvs7a_xhdpi"
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className={rightBanner}>
                                <img
                                    src="https://cf.shopee.vn/file/vn-11134258-7ras8-m3ps7bcvhe7591_xhdpi"
                                    alt=""
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Banner;
