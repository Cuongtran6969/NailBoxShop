import React, { useState } from "react";
import { Menu, Checkbox, Button } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import styles from "./styles.module.scss";
const { SubMenu } = Menu;

function CateFilter() {
    const { cateViewBtn } = styles;
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [visibleItems, setVisibleItems] = useState(4); // Số lượng danh mục hiển thị ban đầu

    // Danh sách danh mục
    const categories = [
        { key: "g1", label: "Sơn nail" },
        { key: "g2", label: "Sơn nail đẹp" },
        { key: "g3", label: "Sơn nail đơn giản" },
        { key: "g4", label: "Sơn nail thạch" },
        { key: "g5", label: "Sơn nail cá tính" },
        { key: "g6", label: "Sơn nail màu pastel" }
    ];

    // Toggle trạng thái checkbox
    const handleCheckboxChange = (key) => {
        setCheckedKeys((prev) =>
            prev.includes(key)
                ? prev.filter((item) => item !== key)
                : [...prev, key]
        );
    };

    // Xử lý khi nhấn "Load More"
    const handleLoadMore = () => {
        if (visibleItems >= categories.length) {
            setVisibleItems(4); // Reset về ban đầu nếu nhấn "Hide"
        } else {
            setVisibleItems((prev) => Math.min(prev + 2, categories.length)); // Hiển thị thêm 2 danh mục
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
                    <Menu.Item key={category.key}>
                        <Checkbox
                            checked={checkedKeys.includes(category.key)}
                            onChange={() => handleCheckboxChange(category.key)}
                        >
                            {category.label}
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
