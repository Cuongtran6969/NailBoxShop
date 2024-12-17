import styles from "./styles.module.scss";
import fireIcon from "@icons/gif/fire.gif";

function ProgressBar({ sold = 11, total = 100 }) {
    const { progressContainer, progressBar, progressIcon, progressText } =
        styles;
    const percentage = (sold / total) * 100;
    return (
        <div className={progressContainer}>
            <div className={progressBar} style={{ width: `${percentage}%` }}>
                <img src={fireIcon} alt="fire" className={progressIcon} />
            </div>
            <span className={progressText}>Đã Bán {sold}</span>
        </div>
    );
}

export default ProgressBar;
