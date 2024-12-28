import styles from "../styles.module.scss";
function OrderItem() {
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
    return (
        <div className={orderItemBox}>
            <div className={orderImgBox}>
                <img src="https://res.cloudinary.com/doslvje9p/image/upload/v1734195371/upload/file_debo0p.jpg" />
            </div>
            <div className={orderItemInfo}>
                <div className={orderName}>
                    Combo 2 bộ Nail box Trắng gạo + Cute trendy mắt mèo
                </div>
                <div className={orderValue}>
                    <p className={orderType}>
                        <span>Do</span>
                        <span className={space}>|</span>
                        <span>M</span>
                    </p>
                    <div className={orderItemPrice}>
                        <span className={originPrice}>240.000d</span>
                        <span className={price}>240.000d</span>
                    </div>
                </div>

                <div className={orderCount}>x3</div>
            </div>
        </div>
    );
}

export default OrderItem;
