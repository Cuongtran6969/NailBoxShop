import styles from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";
import Button from "@components/Button/Button";
import ProductItem from "@components/ProductItem/ProductItem";
import { getProductPublic } from "@/apis/productService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let sort = "sold:desc";
let page = 1;
let size = 5;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ProductTrend() {
    const { productBox, cardSketelon, trendHeading, trendBottom } = styles;
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const renderSkeletons = () => (
        <Row className="gx-3 gy-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} sm={3} className={cardSketelon}>
                    <Skeleton height={200} />
                    <Skeleton count={2} style={{ marginTop: "10px" }} />
                    <Skeleton width="80%" style={{ marginTop: "10px" }} />
                    <Skeleton width="80%" style={{ marginTop: "10px" }} />
                    <Skeleton width="20%" style={{ marginTop: "10px" }} />
                </div>
            ))}
        </Row>
    );
    // const targetDate = "2024-12-17T06:00:00";
    useEffect(() => {
        const fetchProductCampaign = async () => {
            try {
                setLoading(true);
                const data = await getProductPublic(page, size, null, sort);
                setProducts(data.result.items);
            } catch (error) {}
            setLoading(false);
        };
        fetchProductCampaign();
    }, []);
    return (
        <>
            {" "}
            <Container style={{ marginTop: "30px" }}>
                <h4 className={trendHeading}>XU HƯỚNG NAIL BOX</h4>
                {loading ? (
                    renderSkeletons()
                ) : (
                    <>
                        <div className={productBox}>
                            <Row className="gx-3 gy-4">
                                {products.map((product) => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            {...product}
                                        />
                                    );
                                })}
                            </Row>
                            <div className={trendBottom}>
                                <Button
                                    content={"View more"}
                                    onClick={() => navigate("/search")}
                                />
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </>
    );
}

export default ProductTrend;
