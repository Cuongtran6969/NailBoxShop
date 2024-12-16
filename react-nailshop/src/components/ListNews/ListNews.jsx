import NewsItem from "@components/ListNews/NewsItem/NewsItem";
import styles from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";
import Button from "@components/Button/Button";
function ListNews() {
    const { newsHeading, newsBottom } = styles;
    return (
        <Container style={{ marginTop: "40px" }}>
            <div className="">
                <h4 className={newsHeading}>GÓC LÀM ĐẸP</h4>
                <Row className="gx-3 gy-4">
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                </Row>
                <div className={newsBottom}>
                    <Button content={"View more"} />
                </div>
            </div>
        </Container>
    );
}

export default ListNews;
