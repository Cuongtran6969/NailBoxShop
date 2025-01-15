import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPostDetail } from "@/apis/postService";
import { Container } from "react-bootstrap";
import { timeSince, markdownToHtml } from "@/utils/Parser";
import styles from "./styles.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import ShareSocial from "@components/ShareSocial/ShareSocial";
function NewsDetailPage() {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    const {
        detailContainer,
        detailImage,
        detailContent,
        detailDate,
        dateValue,
        detailTitle,
        detailDescription
    } = styles;
    useEffect(() => {
        if (id) {
            window.scrollTo(0, 0);
            setLoading(true);
            getPostDetail(id)
                .then((res) => {
                    setData(res.result);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        }
    }, [id]);

    return (
        <Container>
            <div>
                <div className={detailContainer}>
                    <div className={detailImage}>
                        <img src={data.image} alt="News" />
                    </div>
                    <div className={detailContent}>
                        <div>
                            <p className={detailDate}>
                                <span>
                                    <IoTimeOutline />
                                </span>
                                <span className={dateValue}>
                                    {timeSince(data.createAt)}
                                </span>
                            </p>
                            <h1 className={detailTitle}>{data.title}</h1>
                            <p className={detailDescription}>
                                {data.description}
                            </p>
                        </div>
                        <div>
                            <ShareSocial />
                        </div>
                    </div>
                </div>
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: markdownToHtml(data.content)
                }}
            ></div>
        </Container>
    );
}

export default NewsDetailPage;
