import React, { useEffect, useState } from "react";
import { Menu, Checkbox, Button } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import styles from "./styles.module.scss";
const { SubMenu } = Menu;
import { getCategory } from "@/apis/categoryService";
function CateFilter({
    handleChoose = () => {},
    checkedKeys = [],
    updateCategories = () => {}
}) {
    const { cateViewBtn } = styles;
    const [visibleItems, setVisibleItems] = useState(4);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategory().then((res) => {
            setCategories(res.result);
            updateCategories(res.result);
        });
    }, []);

    const handleCheckboxChange = (key) => {
        const newCheckedKeys = checkedKeys.includes(key)
            ? checkedKeys.filter((item) => item !== key)
            : [...checkedKeys, key];

        handleChoose(newCheckedKeys); // Gửi danh sách mới lên cha
    };

    // Xử lý khi nhấn "Load More"
    const handleLoadMore = () => {
        if (visibleItems >= categories.length) {
            setVisibleItems(4);
        } else {
            setVisibleItems((prev) => Math.min(prev + 2, categories.length));
        }
    };

    return (
        <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            style={{ width: "100%" }}
        >
            {/* SubMenu cho Loại sản phẩm */}
            <SubMenu
                key="sub1"
                icon={<BiSolidCategory />}
                title="Loại sản phẩm"
            >
                {/* Render các mục con với Checkbox */}
                {categories.slice(0, visibleItems).map((category) => (
                    <Menu.Item key={category.id} style={{ height: "100%" }}>
                        <Checkbox
                            checked={checkedKeys.includes(category.id)}
                            onChange={() => handleCheckboxChange(category.id)}
                        >
                            {category.name}
                        </Checkbox>
                    </Menu.Item>
                ))}
                {/* Nút Load More hoặc Hide */}
                <Menu.Item key="load-more" disabled>
                    <Button
                        type="link"
                        onClick={handleLoadMore}
                        className={cateViewBtn}
                    >
                        {visibleItems >= categories.length
                            ? "Hide Value"
                            : "Load More"}
                    </Button>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default CateFilter;
