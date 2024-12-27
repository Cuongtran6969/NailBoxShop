import ProgressBar from "@components/ProgressBar/ProgressBar";
import styles from "./styles.module.scss";
import DiscountTicket from "@components/DiscountTicket/DiscountTicket";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function ProductItem(props) {
    const navigate = useNavigate();

    const {
        id,
        name,
        pictures,
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
            onClick={() => navigate(`/detail/${id}`)}
            className={classNames(productBox, {
                [forItemDisplay]: numberDisplay == 4
            })}
        >
            <div className={productItem}>
                <div>
                    <img src={pictures.split(",")[0]} alt="" />
                </div>
                <div className={productContent}>
                    <div>
                        <ProgressBar sold={sold} total={sold + stock} />
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
                            )}
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
