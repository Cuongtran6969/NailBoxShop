import styles from "./styles.module.scss";
import classNames from "classnames";
function DiscountTicket({ value, isAnimation = true }) {
    const { discountTicket, discountPercent, ticketAnimation = true } = styles;
    return (
        <div
            className={classNames(discountTicket, {
                [ticketAnimation]: isAnimation
            })}
        >
            <span className={discountPercent}>{value}%</span>
        </div>
    );
}

export default DiscountTicket;
