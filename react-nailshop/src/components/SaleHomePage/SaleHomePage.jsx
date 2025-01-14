import CountdownTimer from "@components/CoutdownTimer/CountdownTimer";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import ProductItem from "@components/ProductItem/ProductItem";
import { productCampaign } from "@/apis/productService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function SaleHomePage() {
    const {
        saleTitle,
        saleContainer,
        saleHeader,
        saleTimeBox,
        saleTimeText,
        saleHeaderConent,
        saleHeaderButton,
        productBox,
        listProduct
    } = styles;
    const [products, setProducts] = useState(null);
    const [targetDate, setTargetDate] = useState("2024-12-17T06:00:00");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductCampaign = async () => {
            try {
                const data = await productCampaign();
                setProducts(data.result.products);
                setTargetDate(data.result.endTime);
            } catch (error) {}
        };
        fetchProductCampaign();
    }, []);
    return (
        <>
            {products != null && (
                <Container style={{ marginTop: "30px" }}>
                    <h3 className={saleTitle}>Flase Sale</h3>
                    <div className={saleContainer}>
                        <div className={saleHeader}>
                            <div className={saleHeaderConent}>
                                {/* <span className={saleHeaderText}>On Sale Now</span> */}
                                <div className={saleTimeBox}>
                                    <span className={saleTimeText}>
                                        Ending in
                                    </span>
                                    <div>
                                        <CountdownTimer
                                            targetDate={targetDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-block d-none">
                                <button
                                    className={saleHeaderButton}
                                    onClick={() => navigate("/search")}
                                >
                                    SHOP ALL PRODUCTS
                                </button>
                            </div>
                        </div>
                        <div className={listProduct}>
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
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

export default SaleHomePage;
