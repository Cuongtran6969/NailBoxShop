import { Space, Button, InputNumber } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import styles from "./styles.module.scss";
import classNames from "classnames";
function InputNumberBox({
    type = "large",
    quantity = 1,
    changeQuantity,
    max = 1
}) {
    const { container, btnLef, btnRight, small, medium, large } = styles;
    const [inputValue, setInputValue] = useState(quantity);
    const handleDecrease = () => {
        if (quantity > 1) {
            changeQuantity(quantity - 1);
            setInputValue(inputValue - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity + 1 <= max) {
            changeQuantity(quantity + 1);
            setInputValue(inputValue + 1);
        }
    };

    const handleChangeValue = (value) => {
        const numericValue = Number(value);
        if (Number.isInteger(numericValue)) {
            console.log("numericValue <= max: " + (numericValue <= max));

            if (numericValue <= max) {
                changeQuantity(numericValue);
                setInputValue(numericValue);
            } else {
                setInputValue(max);
            }
        } else {
            setInputValue(quantity);
        }
    };
    return (
        <div
            className={classNames(container, {
                [small]: type == "small",
                [medium]: type == "medium",
                [large]: type == "large"
            })}
        >
            <button className={btnLef} onClick={handleDecrease}>
                <FiMinus />
            </button>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={(e) => handleChangeValue(e.target.value)}
            />
            <button className={btnRight} onClick={handleIncrease}>
                <FaPlus />
            </button>
        </div>
    );
}

export default InputNumberBox;
