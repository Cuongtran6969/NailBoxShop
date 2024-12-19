import { useState } from "react";
import { filterType } from "./constants";
import styles from "./styles.module.scss";
import { Select } from "antd";

function FilterBox() {
    const [current, setCurrent] = useState("1");

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Select
            size={"large"}
            onChange={handleChange}
            defaultValue={current}
            style={{
                width: 360,
                height: 40
            }}
            options={filterType}
        />
    );
}

export default FilterBox;
