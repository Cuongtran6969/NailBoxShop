import styles from "./styles.module.scss";
import { Container } from "react-bootstrap";
function CardTrend() {
    const { cardTrend } = styles;
    return (
        <Container style={{ marginTop: "40px" }}>
            <div className={cardTrend}>
                <img
                    src="https://img.lazcdn.com/us/domino/e023262f-8bdf-4db6-b60f-73dd235ee119_VN-1188-140.gif_2200x2200q80.jpg_.webp"
                    alt=""
                />
            </div>
        </Container>
    );
}

export default CardTrend;
