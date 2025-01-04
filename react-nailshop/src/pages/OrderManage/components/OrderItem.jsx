import styles from "../styles.module.scss";

function OrderItem({ item }) {
    const {
        itemBox,
        itemImg,
        itemContent,
        itemName,
        itemOption,
        itemPrice,
        afterPrice
    } = styles;
    return (
        <div className={itemBox}>
            <div>
                <img className={itemImg} src={item.picture} />
            </div>
            <div className={itemContent}>
                <div className={itemName}>{item.productName}</div>
                <div className={itemOption}>
                    {" "}
                    {item.designName ? item.designName + " | " : ""} Size{" "}
                    {item.size}
                </div>
                <div className={itemPrice}>
                    <span>
                        {new Intl.NumberFormat("vi-VN").format(item.unitPrice)}{" "}
                        ₫
                    </span>
                    <span>Discount {item.discount} %</span>
                    <span className={afterPrice}>
                        {" "}
                        {new Intl.NumberFormat("vi-VN").format(
                            item.unitPrice -
                                item.unitPrice * 0.01 * item.discount
                        )}
                    </span>
                </div>
                <div className="fs-6 text-end mt-3">
                    {item.quantity} sản phẩm
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
