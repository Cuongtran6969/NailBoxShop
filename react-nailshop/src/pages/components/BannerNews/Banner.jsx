import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Container, Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
function Banner() {
    const { container, image, content, readbtn, mySwiper, background } = styles;
    return (
        <Container className={container}>
            <Row>
                <Col>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}

                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className={mySwiper}
                    >
                        {/* Slide 1 */}
                        <SwiperSlide>
                            <div className={image}>
                                <div
                                    className={background}
                                    style={{
                                        backgroundImage: `url('https://img.lazcdn.com/us/domino/1bc16d03-c245-46b8-8414-3530b5d52f1f_VN-1976-688.jpg_2200x2200q80.jpg_.avif')`,
                                    }}
                                ></div>
                                <div className={content}>
                                    <h3>Phụ kiện làm nail - Tiên đề để sở hữu một bộ nail bền đẹp</h3>
                                    <p>
                                        Một bộ nail đẹp không chỉ phụ thuộc vào kỹ thuật làm móng mà còn...
                                    </p>
                                    <button className={readbtn}>TIẾP TỤC ĐỌC ➜</button>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className={image}>
                                <div
                                    className={background}
                                    style={{
                                        backgroundImage: `url('https://nailboxxinh.com/wp-content/uploads/2024/11/banner-giang-sinh-nail-box-xinh.webp')`,
                                    }}
                                ></div>
                                <div className={content}>
                                    <h3>Bí quyết nâng tầm vẻ đẹp cho nail với phụ kiện</h3>
                                    <p>Đối với các nàng thích làm đẹp, móng tay không chỉ là một chi tiết...</p>
                                    <button className={readbtn}>TIẾP TỤC ĐỌC ➜</button>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 3 */}
                        <SwiperSlide>
                            <div className={image}>
                                <div
                                    className={background}
                                    style={{
                                        backgroundImage: `url('https://img.lazcdn.com/us/domino/1bc16d03-c245-46b8-8414-3530b5d52f1f_VN-1976-688.jpg_2200x2200q80.jpg_.avif')`,
                                    }}
                                ></div>
                                <div className={content}>
                                    <h3>Xu hướng làm nail - Làm đẹp không thể bỏ lỡ</h3>
                                    <p>Trong ngành làm đẹp hiện nay, nail art đã trở thành một phần...</p>
                                    <button className={readbtn}>TIẾP TỤC ĐỌC ➜</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Col>
            </Row>
        </Container>
    );
};

export default Banner;
