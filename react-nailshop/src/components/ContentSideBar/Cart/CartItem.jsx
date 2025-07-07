import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import {
    updateQuantity,
    removeItem,
    changeListBuy
} from "@redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SideBarContext } from "@contexts/SideBarProvider";
import { useContext } from "react";
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
    const { setIsOpen } = useContext(SideBarContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRemoveItem = () => {
        console.log("reee");

        dispatch(
            removeItem({
                ...data
            })
        );
    };

    return (
        <>
            <div className={boxItem}>
                <div className={imageBox}>
                    <img src={data.pciture} alt="" />
                </div>
                <div className={itemInfo}>
                    <div
                        className={itemName}
                        onClick={() => {
                            setIsOpen(false);
                            navigate(`/detail/${data.productId}`);
                        }}
                    >
                        {data.productName}
                    </div>
                    <span className={itemOption}>
                        {data.designName}
                        <span className="text-black">|</span>{" "}
                        {data.size ? "Size" + data.size : ""}
                    </span>
                    <span className={itemValue}>
                        {data.quantity} ×{" "}
                        {new Intl.NumberFormat("vi-VN").format(
                            data.price - data.price * 0.01 * data.discount
                        )}
                        ₫
                    </span>
                </div>
                <div className={removeBox}>
                    <IoCloseCircleOutline
                        className="text-danger"
                        onClick={() => handleRemoveItem(data)}
                    />
                </div>
            </div>
        </>
    );
}

export default CartItem;
