import { useNavigate } from "react-router-dom";
import styles from "../styles.module.scss";
function NewsItem({ data }) {
    const navigate = useNavigate();
    const {
        newsBox,
        newsItem,
        newsImage,
        newsContent,
        newsType,
        newsTitle,
        newsDesc
    } = styles;
    return (
        <div className={newsBox}>
            <div className={newsItem}>
                <div
                    className={newsImage}
                    onClick={() => navigate(`/news/${data.id}`)}
                >
                    <img src={data.image} alt="" />
                </div>
                <div className={newsContent}>
                    <span className={newsType}>Tin tức</span>
                    <h5
                        className={newsTitle}
                        onClick={() => navigate(`/news/${data.id}`)}
                    >
                        {data.title}
                    </h5>
                    <p className={newsDesc}>{data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
