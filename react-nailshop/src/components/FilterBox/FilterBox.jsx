import { useState } from "react";
import { filterType } from "./constants";
import styles from "./styles.module.scss";
import { Select } from "antd";

function FilterBox({ currentValue, handleChange }) {
    const handleChangeSort = (value) => {
        handleChange((prev) => ({ ...prev, orderBy: value }));
    };
    console.log("currentValue: " + currentValue);

    return (
        <Select
            size={"large"}
            onChange={handleChangeSort}
            defaultValue={currentValue}
            style={{
                width: 360,
                height: 40
            }}
            options={filterType}
        />
    );
}

export default FilterBox;
