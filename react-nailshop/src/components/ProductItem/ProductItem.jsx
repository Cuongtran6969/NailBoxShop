import ProgressBar from "@components/ProgressBar/ProgressBar";
import styles from "./styles.module.scss";
import DiscountTicket from "@components/DiscountTicket/DiscountTicket";
import classNames from "classnames";
function ProductItem({ sold, stock, discount = 20, numberDisplay = 5 }) {
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
                        Nail Box Xinh
                    </a>
                    <p className={productTitle}>
                        Combo 2 bộ Nail box Trắng gạo + Cute trendy mắt mèo
                    </p>
                    <div className={productContentPrice}>
                        <span className={productPrice}>
                            119.000 <span>₫</span>
                        </span>
                        <p className={productPriceRoot}>
                            200.000<span>₫</span>
                        </p>
                    </div>
                    <DiscountTicket value={discount} />
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
