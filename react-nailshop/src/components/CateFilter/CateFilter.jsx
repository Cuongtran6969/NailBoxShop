import React, { useEffect, useState } from "react";
import { Menu, Checkbox, Button } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import styles from "./styles.module.scss";
const { SubMenu } = Menu;
import { getCategory } from "@/apis/categoryService";
function CateFilter({ handleChoose = () => {}, checkedKeys = [] }) {
    const { cateViewBtn } = styles;
    const [visibleItems, setVisibleItems] = useState(4);
    const [categories, setCategories] = useState([]);

    // Danh sách danh mục
    // const categories = [
    //     { key: "g1", label: "Sơn nail" },
    //     { key: "g2", label: "Sơn nail đẹp" },
    //     { key: "g3", label: "Sơn nail đơn giản" },
    //     { key: "g4", label: "Sơn nail thạch" },
    //     { key: "g5", label: "Sơn nail cá tính" },
    //     { key: "g6", label: "Sơn nail màu pastel" }
    // ];
    useEffect(() => {
        getCategory().then((res) => {
            setCategories(res.result);
        });
    }, []);

    const handleCheckboxChange = (key) => {
        const newCheckedKeys = checkedKeys.includes(key)
            ? checkedKeys.filter((item) => item !== key)
            : [...checkedKeys, key];

        handleChoose(newCheckedKeys); // Gửi danh sách mới lên cha
    };
    //
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
                    <Menu.Item key={category.id}>
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
