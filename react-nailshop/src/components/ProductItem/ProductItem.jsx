import ProgressBar from "@components/ProgressBar/ProgressBar";
import styles from "./styles.module.scss";
function ProductItem({ sold, stock }) {
    const {
        productBox,
        productItem,
        productCate,
        productTitle,
        productContent
    } = styles;
    return (
        <div className={productBox}>
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
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
