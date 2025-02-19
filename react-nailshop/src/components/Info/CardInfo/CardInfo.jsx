import { useNavigate } from "react-router-dom";
import styles from "../styles.module.scss";
import NailIcon from "@icons/images/nail_icon.png";
function CardInfo({ title, desc, icon, link }) {
    const { cardItem, cardContent, cardTitle, cardDesc, cardImage } = styles;
    const navigate = useNavigate();
    return (
        <div>
            <div
                className={cardItem}
                onClick={() => {
                    if (link) {
                        navigate(link);
                    }
                }}
            >
                <div className={cardContent}>
                    <h4 className={cardTitle}>{title}</h4>
                    <p className={cardDesc}>{desc}</p>
                </div>
                <div className={cardImage}>
                    <img src={icon} alt="" />
                </div>
            </div>
        </div>
    );
}

export default CardInfo;
