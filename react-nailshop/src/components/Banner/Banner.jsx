import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getBanners } from "@/apis/shopService";
import { Pagination, Navigation } from "swiper/modules";
import styles from "./styles.module.scss";

function Banner() {
    const { bannerItem, listBanner, rightBanner } = styles;
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getShopBanners = async () => {
            setLoading(true);
            await getBanners()
                .then((res) => {
                    const filteredBanners = res.result
                        .split(",")
                        .filter((banner) => banner.trim() !== ""); // Loại bỏ giá trị rỗng
                    setBanners(filteredBanners);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        };
        getShopBanners();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (banners.length === 0) {
        return null; // Không hiển thị gì nếu không có ảnh
    }

    const sliderBanners =
        banners.length >= 3 ? banners.slice(0, banners.length - 2) : banners;
    const rightBanners = banners.length >= 3 ? banners.slice(-2) : [];

    return (
        <Container>
            <Row style={{ rowGap: "10px" }}>
                <Col sm={banners.length < 3 ? 12 : 8} className="pe-sm-0">
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
                            {sliderBanners.map((banner, index) => (
                                <SwiperSlide key={index}>
                                    <div className={bannerItem}>
                                        <img
                                            src={banner}
                                            alt={`banner-${index}`}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Col>
                {rightBanners.length > 0 && (
                    <Col sm={4} className="d-none d-sm-block">
                        <Row style={{ height: "100%", rowGap: "10px" }}>
                            {rightBanners.map((banner, index) => (
                                <Col sm={12} key={index}>
                                    <div className={rightBanner}>
                                        <img
                                            src={banner}
                                            alt={`Right banner ${index}`}
                                        />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default Banner;
