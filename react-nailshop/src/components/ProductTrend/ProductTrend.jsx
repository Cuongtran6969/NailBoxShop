import styles from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";
import Button from "@components/Button/Button";
import ProductItem from "@components/ProductItem/ProductItem";
function ProductTrend() {
    const { productBox, trendHeading, trendBottom } = styles;
    return (
        <Container style={{ marginTop: "30px" }}>
            <h4 className={trendHeading}>XU HƯỚNG NAIL BOX</h4>
            <div className={productBox}>
                <Row className="gx-3 gy-4">
                    <ProductItem sold={8} stock={20} />

                    <ProductItem sold={12} stock={50} />

                    <ProductItem sold={45} stock={80} />

                    <ProductItem sold={12} stock={24} />

                    <ProductItem sold={12} stock={20} />
                </Row>
                <div className={trendBottom}>
                    <Button content={"View more"} />
                </div>
            </div>
        </Container>
    );
}

export default ProductTrend;
