import { Space, Button, InputNumber } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import styles from "./styles.module.scss";
function InputNumberBox() {
    const { btn, inputNumber } = styles;
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
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0"
            }}
        >
            <Button
                style={{
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px"
                }}
                className={btn}
                onClick={handleDecrease}
                disabled={quantity <= 1}
            >
                <FiMinus />
            </Button>
            <InputNumber
                min={1}
                value={quantity}
                onChange={setQuantity}
                className={inputNumber}
            />
            <Button
                style={{
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px"
                }}
                className={btn}
                onClick={handleIncrease}
            >
                <FaPlus />
            </Button>
        </div>
    );
}

export default InputNumberBox;
