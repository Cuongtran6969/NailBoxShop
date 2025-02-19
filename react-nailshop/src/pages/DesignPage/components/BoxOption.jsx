import styles from "../styles.module.scss";
import Nail_polish from "@icons/images/Nail_polish.png";
import Dinamond from "@icons/images/Dinamond.jpg";
import classNames from "classnames";
import {
    getNailCategory,
    createNailDesignTemplate
} from "@/apis/nailDesignService";
import { useEffect, useState } from "react";

function BoxOption({ type, setType }) {
    const { box_option, option_item, active_option } = styles;
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setLoading(true);
        getNailCategory()
            .then((res) => {
                setCategories(res.result.items);
                setType(res.result.items[0]?.id);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }, []);
    if (loading) return <>loading...</>;

    return (
        <ul className={box_option}>
            {categories.map((option) => {
                return (
                    <li
                        key={option.id}
                        className={classNames(option_item, {
                            [active_option]: option.id == type
                        })}
                        onClick={() => setType(option.id)}
                    >
                        <img src={option.image ?? ""} alt="" />
                        <span>{option.name}</span>
                    </li>
                );
            })}
        </ul>
    );
}

export default BoxOption;
