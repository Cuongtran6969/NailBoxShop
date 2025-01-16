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
        boxImage,
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
                <div className={boxImage}>
                    <img
                        src={pictures ? pictures.split(",")[0] : ""}
                        alt=""
                        onClick={() => navigate(`/detail/${id}`)}
                    />
                </div>
                <div className={productContent}>
                    <div>
                        <ProgressBar sold={sold} total={sold + stock} />
                    </div>
                    <a
                        className={productCate}
                        onClick={() => navigate(`/detail/${id}`)}
                    >
                        {categories && categories.length > 0
                            ? categories[0].name
                            : "Nail box"}
                    </a>
                    <p
                        className={productTitle}
                        onClick={() => navigate(`/detail/${id}`)}
                    >
                        {name}
                    </p>
                    <div className={productContentPrice}>
                        <span className={productPrice}>
                            {new Intl.NumberFormat("vi-VN").format(
                                Math.floor(price - price * 0.01 * discount)
                            )}
                            <span>₫</span>
                        </span>
                        <p className={productPriceRoot}>
                            {new Intl.NumberFormat("vi-VN").format(
                                Math.floor(price)
                            )}
                            <span>₫</span>
                        </p>
                    </div>
                    {discount > 0 ? (
                        <DiscountTicket value={discount} />
                    ) : (
                        <div
                            style={{
                                height: "23px",
                                width: "50px",
                                margin: "10px auto 0"
                            }}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
