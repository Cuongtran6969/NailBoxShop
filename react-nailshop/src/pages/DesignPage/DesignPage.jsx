import { useRef, useEffect, useState } from "react";
import Hand from "@icons/images/Hand.png";
import Nail_polish from "@icons/images/Nail_polish.png";
import Nail_color_default from "@icons/images/Nail_color_default.png";
import styles from "./styles.module.scss";
import BoxOption from "./components/BoxOption";
import BoxItem from "./components/BoxItem";
const DesignPage = () => {
    const [type, setType] = useState("color");
    const [selectors, setSelectors] = useState(["", "", "", "", ""]);
    const [nailColors, setNailColors] = useState([
        Nail_color_default,
        Nail_color_default,
        Nail_color_default,
        Nail_color_default,
        Nail_color_default
    ]);
    const {
        boxHand,
        nail_0,
        nail_1,
        nail_2,
        nail_3,
        nail_4,
        box_option,
        option_item,
        box_setting
    } = styles;
    const handleFingerClick = (index) => {
        console.log(index);
        console.log(selectors);

        if (selectors.length == 5) {
            setNailColors((prev) => {
                let newList = [...prev];
                newList[index] = selectors[index];
                return [...newList];
            });
            console.log((prev) => {
                let newList = [...prev];
                newList[index] = selectors[index];
                return [...newList];
            });
        }
    };

    return (
        <div className="text-center">
            <h1>Thiết Kế Nail</h1>
            <div className="position-relative">
                <div className={boxHand}>
                    <img src={Hand} alt="" />
                    <div>
                        {nailColors.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles[`nail_${index}`]}
                                    onClick={() => handleFingerClick(index)}
                                >
                                    <img src={item} alt="" />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={box_setting}>
                    <BoxItem type={type} setSelectors={setSelectors} />
                    <BoxOption type={type} setType={setType} />
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-center"></div>
        </div>
    );
};

export default DesignPage;
