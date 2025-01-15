import NewsItem from "@components/ListNews/NewsItem/NewsItem";
import styles from "./styles.module.scss";
import { Container, Row } from "react-bootstrap";
import Button from "@components/Button/Button";
import { getPosts } from "@/apis/postService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ListNews() {
    const navigate = useNavigate();
    const { newsHeading, newsBottom } = styles;
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        page: 1,
        size: 6,
        total: 10,
        title: ""
    });
    const { newsBox, newsItem, newsImage, newsContent } = styles;
    const [news, setNews] = useState([]);

    const renderSkeletons = () => (
        <Row className="gx-3 gy-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={newsBox}>
                    <div className={newsItem}>
                        <div className={newsImage}>
                            <Skeleton height={155} />
                        </div>
                        <div className={newsContent}>
                            <Skeleton width="30%" />
                            <Skeleton width="100%" className="mt-2" />
                            <Skeleton width="100%" />
                            <Skeleton width="100%" className="mt-3" />
                            <Skeleton width="100%" />
                            <Skeleton width="100%" />
                        </div>
                    </div>
                </div>
            ))}
        </Row>
    );
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

    return (
        <Container style={{ marginTop: "40px" }}>
            {loading ? (
                renderSkeletons()
            ) : (
                <div className="">
                    <h4 className={newsHeading}>GÓC LÀM ĐẸP</h4>
                    <Row className="gx-3 gy-4">
                        {news.length > 0 &&
                            news.map((item) => {
                                return <NewsItem data={item} />;
                            })}
                    </Row>
                    <div className={newsBottom}>
                        <Button
                            content={"View more"}
                            onClick={() => navigate("/blog")}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
}

export default ListNews;
