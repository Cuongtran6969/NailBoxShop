import styles from "../styles.module.scss";
function OrderItem({ item }) {
    const {
        orderItemBox,
        orderItemInfo,
        orderName,
        space,
        orderType,
        orderCount,
        originPrice,
        price,
        orderValue,
        orderImgBox,
        orderItemPrice
    } = styles;
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(Math.floor(price)) + "₫";
    };
    return (
        <div className={orderItemBox}>
            <div className={orderImgBox}>
                <img src={item.picture} />
            </div>
            <div className={orderItemInfo}>
                <div className={orderName}>{item.productName}</div>
                <div className={orderValue}>
                    <p className={orderType}>
                        <span>{item.designName}</span>
                        {item.designName ? (
                            <span className={space}>|</span>
                        ) : (
                            ""
                        )}
                        <span>Size {item.size}</span>
                    </p>
                    <div className={orderItemPrice}>
                        <span className={originPrice}>
                            {formatPrice(item.unitPrice)}
                        </span>
                        <span className={price}>
                            {formatPrice(
                                item.unitPrice -
                                    item.unitPrice * 0.01 * item.discount
                            )}
                        </span>
                    </div>
                </div>

                <div className={orderCount}>x{item.quantity}</div>
            </div>
        </div>
    );
}

export default OrderItem;
