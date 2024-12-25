import ProgressBar from "@components/ProgressBar/ProgressBar";
import styles from "./styles.module.scss";
import DiscountTicket from "@components/DiscountTicket/DiscountTicket";
import classNames from "classnames";
function ProductItem(props) {
    const {
        name,
        desc,
        categories,
        price,
        sold = 0,
        stock,
        discount = 0,
        numberDisplay = 5
    } = props;

    const {
        productBox,
        productItem,
        productCate,
        productTitle,
        productContent,
        productContentPrice,
        productPrice,
        productPriceRoot,
        forItemDisplay,
        discountTicket,
        discountPercent
    } = styles;
    return (
        <div
            className={classNames(productBox, {
                [forItemDisplay]: numberDisplay == 4
            })}
        >
            <div className={productItem}>
                <div>
                    <a href="#">
                        <img
                            src="https://nailboxxinh.com/wp-content/uploads/2024/12/combo-nail-box-xinh-5-300x300.webp"
                            alt=""
                        />
                    </a>
                </div>
                <div className={productContent}>
                    <div>
                        <ProgressBar sold={sold} total={stock} />
                    </div>
                    <a href="#" className={productCate}>
                        {categories && categories.length > 0
                            ? categories[0].name
                            : "No Category"}
                    </a>
                    <p className={productTitle}>{name}</p>
                    <div className={productContentPrice}>
                        <span className={productPrice}>
                            {new Intl.NumberFormat("vi-VN").format(
                                price - price * 0.01 * discount
                            )}{" "}
                            <span>₫</span>
                        </span>
                        <p className={productPriceRoot}>
                            {new Intl.NumberFormat("vi-VN").format(price)}
                            <span>₫</span>
                        </p>
                    </div>
                    <DiscountTicket value={discount} />
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
