import ListNews from "@components/ListNews/ListNews";
import {
    Select,
    Space,
    ConfigProvider,
    Button,
    Flex,
    Breadcrumb,
    Image,
    Skeleton
} from "antd";
import { Container } from "react-bootstrap";
import NewsCard from "./components/NewsCard";
import { getPosts } from "@/apis/postService";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { timeSince } from "@/utils/Parser";
import { useNavigate } from "react-router-dom";
function NewPage() {
    const navigate = useNavigate();
    const { newsItem, newsContent } = styles;
    const [news, setNews] = useState([]);
    const [filter, setFilter] = useState({
        page: 1,
        size: 5,
        total: 5,
        title: ""
    });
    const [loading, setLoading] = useState(true);
    const { createTime, cardDescription, timeValue, cardImg, newsTitle } =
        styles;
    const [hasMore, setHasMore] = useState(true);
    const fetchApiGetPost = async () => {
        if (hasMore) {
            setLoading(true);
            await getPosts(filter.page, filter.size, filter.title)
                .then((res) => {
                    const fetchedNews = res.result.items;
                    setNews((prevNews) => [...prevNews, ...fetchedNews]);
                    setFilter((prev) => ({
                        ...prev,
                        total: res.result.total
                    }));
                    if (news.length + fetchedNews.length >= res.result.total) {
                        setHasMore(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApiGetPost();
    }, [filter.page]);

    const handleLoadMore = () => {
        setFilter((prev) => ({
            ...prev,
            page: prev.page + 1,
            siew: 3
        }));
    };

    if (loading) return <div>...</div>;
    console.log(news);

    return (
        <Container className="mt-5">
            <div>
                <div>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="">Home</a>
                            },
                            {
                                title: <a href="">Tin tức</a>
                            }
                        ]}
                    />
                </div>
                <h2 className="mt-4">Nổi bật</h2>
                <div className="container mt-5">
                    {/* Featured News and Small News */}
                    <div className="row">
                        {news.length > 0 && (
                            <div className="col-lg-6 col-md-12 mb-4">
                                <div
                                    className="card"
                                    style={{ border: "none" }}
                                >
                                    <img
                                        onClick={() =>
                                            navigate(`/blog/${news[0].id}`)
                                        }
                                        src={news[0].image}
                                        className={cardImg}
                                        alt="Featured News"
                                    />
                                    <div className="card-body">
                                        <h5
                                            className="card-title"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                navigate(`/blog/${news[0].id}`)
                                            }
                                        >
                                            {news[0].title}
                                        </h5>
                                        <p className={cardDescription}>
                                            {news[0].description}
                                        </p>
                                        <div className={createTime}>
                                            <span>
                                                <IoTimeOutline fontSize={14} />
                                            </span>
                                            <span className={timeValue}>
                                                {timeSince(news[0].createAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Small News */}
                        <div className="col-lg-6 col-md-12">
                            <div className="row">
                                {news.length > 1 &&
                                    news.slice(1, 5).map((news, index) => (
                                        <div className="col-6 mb-3" key={index}>
                                            <NewsCard
                                                id={news.id}
                                                image={news.image}
                                                title={news.title}
                                                description={news.description}
                                                createAt={news.createAt}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        {news.length > 5 &&
                            news.slice(5).map((news, index) => (
                                <div className="col-12 mb-3" key={index}>
                                    <div className={newsItem}>
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            onClick={() =>
                                                navigate(`/blog/${news.id}`)
                                            }
                                        />
                                        <div className={newsContent}>
                                            <h6
                                                className={newsTitle}
                                                onClick={() =>
                                                    navigate(`/blog/${news.id}`)
                                                }
                                            >
                                                {news.title}
                                            </h6>
                                            <p className={cardDescription}>
                                                {news.description}
                                            </p>
                                            <div className={createTime}>
                                                <span>
                                                    <IoTimeOutline
                                                        fontSize={14}
                                                    />
                                                </span>
                                                <span className={timeValue}>
                                                    {timeSince(news.createAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {loading && <p>Đang tải...</p>}
                    {!loading && hasMore && (
                        <Button
                            className="py-3"
                            icon={<FaAngleDown />}
                            iconPosition="end"
                            onClick={handleLoadMore}
                        >
                            Xem thêm
                        </Button>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default NewPage;
