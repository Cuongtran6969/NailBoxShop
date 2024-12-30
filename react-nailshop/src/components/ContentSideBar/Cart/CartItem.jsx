import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
function CartItem({ data }) {
    const {
        imageBox,
        itemInfo,
        itemName,
        itemOption,
        itemValue,
        removeBox,
        boxItem
    } = styles;
    return (
        <>
            <div className={boxItem}>
                <div className={imageBox}>
                    <img src={data.pciture} alt="" />
                </div>
                <div className={itemInfo}>
                    <div className={itemName}>{data.productName}</div>
                    <span className={itemOption}>
                        {data.designName} <span className="text-black">|</span>{" "}
                        Size {data.size}
                    </span>
                    <span className={itemValue}>
                        {data.quantity} × {data.price - 0.01 * data.price}₫
                    </span>
                </div>
                <div className={removeBox}>
                    <IoCloseCircleOutline className="text-danger" />
                </div>
            </div>
        </>
    );
}

export default CartItem;
