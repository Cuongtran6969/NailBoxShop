import NewsItem from "@components/ListNews/NewsItem/NewsItem";
import styles from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";
import Button from "@components/Button/Button";
import { getPosts } from "@/apis/postService";
import { useEffect, useState } from "react";
function ListNews() {
    const { newsHeading, newsBottom } = styles;
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        page: 1,
        size: 6,
        total: 10,
        title: ""
    });
    const [news, setNews] = useState([]);
    const fectApiGetPost = async () => {
        setLoading(true);
        await getPosts(filter.page, filter.size, filter.title)
            .then((res) => {
                setNews(res.result.items);
            })
            .catch((err) => {});
        setLoading(false);
    };
    useEffect(() => {
        fectApiGetPost();
    }, []);
    if (loading) return <div>...</div>;
    console.log(news);

    return (
        <Container style={{ marginTop: "40px" }}>
            <div className="">
                <h4 className={newsHeading}>GÓC LÀM ĐẸP</h4>
                <Row className="gx-3 gy-4">
                    {news.length > 0 &&
                        news.map((item) => {
                            return <NewsItem data={item} />;
                        })}
                </Row>
                <div className={newsBottom}>
                    <Button content={"View more"} />
                </div>
            </div>
        </Container>
    );
}

export default ListNews;
