import CardInfo from "@components/Info/CardInfo/CardInfo";
import { dataInfo } from "./constants";
import styles from "./styles.module.scss";
import { Container, Row, Col } from "react-bootstrap";
function Info() {
    const { cardList } = styles;
    return (
        <Container style={{ marginTop: "20px" }}>
            <div className={cardList}>
                {dataInfo.map((item) => {
                    return (
                        <CardInfo
                            title={item.title}
                            desc={item.description}
                            icon={item.icon}
                        />
                    );
                })}
            </div>
        </Container>
    );
}

export default Info;
