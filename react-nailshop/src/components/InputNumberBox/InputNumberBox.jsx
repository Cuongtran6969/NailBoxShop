import { Space, Button, InputNumber } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import styles from "./styles.module.scss";
import classNames from "classnames";
function InputNumberBox({ type = "large", quantity = 1, setQuantity }) {
    const { container, btnLef, btnRight, small, medium, large } = styles;
    const [inputValue, setInputValue] = useState(quantity);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setInputValue(inputValue - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        setInputValue(inputValue + 1);
    };

    const handleChangeValue = (value) => {
        console.log(value);

        if (Number.isInteger(value)) {
            setQuantity(value);
            setInputValue(value);
        } else {
            setInputValue(quantity);
            console.log("ko hop le");
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
