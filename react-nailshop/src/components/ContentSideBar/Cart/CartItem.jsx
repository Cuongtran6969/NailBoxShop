import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
function CartItem() {
    const { imageBox, itemInfo, itemName, itemValue, removeBox, boxItem } =
        styles;
    return (
        <>
            <div className={boxItem}>
                <div className={imageBox}>
                    <img
                        src="https://res.cloudinary.com/doslvje9p/image/upload/v1735228437/upload/file_y7hlzm.jpg"
                        alt=""
                    />
                </div>
                <div className={itemInfo}>
                    <div className={itemName}>
                        Combo 2 bộ Nail box Trắng gạo + Cute trendy mắt mèo
                    </div>
                    <span className={itemValue}>1 × 119.000₫</span>
                </div>
                <div className={removeBox}>
                    <IoCloseCircleOutline className="text-danger" />
                </div>
            </div>
        </>
    );
}

export default CartItem;
