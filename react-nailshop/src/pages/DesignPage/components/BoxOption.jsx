import styles from "../styles.module.scss";
import Nail_polish from "@icons/images/Nail_polish.png";
import Dinamond from "@icons/images/Dinamond.jpg";
import classNames from "classnames";
const options = [
    {
        type: "color",
        image: Nail_polish
    },
    {
        type: "icon",
        image: Dinamond
    }
];
function BoxOption({ type, setType }) {
    const { box_option, option_item, active_option } = styles;
    return (
        <ul className={box_option}>
            {options.map((option) => {
                return (
                    <li
                        key={option.type}
                        className={classNames(option_item, {
                            [active_option]: option.type == type
                        })}
                        onClick={() => setType(option.type)}
                    >
                        <img src={option.image} alt="" />
                    </li>
                );
            })}
        </ul>
    );
}

export default BoxOption;
