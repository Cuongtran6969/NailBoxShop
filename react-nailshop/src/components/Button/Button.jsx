import classNames from "classnames";
import styles from "./styles.module.scss";
function Button({ content, isPrimary = true, ...props }) {
    const { btn, primaryBtn, secondaryBtn } = styles;
    return (
        <button
            {...props}
            className={classNames(btn, {
                [primaryBtn]: isPrimary,
                [secondaryBtn]: !isPrimary
            })}
        >
            {content}
        </button>
    );
}

export default Button;
