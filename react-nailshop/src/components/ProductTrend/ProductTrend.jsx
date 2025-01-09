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
function ProductTrend() {
    const { productBox, trendHeading, trendBottom } = styles;
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();
    // const targetDate = "2024-12-17T06:00:00";
    useEffect(() => {
        const fetchProductCampaign = async () => {
            try {
                const data = await getProductPublic(page, size, null, sort);
                console.log(data.result.products);
                setProducts(data.result.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductCampaign();
    }, []);
    return (
        <>
            {products != null && (
                <Container style={{ marginTop: "30px" }}>
                    <h4 className={trendHeading}>XU HƯỚNG NAIL BOX</h4>
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
                </Container>
            )}
        </>
    );
}

export default ProductTrend;
