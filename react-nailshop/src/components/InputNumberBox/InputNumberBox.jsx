import { Space, Button, InputNumber } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import styles from "./styles.module.scss";
import classNames from "classnames";
function InputNumberBox({ type = "large" }) {
    const { container, btnLef, btnRight, small, medium, large } = styles;
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    return (
        <div
            className={classNames(container, {
                [small]: type == "small",
                [medium]: type == "medium",
                [large]: type == "large"
            })}
        >
            <button className={btnLef}>
                <FiMinus />
            </button>
            <input />
            <button className={btnRight}>
                <FaPlus />
            </button>
        </div>
    );
}

export default InputNumberBox;
