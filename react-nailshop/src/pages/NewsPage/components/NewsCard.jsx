import styles from "../styles.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import { timeSince } from "@/utils/Parser";
import { useNavigate } from "react-router-dom";
const NewsCard = ({ id, image, title, description, createAt }) => {
    const { cardTitle, cardDescription, createTime, timeValue, cardImg } =
        styles;
    const navigate = useNavigate();
    return (
        <div className="card h-100" style={{ border: "none" }}>
            <img
                src={image}
                className={cardImg}
                alt={title}
                onClick={() => navigate(`/blog/${id}`)}
            />
            <div className="p-2">
                <h6
                    className={cardTitle}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${id}`)}
                >
                    {title}
                </h6>
                <p className={cardDescription}>{description}</p>
                <div className={createTime}>
                    <span>
                        <IoTimeOutline fontSize={14} />
                    </span>
                    <span className={timeValue}>{timeSince(createAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
