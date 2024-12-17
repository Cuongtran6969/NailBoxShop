import CountdownTimer from "@components/CoutdownTimer/CountdownTimer";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import ProductItem from "@components/ProductItem/ProductItem";
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
    const targetDate = "2024-12-17T06:00:00";
    return (
        <Container style={{ marginTop: "30px" }}>
            <h3 className={saleTitle}>Flase Sale</h3>
            <div className={saleContainer}>
                <div className={saleHeader}>
                    <div className={saleHeaderConent}>
                        {/* <span className={saleHeaderText}>On Sale Now</span> */}
                        <div className={saleTimeBox}>
                            <span className={saleTimeText}>Ending in</span>
                            <div>
                                <CountdownTimer targetDate={targetDate} />
                            </div>
                        </div>
                    </div>
                    <div className="d-md-block d-none">
                        <button className={saleHeaderButton}>
                            SHOP ALL PRODUCTS
                        </button>
                    </div>
                </div>
                <div className={listProduct}>
                    <Row className="gx-3 gy-4">
                        <ProductItem sold={8} stock={20} />

                        <ProductItem sold={12} stock={50} />

                        <ProductItem sold={45} stock={80} />

                        <ProductItem sold={12} stock={24} />

                        <ProductItem sold={12} stock={20} />
                    </Row>
                </div>
            </div>
        </Container>
    );
}

export default SaleHomePage;
